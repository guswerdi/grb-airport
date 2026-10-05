import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForSanityImage } from "@/lib/sanity/image";

interface BlockChild {
  _key?: string;
  _type: string;
  text?: string;
  marks?: string[];
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}

interface TableRow {
  _key?: string;
  cells?: string[];
}

interface PortableBlock {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: BlockChild[];
  markDefs?: MarkDef[];
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  caption?: string;
  rows?: TableRow[];
}

function inlineText(children?: BlockChild[]): string {
  return children?.map((child) => child.text ?? "").join("") ?? "";
}

/** Renders spans with `strong`, `em` and `link` marks (link hrefs come from markDefs). */
function renderInline(block: PortableBlock): React.ReactNode {
  const children = block.children ?? [];
  return children.map((child, index) => {
    let node: React.ReactNode = child.text ?? "";
    const marks = child.marks ?? [];

    for (const mark of marks) {
      if (mark === "strong") {
        node = <strong className="font-semibold text-slate-900">{node}</strong>;
      } else if (mark === "em") {
        node = <em>{node}</em>;
      } else {
        const def = block.markDefs?.find((item) => item._key === mark);
        if (def?._type === "link" && def.href) {
          const linkClass =
            "font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800";
          node = def.href.startsWith("/") ? (
            <Link href={def.href} className={linkClass}>
              {node}
            </Link>
          ) : (
            <a href={def.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {node}
            </a>
          );
        }
      }
    }

    return <React.Fragment key={child._key ?? index}>{node}</React.Fragment>;
  });
}

/**
 * Lightweight Portable Text renderer for blog bodies.
 * Supports: normal paragraphs, h2-h4, blockquote, bullet/numbered lists, inline images,
 * inline links / bold / italic marks, and simple tables (first row = header).
 */
export function PortableTextBlocks({ blocks }: { blocks: unknown[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  const typed = blocks as PortableBlock[];
  const output: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listType: "bullet" | "number" | null = null;

  const flushList = (key: string) => {
    if (listType === null || listItems.length === 0) return;
    const items = listItems;
    output.push(
      listType === "number" ? (
        <ol key={key} className="list-decimal pl-6 space-y-2 marker:font-semibold marker:text-emerald-700">
          {items}
        </ol>
      ) : (
        <ul key={key} className="list-disc pl-6 space-y-2 marker:text-emerald-600">
          {items}
        </ul>
      )
    );
    listItems = [];
    listType = null;
  };

  typed.forEach((block, index) => {
    const key = block._key ?? `block-${index}`;

    if (block._type === "table") {
      flushList(key);
      const rows = (block.rows ?? []).filter((row) => row.cells && row.cells.length > 0);
      if (rows.length === 0) return;
      const [header, ...bodyRows] = rows;
      output.push(
        <div key={key} className="my-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            {block.caption ? (
              <caption className="bg-slate-50 px-4 py-2 text-left text-xs font-semibold text-slate-600">
                {block.caption}
              </caption>
            ) : null}
            <thead className="bg-emerald-50 text-emerald-900">
              <tr>
                {header.cells?.map((cell, cellIndex) => (
                  <th key={cellIndex} scope="col" className="px-3 sm:px-4 py-3 font-bold align-top">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {bodyRows.map((row, rowIndex) => (
                <tr key={row._key ?? rowIndex}>
                  {row.cells?.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th
                        key={cellIndex}
                        scope="row"
                        className="px-3 sm:px-4 py-3 font-semibold text-slate-900 align-top"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={cellIndex} className="px-3 sm:px-4 py-3 text-slate-700 align-top">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      return;
    }

    if (block._type === "image") {
      flushList(key);
      const src = urlForSanityImage(block.asset);
      if (src) {
        output.push(
          <figure key={key} className="my-6">
            <div className="relative h-56 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={src}
                alt={block.alt || "Illustration"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            {block.alt ? (
              <figcaption className="mt-2 text-xs text-slate-400 text-center">{block.alt}</figcaption>
            ) : null}
          </figure>
        );
      }
      return;
    }

    if (block._type !== "block") return;

    const text = inlineText(block.children);
    if (!text.trim()) return;
    const content = renderInline(block);

    if (block.listItem) {
      listType = listType ?? block.listItem;
      listItems.push(<li key={key}>{content}</li>);
      return;
    }

    flushList(key);

    switch (block.style) {
      case "h2":
        output.push(
          <h2 key={key} className="text-xl sm:text-2xl font-bold text-slate-900 pt-2">
            {content}
          </h2>
        );
        break;
      case "h3":
        output.push(
          <h3 key={key} className="text-lg sm:text-xl font-bold text-slate-900 pt-1">
            {content}
          </h3>
        );
        break;
      case "h4":
        output.push(
          <h4 key={key} className="text-base sm:text-lg font-bold text-slate-900">
            {content}
          </h4>
        );
        break;
      case "blockquote":
        output.push(
          <blockquote
            key={key}
            className="border-l-4 border-emerald-600 pl-4 py-1 italic bg-slate-50 rounded-r-lg text-slate-800"
          >
            {content}
          </blockquote>
        );
        break;
      default:
        output.push(
          <p key={key} className="text-slate-700 leading-relaxed">
            {content}
          </p>
        );
    }
  });

  flushList("list-tail");

  return <>{output}</>;
}
