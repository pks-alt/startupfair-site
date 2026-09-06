import assert from 'node:assert/strict';
import { chromium } from '/tmp/sf-poster-tools/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { EVENT_TELECASTS } from '../lib/event-telecasts.ts';
const base='http://127.0.0.1:5173';
const out='telecast-evidence';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={posters:[],players:[],noJavascript:[],fallback:[],popup:[],errors:[],playbackVerified:false};
let activePage;
try{
 for(const width of [1440,1024,768,390,320]){
  const c=await browser.newContext({viewport:{width,height:900}});
  const p=await c.newPage();activePage=p;const youtubeRequests=[];
  p.on('request',r=>{if(/youtube|ytimg/.test(r.url()))youtubeRequests.push(r.url())});
  p.on('pageerror',e=>report.errors.push(String(e)));
  await p.goto(base+'/about',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const section=p.locator('#event-telecasts');await section.scrollIntoViewIfNeeded();
  assert.equal(await section.locator('iframe').count(),0);
  await p.waitForFunction(()=>[...document.querySelectorAll('.telecast-poster')].every(i=>i.complete&&i.naturalWidth>=320));
  assert.equal(youtubeRequests.length,0,'No YouTube connection before a click');
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  const images=await section.locator('.telecast-poster').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),width:i.naturalWidth,height:i.naturalHeight,loaded:i.complete,loading:i.loading})));
  assert.equal(images.length,2);assert.notEqual(images[0].src,images[1].src);
  report.posters.push({viewport:width,images,noYoutubeRequests:true});
  if([1440,390].includes(width))await section.screenshot({path:`${out}/telecasts-${width}.png`});
  for(const v of EVENT_TELECASTS){
   const card=section.locator('article').filter({has:p.getByRole('heading',{name:v.title,exact:true})});
   const button=card.getByRole('button',{name:`Load ${v.title} player`,exact:true});
   const link=card.getByRole('link');assert.equal(await link.getAttribute('href'),v.watchUrl);
   if(width===390){await button.focus();await p.keyboard.press('Enter')}else await button.click();
   const iframe=card.locator('iframe');await iframe.waitFor();
   assert.equal(await iframe.getAttribute('src'),v.embedUrl);assert.equal(await card.locator('.telecast-poster').count(),0);
   assert.ok(await link.isVisible());const bounds=await iframe.boundingBox();
   assert.ok(bounds&&bounds.x>=0&&bounds.x+bounds.width<=width+1&&bounds.width>=200&&bounds.height>=200);
   assert.equal(new URL(v.embedUrl).searchParams.get('autoplay'),null);
   report.players.push({viewport:width,id:v.id,correctDestination:true,keyboardOrPointer:true,contained:true});
  }
  await p.goto(base,{waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Start a Conversation',exact:true}).click();const dialog=p.getByRole('dialog');await dialog.waitFor();await p.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});report.popup.push({viewport:width,opensAndCloses:true});
  await c.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});const p=await nojs.newPage();activePage=p;
 await p.goto(base+'/about',{waitUntil:'load'});await p.waitForFunction(()=>[...document.querySelectorAll('.telecast-poster')].every(i=>i.complete&&i.naturalWidth>=320));
 assert.equal(await p.locator('.telecast-poster').count(),2);assert.equal(await p.locator('#event-telecasts iframe').count(),0);assert.equal(await p.locator('.telecast-youtube-link').count(),2);report.noJavascript.push({postersVisible:true,directLinksAvailable:true});await nojs.close();
 const failed=await browser.newContext({viewport:{width:390,height:900}});const f=await failed.newPage();activePage=f;
 await f.route('**/telecast-posters/*.jpg',route=>route.abort());await f.goto(base+'/about',{waitUntil:'networkidle'});
 const fallback=f.locator('#event-telecasts');await fallback.scrollIntoViewIfNeeded();assert.equal(await fallback.getByRole('button').count(),2);assert.equal(await fallback.locator('.telecast-youtube-link').count(),2);
 await fallback.getByRole('button').first().click();await fallback.locator('iframe').waitFor();report.fallback.push({failedImageDoesNotBlockPlayer:true,directLinksAvailable:true});await failed.close();
 assert.equal(report.errors.length,0);
 assert.equal(EVENT_TELECASTS[0].watchUrl,'https://www.youtube.com/watch?v=fYOiJnL4Ars&t=7s');
 assert.equal(EVENT_TELECASTS[1].watchUrl,'https://www.youtube.com/watch?v=OLXfRG4oYok');
 assert.equal(new URL(EVENT_TELECASTS[0].embedUrl).searchParams.get('start'),'7');
 report.provenance=JSON.parse(readFileSync('docs/telecast-poster-provenance.json','utf8'));
 console.log('PASS: both initial poster images, no pre-click YouTube connections, keyboard/click loading, original URLs, five viewport widths, no-JS preview, image-failure fallback and existing popup.');
}catch(e){report.failure=String(e);if(activePage&&!activePage.isClosed())await activePage.screenshot({path:out+'/failure.png'}).catch(()=>{});throw e}finally{writeFileSync(out+'/results.json',JSON.stringify(report,null,2));await browser.close()}
