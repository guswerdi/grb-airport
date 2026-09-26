import React from "react";
import Image from "next/image";
import { urlForSanityImage } from "@/lib/sanity/image";

interface BlockChild {
  _type: string;
  text?: string;
}

interface PortableBlock {
  _key?: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: BlockChild[];
  asset?: { _ref?: string; _type?: string };
  alt?: string;
}

function inlineText(children?: BlockChild[]): string {
  return children?.map((child) => child.text ?? "").join("") ?? "";
}

/**
 * Lightweight Portable Text renderer for blog bodies.
 * Supports: normal paragraphs, h2-h4, blockquote, bullet/numbered lists, inline images.
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

    if (block.listItem) {
      listType = listType ?? block.listItem;
      listItems.push(<li key={key}>{text}</li>);
      return;
    }

    flushList(key);

    switch (block.style) {
      case "h2":
        output.push(
          <h2 key={key} className="text-xl sm:text-2xl font-bold text-slate-900 pt-2">
            {text}
          </h2>
        );
        break;
      case "h3":
        output.push(
          <h3 key={key} className="text-lg sm:text-xl font-bold text-slate-900 pt-1">
            {text}
          </h3>
        );
        break;
      case "h4":
        output.push(
          <h4 key={key} className="text-base sm:text-lg font-bold text-slate-900">
            {text}
          </h4>
        );
        break;
      case "blockquote":
        output.push(
          <blockquote
            key={key}
            className="border-l-4 border-emerald-600 pl-4 py-1 italic bg-slate-50 rounded-r-lg text-slate-800"
          >
            {text}
          </blockquote>
        );
        break;
      default:
        output.push(
          <p key={key} className="text-slate-700 leading-relaxed">
            {text}
          </p>
        );
    }
  });

  flushList("list-tail");

  return <>{output}</>;
}
