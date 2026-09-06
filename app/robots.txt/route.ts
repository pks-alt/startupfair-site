import { robotsText } from "@/lib/seo";
export function GET(request: Request) {
  return new Response(robotsText(new URL(request.url).hostname), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
