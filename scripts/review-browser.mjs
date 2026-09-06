import { chromium } from '/tmp/sf-browser/node_modules/playwright/index.mjs';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const mode=process.argv[2] || 'after';
const out=`review-evidence/${mode}`;mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const base='http://127.0.0.1:5173';
const primary=['/','/challenges','/for-talent','/for-organizations','/partners','/about','/contact'];
const results={mode,viewports:[],routes:[],modal:[],failures:[],notes:[]};
const allLinks=new Set();
const expect=(condition,message)=>{if(!condition)results.failures.push(message)};
for(const width of [1440,390,768,1024]){
 const context=await browser.newContext({viewport:{width,height:900}});
 const page=await context.newPage();
 for(const path of primary){
  await page.goto(base+path,{waitUntil:'networkidle'});
  await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>({title:document.querySelector('h1')?.innerText,headers:document.querySelectorAll('.site-header').length,footers:document.querySelectorAll('footer').length,overflow:document.documentElement.scrollWidth>innerWidth+1,sections:[...document.querySelectorAll('main section')].map(s=>({title:s.querySelector('h1,h2')?.textContent,padding:getComputedStyle(s).paddingTop})),images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})),heroImage:document.querySelector('.hero-art>img')?.getAttribute('src'),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
  results.viewports.push({width,path,...metrics});
  expect(!metrics.overflow,`${path} horizontal overflow at ${width}`);
  expect(metrics.headers===1&&metrics.footers===1,`${path} shared shell at ${width}`);
  if(mode==='after')expect(metrics.heroImage==='/startupfair-hero-global-ai.png',`${path} missing exact Home image at ${width}`);
  for(const i of metrics.images)expect(i.loaded,`${path} unloaded image: ${i.src} at ${width}`);
  for(const href of metrics.links)if(href?.startsWith('/')&&!href.startsWith('//'))allLinks.add(href.split('#')[0]);
  if(width===1440||width===390)await page.screenshot({path:`${out}/${path==='/'?'home':path.slice(1)}-${width}.png`,fullPage:true});
 }
 await page.goto(base,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Start a Conversation',exact:true}).click();
 const dialog=page.getByRole('dialog');await dialog.waitFor({state:'visible'});
 const box=await dialog.boundingBox();const bg=await dialog.evaluate(e=>getComputedStyle(e).backgroundColor);
 expect(box&&box.x>=0&&box.y>=0&&box.x+box.width<=width+1&&box.y+box.height<=901,`Popup out of viewport ${width}`);
 expect(bg==='rgb(255, 255, 255)',`Popup transparent ${width}`);
 await dialog.getByLabel('Full name',{exact:true}).fill('Preview Test');
 await dialog.getByLabel('Work email',{exact:true}).fill('preview@example.test');
 await dialog.getByRole('combobox').selectOption({label:'Partnership'});
 expect(await dialog.locator('form').getAttribute('data-email-recipient')==='partners@startupfair.org',`Popup recipient ${width}`);
 results.modal.push({width,box,background:bg});
 if(width===1440||width===390)await page.screenshot({path:`${out}/popup-${width}.png`});
 await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
 await context.close();
}
const source=readFileSync('components/startupfair-page.tsx','utf8');
for(const m of source.matchAll(/if \(page === "([^"]+)"\)/g))allLinks.add(m[1]==='home'?'/':'/'+m[1]);
for(const p of ['privacy','terms','cookies','challenge-rules'])allLinks.add('/'+p);
const context=await browser.newContext({viewport:{width:390,height:844}});
for(const path of [...allLinks].sort()){
 const response=await context.request.get(base+path);const html=await response.text();
 const h1=(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]||'';
 const okay=response.ok()&&!!h1&&!/Get You Back on Track|page (was )?not found|page you.re looking|page isn.t available|page could not be found/i.test(h1);
 results.routes.push({path,status:response.status(),h1:h1.replace(/<[^>]+>/g,''),okay});
 expect(okay,`Route failed: ${path} (${response.status()}) ${h1}`);
}
const page=await context.newPage();
for(const r of results.routes){
 if(!/^\/(apply|talent-profile|launch-challenge|find-talent|partner-inquiry)(\/|$)/.test(r.path))continue;
 await page.goto(base+r.path,{waitUntil:'domcontentloaded'});await page.locator('h1').first().waitFor();
 const form=await page.evaluate(()=>({forms:document.querySelectorAll('form').length,overflow:document.documentElement.scrollWidth>innerWidth+1,recipient:document.querySelector('form')?.getAttribute('data-email-recipient'),preview:document.querySelector('form')?.getAttribute('data-delivery-mode')}));
 r.form=form;expect(!form.overflow,`Form overflow: ${r.path}`);
 if(form.forms)expect(!!form.recipient&&form.preview==='preview-only',`Form email/status: ${r.path}`);
}
await browser.close();results.failures=[...new Set(results.failures)];
writeFileSync(`${out}/audit.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify({mode,pages:results.viewports.length,routes:results.routes.length,modal:results.modal.length,failures:results.failures},null,2));
if(mode==='after'&&results.failures.length)process.exitCode=1;
