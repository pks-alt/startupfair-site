import assert from 'node:assert/strict';
import { chromium } from '/tmp/sf-launch-tools/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { EVENT_TELECASTS } from '../lib/event-telecasts.ts';
const out='launch-audit';mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:5173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={testedApplicationSource:'1fe5fc936c0c51bb602a8809eb4a7aac83eaa72c plus requested video/headline changes',headlines:[],videos:[],popup:[],youtubeMetadata:[],browserErrors:[],playbackVerified:false};
let activePage;
async function open(page,path){await page.goto(base+path,{waitUntil:'networkidle'});await page.locator('h1').first().waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{},{timeout:10000}).catch(()=>{});}
try{
 assert.equal(EVENT_TELECASTS[0].watchUrl,'https://www.youtube.com/watch?v=fYOiJnL4Ars&t=7s');
 assert.equal(EVENT_TELECASTS[1].watchUrl,'https://www.youtube.com/watch?v=OLXfRG4oYok');
 for(const width of [1440,1280,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();activePage=page;
  page.on('pageerror',e=>report.browserErrors.push({width,url:page.url(),message:String(e)}));
  await open(page,'/');
  const measured=await page.locator('.home-page .hero h1').evaluate(el=>{
    const rows=new Map();const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
    while(n=walker.nextNode())for(let i=0;i<n.textContent.length;i++){const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);const y=Math.round(r.getBoundingClientRect().y);rows.set(y,(rows.get(y)||'')+n.textContent[i]);}
    return {lines:[...rows.values()],fontSize:getComputedStyle(el).fontSize,overflow:document.documentElement.scrollWidth>innerWidth+1};
  });
  assert.deepEqual(measured.lines,['Build. Solve.','Get Discovered.']);assert.equal(measured.overflow,false);report.headlines.push({width,...measured});
  if([1440,390].includes(width))await page.screenshot({path:`${out}/home-fixed-${width}.png`});
  await page.getByRole('button',{name:'Start a Conversation',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.waitFor();const b=await dialog.boundingBox();assert.ok(b&&b.x>=0&&b.y>=0&&b.x+b.width<=width+1&&b.y+b.height<=901);await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});report.popup.push({width,contained:true,escapeClose:true});
  const ytRequests=[];page.on('request',r=>{if(/youtube|ytimg/.test(r.url()))ytRequests.push(r.url())});
  await open(page,'/about');const section=page.locator('#event-telecasts');await section.scrollIntoViewIfNeeded();
  assert.equal(await section.locator('iframe').count(),0);assert.equal(ytRequests.length,0);assert.equal(await section.locator('.telecast-card').count(),2);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  if([1440,390].includes(width))await section.screenshot({path:`${out}/event-telecasts-${width}.png`});
  for(const video of EVENT_TELECASTS){
    const card=section.locator('article').filter({has:page.getByRole('heading',{name:video.title,exact:true})});const link=card.getByRole('link');
    assert.equal(await link.getAttribute('href'),video.watchUrl);assert.equal(await link.getAttribute('target'),'_blank');assert.match(await link.getAttribute('rel'),/noopener/);
    await card.getByRole('button',{name:`Load ${video.title} player`,exact:true}).click();const frame=card.locator('iframe');await frame.waitFor();
    assert.equal(await frame.getAttribute('src'),video.embedUrl);assert.equal(await frame.getAttribute('referrerpolicy'),'strict-origin-when-cross-origin');assert.equal(await link.isVisible(),true);
    const fb=await frame.boundingBox();assert.ok(fb&&fb.width>=200&&fb.height>=200);
    report.videos.push({width,id:video.id,watchUrl:video.watchUrl,embedUrl:video.embedUrl,loadsOnClick:true,directLinkVisible:true,frameBounds:fb});
  }
  await context.close();
 }
 const context=await browser.newContext();
 for(const video of EVENT_TELECASTS){
  try{const r=await context.request.get('https://www.youtube.com/oembed',{params:{url:video.watchUrl,format:'json'},timeout:15000});let data=null;try{data=await r.json()}catch{};report.youtubeMetadata.push({id:video.id,status:r.status(),title:data?.title||null,author:data?.author_name||null,provider:data?.provider_name||null});}catch(e){report.youtubeMetadata.push({id:video.id,error:String(e).slice(0,300)})}
 }
 await context.close();
 console.log('PASS: two-line Home headline at six widths, popup preservation, both video links, deferred iframe loading and fallback links. YouTube playback is not certified.');
}catch(e){report.testError=String(e);if(activePage&&!activePage.isClosed())await activePage.screenshot({path:`${out}/failure.png`}).catch(()=>{});throw e;}finally{writeFileSync(`${out}/video-headline-verification.json`,JSON.stringify(report,null,2));await browser.close();}
