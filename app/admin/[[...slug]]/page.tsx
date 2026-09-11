import { notFound } from "next/navigation";
import { StartupFairPlatform } from "@/components/startupfair-platform";
import { platformRoute } from "@/lib/platform-routes";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function AdminPage({ params }: Props) {
  const { slug = [] } = await params;
  const path = slug.length ? "/admin/" + slug.join("/") : "/admin";
  const route = platformRoute(path);
  if (!route || route.role !== "Admin") notFound();
  return <StartupFairPlatform route={route} />;
}
