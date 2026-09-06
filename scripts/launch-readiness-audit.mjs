import { chromium } from '/tmp/sf-launch-tools/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const out='launch-audit';mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:5173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const result={sourceCommit:'1fe5fc936c0c51bb602a8809eb4a7aac83eaa72c',headlines:[],pages:[],routes:[],formTests:[],accessibility:[],errors:[]};
async function open(page,path){await page.goto(base+path,{waitUntil:'networkidle'});await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);}
async function headline(page){return page.locator('.home-page .hero h1').evaluate(el=>{const chars=[];const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){for(let i=0;i<n.textContent.length;i++){const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);const b=r.getBoundingClientRect();chars.push({char:n.textContent[i],y:Math.round(b.y),x:b.x});}}const rows=new Map();for(const c of chars){rows.set(c.y,(rows.get(c.y)||'')+c.char);}return {lines:[...rows.values()],fontSize:getComputedStyle(el).fontSize,width:el.getBoundingClientRect().width};});}
try{
 for(const width of [1440,1280,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();
  await open(page,'/');result.headlines.push({width,current:await headline(page)});
  if([1440,390].includes(width))await page.screenshot({path:`${out}/home-current-${width}.png`,fullPage:false});
  // Visual-only proposal; no repository/site files are changed.
  await page.addStyleTag({content:'.home-page .hero>div:first-child{min-width:0;container-type:inline-size}.home-page .hero h1{font-size:clamp(32px,12.2cqw,76px);line-height:1.04}.home-page .hero h1>span{white-space:nowrap}'});
  result.headlines.at(-1).proposed=await headline(page);
  if([1440,390].includes(width))await page.screenshot({path:`${out}/home-proposed-${width}.png`,fullPage:false});
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();
 page.on('pageerror',e=>result.errors.push(String(e)));
 for(const path of ['/','/challenges','/for-talent','/for-organizations','/partners','/about','/contact','/privacy','/terms','/challenge-rules','/cookies','/challenges/ai-clinician-matching','/challenges/enterprise-ai-agent','/challenges/publisher-campaign-intelligence']){
  await open(page,path);
  result.pages.push(await page.evaluate(path=>({path,title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href||null,robots:document.querySelector('meta[name="robots"]')?.content||null,openGraph:document.querySelector('meta[property="og:image"]')?.content||null,h1:document.querySelector('h1')?.innerText,text:document.querySelector('main')?.innerText,images:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth,height:i.naturalHeight})),links:[...document.querySelectorAll('main a[href]')].map(a=>({text:a.innerText,href:a.getAttribute('href')}))}),path));
  if(['/','/challenges','/contact','/for-talent'].includes(path)){
   await page.addScriptTag({path:'/tmp/sf-launch-tools/node_modules/axe-core/axe.min.js'});
   const audit=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,help:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,failureSummary:n.failureSummary}))}));});
   result.accessibility.push({path,violations:audit});
  }
 }
 for(const path of ['/a-page-that-does-not-exist','/challenges/a-challenge-that-does-not-exist','/robots.txt','/sitemap.xml','/lunchbox-15-september-gallery.html','/lunchbox-29-october-gallery.html']){
  const r=await context.request.get(base+path);const text=await r.text();result.routes.push({path,status:r.status(),contentType:r.headers()['content-type'],h1:(text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)||[])[1]||null,bodyBeginning:text.slice(0,140)});
 }
 // Submit synthetic inquiry to the local preview and observe actual network behavior.
 await open(page,'/');let posts=[];const record=r=>{if(r.method()==='POST')posts.push(r.url())};page.on('request',record);
 await page.getByRole('button',{name:'Start a Conversation',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.waitFor();
 await dialog.getByLabel('Full name',{exact:true}).fill('Synthetic Launch Audit');await dialog.getByLabel('Work email',{exact:true}).fill('audit@example.test');await dialog.getByRole('combobox').selectOption({label:'General Inquiry'});await dialog.locator('textarea[name="message"]').fill('Synthetic preview test. No real inquiry.');await dialog.locator('input[name="contactPermission"]').check();await dialog.getByRole('button',{name:'Submit Inquiry',exact:true}).click();await page.waitForURL(base+'/contact/confirmation');
 result.formTests.push({test:'Home inquiry submit',url:page.url(),postRequests:posts,heading:await page.locator('h1').innerText(),reference:await page.locator('.application-reference strong').innerText(),body:await page.locator('main').innerText()});page.off('request',record);
 // Does first-step talent data survive Continue then Edit/Back navigation?
 await open(page,'/talent-profile/contact');
 const fields={legalName:'Synthetic Launch Audit',displayName:'Synthetic Audit',email:'audit@example.test',phone:'2025550123',country:'United States',region:'Test Region',city:'Test City',timezone:'UTC',preferredLanguage:'English'};
 for(const [name,value] of Object.entries(fields))await page.locator(`input[name="${name}"]`).fill(value);
 await page.locator('select[name="contactMethod"]').selectOption({label:'Email'});await page.locator('select[name="source"]').selectOption({label:'Search engine'});await page.locator('input[name="profileContactConsent"]').check();posts=[];page.on('request',record);
 await page.getByRole('button',{name:'Continue',exact:true}).click();await page.waitForURL(base+'/talent-profile/background');
 await page.locator('a[href="/talent-profile/contact"]').first().click();await page.waitForURL(base+'/talent-profile/contact');
 result.formTests.push({test:'Talent Continue then Back',nameRetained:await page.locator('input[name="legalName"]').inputValue(),emailRetained:await page.locator('input[name="email"]').inputValue(),postRequests:posts,step:await page.locator('.detail-hero .eyebrow').innerText()});page.off('request',record);
 await open(page,'/talent-profile/review');result.formTests.push({test:'Review direct access without authentication',url:page.url(),heading:await page.locator('h1').innerText(),body:await page.locator('main').innerText()});
 await context.close();
}catch(e){result.errors.push(String(e));throw e;}finally{writeFileSync(`${out}/results.json`,JSON.stringify(result,null,2));await browser.close();}
console.log(JSON.stringify({headlineRows:result.headlines,formTests:result.formTests.map(({body,...x})=>x),routes:result.routes,accessibility:result.accessibility.map(x=>({path:x.path,violations:x.violations.map(v=>({id:v.id,nodes:v.nodes.length}))})),errors:result.errors},null,2));
