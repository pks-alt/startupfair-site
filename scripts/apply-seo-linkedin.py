"""Integrate only SEO, route validation and LinkedIn presentation into the exact working source."""
from pathlib import Path
import hashlib,json,re

def guard(path,expected):
 p=Path(path);b=p.read_bytes();sha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
 assert sha==expected, f'{path} changed; stop rather than overwrite.'
 return p,b.decode()

p,s=guard('components/startupfair-page.tsx','15459a53fd777acd0cc241f8f9b440f1509fba62')
layout,l=guard('app/layout.tsx','000d3b320d5a58f34c94cb04ebb2de1daee9560f')
home,h=guard('app/page.tsx','042256562bedd9308e04436ea11ec151f0217b50')
slug,d=guard('app/[...slug]/page.tsx','de6df14a49834951f68073d3b6bc4077d4f9e534')
original=s
s=s.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { LinkedInLink } from "@/components/linkedin-link";',1)
anchor='<a href="mailto:hello@startupfair.org">hello@startupfair.org</a>'
assert s.count(anchor)==1
s=s.replace(anchor,anchor+'\n        <LinkedInLink />',1)
assert s.count('<option>LinkedIn or social media</option>')==4
s=s.replace('<option>LinkedIn or social media</option>','<option>LinkedIn</option>')
s=s.replace('The requested page is not available in this prototype.', 'The requested page could not be found.')
assert re.findall(r'onSubmit=\{.*?\}\}',s)==re.findall(r'onSubmit=\{.*?\}\}',original)
for name in ['HomePage','Hero','HomeInquiryPanel','AboutPage','ChallengesPage','ChallengeDetail']:
 def block(text):
  a=text.index('function '+name+'(');b=text.index('\nfunction ',a+1);return text[a:b]
 assert block(s)==block(original),name
p.write_text(s)
# Preserve every implemented route; reject unknown challenge slugs instead of showing a different event.
paths={'/','/challenges/ai-clinician-matching','/challenges/enterprise-ai-agent','/challenges/publisher-campaign-intelligence','/privacy','/terms','/cookies','/challenge-rules'}
for name in re.findall(r'if \(page === "([^"]+)"\)',s):
 paths.add('/' if name=='home' else '/'+name)
Path('lib/site-routes.ts').write_text('// Exact implemented routes. Regenerate intentionally when adding a page.\nexport const SITE_PATHS = '+json.dumps(sorted(paths),indent=2)+' as const;\nexport const KNOWN_PATHS = new Set<string>(SITE_PATHS);\n')
a=l.index('export const metadata: Metadata');b=l.index('\nexport default function RootLayout',a)
l=l[:a]+'''export const metadata: Metadata = {
  title: "StartupFair | AI Talent & Innovation Challenges",
  description: "Explore practical AI talent and innovation challenges with StartupFair.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
'''+l[b:]
layout.write_text(l)
home.write_text('''import { headers } from "next/headers";
import { StartupFairPage } from "@/components/startupfair-page";
import { SeoStructuredData } from "@/components/seo-structured-data";
import { metadataFor } from "@/lib/seo";
export async function generateMetadata() {
  const requestHeaders = await headers();
  return metadataFor("/", requestHeaders.get("host") ?? "");
}
export default function Home() {
  return <><SeoStructuredData path="/" /><StartupFairPage page="home" /></>;
}
''')
slug.write_text('''import { headers } from "next/headers";
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
''')
print(f'SEO integrated for {len(paths)} routes. Four referral labels now LinkedIn-only; one footer LinkedIn link added. Events, hero and popup unchanged.')
