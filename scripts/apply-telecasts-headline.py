"""Apply two requested presentation fixes to the exact audited source, not a redesign."""
from pathlib import Path
import hashlib
import re

def blob_sha(data):
    return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()

p=Path('components/startupfair-page.tsx')
original=p.read_text()
marker='import { EventTelecasts } from "@/components/event-telecasts";'
if marker in original:
    assert original.count('<EventTelecasts />') == 1
    assert 'import "./launch-polish.css";' in Path('app/layout.tsx').read_text()
    print('Requested video/headline changes already integrated.')
    raise SystemExit(0)
assert blob_sha(p.read_bytes())=='841f1db51c78b2f1e5475b1041b946d3cd33d228', 'Source changed; stop instead of overwriting.'
layout=Path('app/layout.tsx')
assert blob_sha(layout.read_bytes())=='98ccc241b9dcf99f82cee871e9fd5342c9186529', 'Layout changed; stop instead of overwriting.'
s=original.replace('import Link from "next/link";', 'import Link from "next/link";\n'+marker, 1)
start=s.index('function AboutPage()'); end=s.index('function ContactPage()',start)
about=s[start:end]
anchor='''        <CTA
          title="Build. Solve. Discover What’s Possible."'''
insert='''        <Section
          id="event-telecasts"
          eyebrow="Event Telecasts"
          title="Watch earlier StartupFair events."
          intro="Recordings from StartupFair’s historical event archive."
        >
          <EventTelecasts />
        </Section>

'''
assert about.count(anchor)==1
s=s[:start]+about.replace(anchor,insert+anchor,1)+s[end:]
# Every form, submit handler and the existing Home/popup remain intact.
assert s.count('<EmailRoutingForm ')==original.count('<EmailRoutingForm ')==49
assert re.findall(r'onSubmit=\{.*?\}\}',s)==re.findall(r'onSubmit=\{.*?\}\}',original)
for name in ['HomePage','HomeInquiryPanel','Header','Footer']:
    def block(text):
        a=text.index('function '+name+'('); b=text.index('\nfunction ',a+1); return text[a:b]
    assert block(s)==block(original),name
p.write_text(s)
text=layout.read_text()
layout.write_text(text.replace('import "./review-gallery.css";', 'import "./review-gallery.css";\nimport "./launch-polish.css";',1))
print('Added two historical telecasts and the scoped Home headline stylesheet. Forms and popup untouched.')
