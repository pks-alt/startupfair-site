import { structuredDataFor } from "@/lib/seo";
export function SeoStructuredData({ path }: { path: string }) {
  const data = structuredDataFor(path);
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
