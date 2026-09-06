"""Preserve original archive photographs locally when retrievable. Never invent replacements."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import hashlib,json,subprocess
base='https://www.startupfair.org'
paths=['/img/homeslide6.png','/img/homeslide2.png','/img/lunchbox/107.jpg','/img/lunchbox/29.jpg']
folder=Path('public/history');folder.mkdir(exist_ok=True,parents=True)
def download(path):
 dest=folder/Path(path).name
 attempts=[]
 for root in ['https://www.startupfair.org','https://startupfair.org','http://www.startupfair.org']:
  result=subprocess.run(['curl','-4','--fail','--location','--connect-timeout','8','--max-time','20','--silent','--show-error','--output',str(dest),root+path],capture_output=True,text=True)
  if result.returncode==0:
   b=dest.read_bytes()
   if len(b)>10000 and (b.startswith(b'\x89PNG\r\n\x1a\n') or b.startswith(b'\xff\xd8\xff')):
    return {'source':base+path,'local':'/history/'+dest.name,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b),'status':'preserved'}
  attempts.append({'source':root+path,'error':result.stderr.strip()[:300]})
 if dest.exists():dest.unlink()
 return {'source':base+path,'status':'unavailable','attempts':attempts}
with ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(download,paths))
p=Path('components/startupfair-page.tsx');s=p.read_text()
for r in results:
 if r['status']=='preserved':s=s.replace(r['source'],r['local'])
p.write_text(s)
Path('docs/historical-image-manifest.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
if any(r['status']!='preserved' for r in results):raise SystemExit('Archive photo fetch failed; review branch is not approved for preview.')
