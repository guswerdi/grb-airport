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
    "Perplexity-User",
    "Google-Extended",
    "Googlebot",
    "Bingbot",
    "Applebot-Extended",
    "CCBot",
    "meta-externalagent",
    "Amazonbot",
    "Bytespider",
  ];

  const botRules = aiBots.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n");

  // Content-Signal (contentsignals.org) states usage intent in a machine-readable
  // way. It matches the Allow rules above: search, AI answers and training are
  // all permitted. Change a value to `no` here if training use should be refused.
  const body = `# llms.txt (AI/LLM-readable site summary): ${SITE}/llms.txt
# llms-full.txt (complete fares, policies and routes): ${SITE}/llms-full.txt

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes
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
