import { sitemapXml } from "@/lib/seo";
export function GET(request: Request) {
  return new Response(sitemapXml(new URL(request.url).hostname), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });
}
