import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Job Title",
      type: "string",
      description: 'e.g. "Senior Chauffeur & Tour Guide"',
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});

/** Simple table for blog bodies. The first row is rendered as the header row. */
export const tableType = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "rows",
      title: "Rows (first row = header)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }: { cells?: string[] }) => ({
              title: (cells ?? []).join(" | "),
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "caption", rows: "rows" },
    prepare: ({ title, rows }: { title?: string; rows?: unknown[] }) => ({
      title: title || "Table",
      subtitle: `${rows?.length ?? 0} rows`,
    }),
  },
});

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      description:
        "Overrides the <title> tag in search results. Keep it under 60 characters so Google does not truncate it. Leave empty to fall back to the Title above.",
      validation: (rule) =>
        rule
          .max(60)
          .warning("Google truncates titles longer than ~60 characters."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary used for SEO description & listing cards (max ~160 chars).",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Airport Guide", "Travel Tips", "Cost & Comparison", "Destinations"],
      },
      initialValue: "Airport Guide",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text (SEO)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "5 min read"',
    }),
    defineField({
      name: "featured",
      title: "Featured / Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alternative text (SEO)", type: "string" }),
          ],
        }),
        defineArrayMember({ type: "table" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "category" },
  },
});

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings & USPs",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Hero Top Badge",
      type: "string",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "liveNotice",
      title: "Live Airport / Seasonal Notice Banner",
      type: "string",
      description: "Optional banner shown above USPs on the homepage (leave empty to hide).",
    }),
    defineField({
      name: "usps",
      title: "Core USPs (4 Cards)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID Slug", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "directAnswers",
      title: "Direct Answers at a Glance",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Concise Direct Answer", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
});

export const faqItemType = defineType({
  name: "faqItem",
  title: "Dynamic FAQ / Good to Know",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Arrival & Meeting",
          "Pricing & Tolls",
          "Flight Tracking",
          "Vehicles & Luggage",
          "Payment & Booking",
          "Traveler Perks",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqQuestion",
      title: "Direct Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Short Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "keyFact",
      title: "Direct Answer (1 Sentence)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Detailed Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    defineField({ name: "iconName", title: "Icon Name (Lucide)", type: "string" }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
});

export const schemaTypes = [
  postType,
  authorType,
  tableType,
  siteSettingsType,
  faqItemType,
];
