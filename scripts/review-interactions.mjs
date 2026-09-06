import assert from 'node:assert/strict';
import { chromium } from '/tmp/sf-browser/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync } from 'node:fs';
const base='http://127.0.0.1:5173';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const report=[];
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:900}});
 const page=await context.newPage();
 for(const path of ['/challenges','/for-talent','/for-organizations','/partners','/about','/contact']){
  await page.goto(base,{waitUntil:'networkidle'});
  if(width===390)await page.getByRole('button',{name:'Open navigation menu'}).click();
  const nav=width===390?page.locator('#mobile-navigation'):page.locator('.site-header nav').first();
  // The menu also has a Join a Challenge CTA to the same URL; use the nav link.
  await nav.locator(`a[href="${path}"]`).first().click();
  await page.waitForURL(base+path);await page.locator('h1').first().waitFor();
  assert.doesNotMatch(await page.locator('h1').first().innerText(),/Get You Back on Track/);
  report.push({width,action:'navigation-click',path,pass:true});
 }
 await page.goto(base,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Start a Conversation',exact:true}).click();
 const dialog=page.getByRole('dialog');await dialog.waitFor();
 for(const [label,mailbox] of [['Launching a Challenge','challenges'],['Applying to a Challenge','challenges'],['Joining as Talent','talent'],['Hiring or Requesting Talent','talent'],['Partnership','partners'],['Investment or Venture Opportunity','hello'],['General Inquiry','hello']]){
  await dialog.getByRole('combobox').selectOption({label});
  assert.equal(await dialog.locator('form').getAttribute('data-email-recipient'),mailbox+'@startupfair.org');
  report.push({width,action:'inquiry-recipient',label,mailbox,pass:true});
 }
 await dialog.getByRole('button',{name:'Close',exact:true}).click();
 await dialog.waitFor({state:'hidden'});report.push({width,action:'popup-close-button',pass:true});
 await context.close();
}
// Review Home screenshots with explicit subpixel-rendering tolerance, not byte identity.
const context=await browser.newContext();const page=await context.newPage();
const visual=[];
for(const width of [1440,390]){
 const data=['before','after'].map(m=>'data:image/png;base64,'+readFileSync(`review-evidence/${m}/home-${width}.png`).toString('base64'));
 const comparison=await page.evaluate(async urls=>{
  const imgs=await Promise.all(urls.map(src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src})));
  if(imgs[0].width!==imgs[1].width||imgs[0].height!==imgs[1].height)return {sameDimensions:false};
  const canvas=document.createElement('canvas');canvas.width=imgs[0].width;canvas.height=imgs[0].height;const ctx=canvas.getContext('2d');
  const pixels=imgs.map(i=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(i,0,0);return ctx.getImageData(0,0,canvas.width,canvas.height).data});let differing=0;
  for(let k=0;k<pixels[0].length;k+=4)if(pixels[0][k]!==pixels[1][k]||pixels[0][k+1]!==pixels[1][k+1]||pixels[0][k+2]!==pixels[1][k+2])differing++;
  return {sameDimensions:true,width:canvas.width,height:canvas.height,differingPixelRatio:differing/(canvas.width*canvas.height)};
 },data);
 assert.equal(comparison.sameDimensions,true);assert.ok(comparison.differingPixelRatio<=0.003,`Home visual difference at ${width}: ${comparison.differingPixelRatio}`);
 visual.push(comparison);
}
const before=JSON.parse(readFileSync('review-evidence/before/audit.json','utf8'));
const after=JSON.parse(readFileSync('review-evidence/after/audit.json','utf8'));
assert.deepEqual(before.viewports.filter(x=>x.path==='/'),after.viewports.filter(x=>x.path==='/'));
await browser.close();
writeFileSync('review-evidence/interaction-checks.json',JSON.stringify({checks:report,homeVisualComparison:visual,note:'Home source/CSS and section inventory are unchanged. PNG comparison permits up to 0.3% differing pixels for subpixel rendering.'},null,2));
console.log(`Passed ${report.length} real browser click/recipient checks and Home preservation checks.`);
