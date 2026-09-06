"""Apply a narrow review to the known current source; stop on unexpected changes."""
from pathlib import Path
import base64,hashlib,json,re,zlib
p=Path('components/startupfair-page.tsx');b=p.read_bytes();s=b.decode()
assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()=='e00c975d65c65799cb2bcbad222cdb0701720181', 'Source changed; refusing to overwrite.'
original=s
saved=json.loads(zlib.decompress(base64.b64decode(Path('recovery/approved-about.b64').read_text())))
a=s.index('function AboutPage()');e=s.index('function ContactPage()');s=s[:a]+saved['about']+s[e:]
s=s.replace('function Layout({ children }: { children: ReactNode }) {','function Layout({ children, publicPage = false }: { children: ReactNode; publicPage?: boolean }) {',1)
s=s.replace('<main>{children}</main>','<main className={publicPage ? "public-page" : undefined}>{children}</main>',1)
s=s.replace('  image,\n}: {','  image = "/startupfair-hero-global-ai.png",\n}: {',1)
for name in ['ChallengesPage','TalentPage','OrganizationsPage','PartnersPage','AboutPage','ContactPage']:
 start=s.index('function '+name+'(');end=s.find('\nfunction ',start+1)
 if end<0:end=len(s)
 c=s[start:end];assert c.count('<Layout>')==1,name
 s=s[:start]+c.replace('<Layout>','<Layout publicPage>',1)+s[end:]
get=lambda t,n:t[t.index('function '+n+'('):t.index('\nfunction ',t.index('function '+n+'(')+1)]
for n in ['HomePage','HomeInquiryPanel','Header','Footer']: assert get(s,n)==get(original,n),n
assert re.findall(r'onSubmit=\{.*?\}\}',s)==re.findall(r'onSubmit=\{.*?\}\}',original)
assert s.count('<EmailRoutingForm ')==49
assert s[s.index('export function StartupFairPage'):]==original[original.index('export function StartupFairPage'):]
p.write_text(s)
Path('app/about-history.css').write_text(saved['css'])
layout=Path('app/layout.tsx');c=layout.read_text();assert 'import "./inquiry-fix.css";' in c
layout.write_text(c.replace('import "./inquiry-fix.css";','import "./inquiry-fix.css";\nimport "./about-history.css";\nimport "./public-template.css";',1))
starts=list(re.finditer(r'^(?:export )?function (\w+)\(',s,re.M));inventory=[]
for i,m in enumerate(starts):
 chunk=s[m.start():starts[i+1].start() if i+1<len(starts) else len(s)]
 if '<EmailRoutingForm ' in chunk:
  inventory.append({'component':m[1],'category':re.search(r'<EmailRoutingForm category="([^"]+)"',chunk)[1],'fields':sorted(set(re.findall(r'\bname="([^"]+)"',chunk))),'submitDestinations':re.findall(r'window.location.assign\("([^"]+)"\)',chunk)})
Path('docs/form-field-inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
print('Applied six public templates, Home hero reuse and saved approved About content. Original Home and all 49 form screens preserved.')
