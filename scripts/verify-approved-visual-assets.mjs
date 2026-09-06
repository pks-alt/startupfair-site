import assert from 'node:assert/strict';
import { chromium } from '/tmp/sf-poster-tools/node_modules/playwright/index.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root='http://127.0.0.1:5173';
const out='approved-visual-evidence';mkdirSync(out,{recursive:true});
const assets=JSON.parse(readFileSync('docs/approved-prize-photo-assets.json','utf8'));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report={gallery:[],posters:[],errors:[]};
try {
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(String(e)));
  const response=await page.goto(root+'/about',{waitUntil:'networkidle'});assert.equal(response.status(),200);
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>[...document.querySelectorAll('.about-history-gallery img,.telecast-poster')].every(i=>i.complete&&i.naturalWidth>0));
  assert.equal(await page.locator('.about-history-gallery img').count(),4);
  for(const asset of assets){
   const path='/history/'+asset.destination;const img=page.locator(`.about-history-gallery img[src="${path}"]`);assert.equal(await img.count(),1);
   const dimensions=await img.evaluate(i=>[i.naturalWidth,i.naturalHeight]);assert.deepEqual(dimensions,asset.size);
   const r=await context.request.get(root+path);assert.equal(r.status(),200);assert.match(r.headers()['content-type'],/image\/png/);
   assert.equal(createHash('sha256').update(await r.body()).digest('hex'),asset.committed_png_sha256);
   report.gallery.push({width,path,dimensions,approvedAssetServed:true});
  }
  assert.equal(await page.locator('#event-telecasts .telecast-poster').count(),2);
  assert.equal(await page.locator('#event-telecasts iframe').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.locator('.about-history-gallery').screenshot({path:`${out}/gallery-${width}.png`});
  await page.locator('#event-telecasts').screenshot({path:`${out}/videos-${width}.png`});
  report.posters.push({width,visibleBeforeClick:true});await context.close();
 }
 assert.equal(report.errors.length,0);
 console.log('PASS: approved photo bytes served at both new paths; original gallery layout and both pre-click video posters retained.');
} finally { writeFileSync(`${out}/results.json`,JSON.stringify(report,null,2));await browser.close(); }
