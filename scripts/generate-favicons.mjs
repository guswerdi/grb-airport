/**
 * Generates the brand favicon raster set from one source artwork.
 *
 * Run: node scripts/generate-favicons.mjs
 *
 * Outputs (committed to git, so this script is only needed when the artwork changes):
 *   src/app/favicon.ico     -> /favicon.ico     multi-size ICO (16/32/48/64 BMP + 128/256 PNG)
 *   src/app/icon1.png       -> /icon1.png       512x512 PNG
 *   src/app/apple-icon.png  -> /apple-icon.png  180x180 PNG (iOS home screen)
 *
 * Why this exists: Google Search only supports BMP, GIF, ICO, PNG, JPEG, PPM and TIFF
 * favicons - SVG is not supported. `src/app/icon.svg` alone therefore never became the
 * Google Search favicon. A raster /favicon.ico at the domain root is the reliable fix.
 *
 * The small sizes use a simplified mark (green rounded square + large white plane) instead
 * of the detailed navbar mark (palm + motion trail) because search results render the
 * favicon at ~16-32px where the thin palm strokes turn into mush.
 *
 * Requires `sharp`, which ships as an optional dependency of Next.js.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(projectRoot, "src", "app");

// Same palette as public/logo-mark.svg and src/app/icon.svg (emerald 500 -> emerald 700).
const BRAND_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="gbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#10b981"/>
      <stop offset="1" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="115" fill="url(#gbg)"/>
  <g transform="translate(256 256) rotate(-45) scale(18) translate(-11.5 -12)">
    <path fill="#ffffff" d="M21,16v-2l-8-5V3.5C13,2.67,12.33,2,11.5,2S10,2.67,10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z"/>
  </g>
</svg>`;

/** Rasterize the mark to raw straight (non-premultiplied) RGBA pixels. */
async function rasterize(size) {
  const { data } = await sharp(Buffer.from(BRAND_MARK_SVG), { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return data;
}

/**
 * ICO entries below 256px are stored as 32bpp BMP/DIB (widest compatibility:
 * Windows shell, older pickers), >= 256px as PNG (the only format ICO allows there).
 */
function toDib(rgba, size) {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // biSize (BITMAPINFOHEADER)
  header.writeInt32LE(size, 4); // biWidth
  header.writeInt32LE(size * 2, 8); // biHeight (color + AND mask)
  header.writeUInt16LE(1, 12); // biPlanes
  header.writeUInt16LE(32, 14); // biBitCount
  header.writeUInt32LE(0, 16); // biCompression = BI_RGB
  header.writeUInt32LE(size * size * 4, 20); // biSizeImage

  // BGRA, bottom-up.
  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    const srcRow = (size - 1 - y) * size * 4;
    const dstRow = y * size * 4;
    for (let x = 0; x < size; x += 1) {
      const src = srcRow + x * 4;
      const dst = dstRow + x * 4;
      pixels[dst] = rgba[src + 2];
      pixels[dst + 1] = rgba[src + 1];
      pixels[dst + 2] = rgba[src];
      pixels[dst + 3] = rgba[src + 3];
    }
  }

  // 1bpp AND mask: bit set = transparent (legacy renderers ignore the alpha channel).
  const maskRowBytes = Math.ceil(size / 32) * 4;
  const mask = Buffer.alloc(maskRowBytes * size);
  for (let y = 0; y < size; y += 1) {
    const srcRow = (size - 1 - y) * size * 4;
    for (let x = 0; x < size; x += 1) {
      if (rgba[srcRow + x * 4 + 3] < 128) {
        mask[y * maskRowBytes + (x >> 3)] |= 0x80 >> (x & 7);
      }
    }
  }

  return Buffer.concat([header, pixels, mask]);
}

function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;

  entries.forEach((entry, index) => {
    const base = index * 16;
    const dimension = entry.size >= 256 ? 0 : entry.size; // 0 means 256 in ICO
    directory.writeUInt8(dimension, base);
    directory.writeUInt8(dimension, base + 1);
    directory.writeUInt8(0, base + 2); // palette colors
    directory.writeUInt8(0, base + 3); // reserved
    directory.writeUInt16LE(1, base + 4); // color planes
    directory.writeUInt16LE(32, base + 6); // bits per pixel
    directory.writeUInt32LE(entry.data.length, base + 8);
    directory.writeUInt32LE(offset, base + 12);
    offset += entry.data.length;
  });

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.data)]);
}

async function main() {
  mkdirSync(appDir, { recursive: true });

  const entries = [];
  for (const size of [16, 32, 48, 64]) {
    entries.push({ size, format: "bmp", data: toDib(await rasterize(size), size) });
  }
  for (const size of [128, 256]) {
    entries.push({ size, format: "png", data: await renderPng(size) });
  }

  const ico = buildIco(entries);
  writeFileSync(path.join(appDir, "favicon.ico"), ico);

  const icon512 = await renderPng(512);
  writeFileSync(path.join(appDir, "icon1.png"), icon512);

  const appleIcon = await renderPng(180);
  writeFileSync(path.join(appDir, "apple-icon.png"), appleIcon);

  console.log(
    [
      `src/app/favicon.ico    ${ico.length} bytes (${entries
        .map((entry) => `${entry.size}px ${entry.format}`)
        .join(", ")})`,
      `src/app/icon1.png      ${icon512.length} bytes (512px png)`,
      `src/app/apple-icon.png ${appleIcon.length} bytes (180px png)`,
    ].join("\n"),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function renderPng(size) {
  return sharp(Buffer.from(BRAND_MARK_SVG), { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}
