import { NextResponse } from "next/server";

const SITE = "https://www.greatbaliairporttransfer.com";

// Raw robots.txt so we can include a comment pointing AI crawlers to llms.txt
// (Next.js MetadataRoute.Robots does not support custom comment lines).
export function GET() {
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "meta-externalagent",
  ];

  const botRules = aiBots.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n");

  const body = `# llms.txt (AI/LLM-readable site summary): ${SITE}/llms.txt

User-agent: *
Allow: /

${botRules}

Sitemap: ${SITE}/sitemap.xml
`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
