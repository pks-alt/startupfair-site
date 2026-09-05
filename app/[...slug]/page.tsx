import { StartupFairPage } from "@/components/startupfair-page";
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <StartupFairPage page={slug.join("/")} />;
}
