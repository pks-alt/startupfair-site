import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { StartupFairPage } from "@/components/startupfair-page";
import { SeoStructuredData } from "@/components/seo-structured-data";
import { metadataFor } from "@/lib/seo";
import { KNOWN_PATHS } from "@/lib/site-routes";
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  if (!KNOWN_PATHS.has(path)) return { title: "Page Not Found | StartupFair", robots: { index: false, follow: false } };
  const requestHeaders = await headers();
  return metadataFor(path, requestHeaders.get("host") ?? "");
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const path = "/" + slug.join("/");
  if (!KNOWN_PATHS.has(path)) notFound();
  return <><SeoStructuredData path={path} /><StartupFairPage page={slug.join("/")} /></>;
}
