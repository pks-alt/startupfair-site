import assert from 'node:assert/strict';
import { chromium } from '/tmp/sf-seo-tools/node_modules/playwright/index.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
const base='http://127.0.0.1:5173';const origin='https://www.startupfair.org';
mkdirSync('seo-evidence',{recursive:true});
const report={pages:[],routeChecks:[],robots:null,sitemap:null,footer:[],popups:[],errors:[],externalSocialDiscovery:[]};
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900},userAgent:'LinkedInBot/1.0'});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(String(e)));
 const pages=['/','/challenges','/for-talent','/for-organizations','/partners','/about','/contact','/challenges/ai-clinician-matching','/challenges/enterprise-ai-agent','/challenges/publisher-campaign-intelligence','/privacy','/terms','/cookies','/challenge-rules','/talent-profile/contact','/contact/confirmation'];
 const titles=new Set();const descriptions=new Set();
 for(const path of pages){
  const response=await page.goto(base+path,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  const html=await response.text();
  const m=await page.evaluate(()=>({title:document.title,titleCount:document.querySelectorAll('title').length,description:document.querySelector('meta[name="description"]')?.content,robots:document.querySelector('meta[name="robots"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href||null,ogImage:document.querySelector('meta[property="og:image"]')?.content||null,ogTitle:document.querySelector('meta[property="og:title"]')?.content||null,jsonld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),socialLinks:[...document.querySelectorAll('footer a')].map(a=>({label:a.textContent,href:a.href})).filter(a=>/linkedin|facebook|instagram|twitter|tiktok|youtube|pinterest/i.test(a.href))}));
  assert.equal(m.titleCount,1);assert.ok(m.description);assert.match(m.robots,/noindex/);assert.doesNotMatch(m.description,/prototype|click-through/);
  assert.equal(titles.has(m.title),false);titles.add(m.title);
  if(!path.includes('talent-profile')&&!path.includes('confirmation')){assert.equal(m.canonical,origin+path);assert.equal(m.ogImage,origin+'/startupfair-hero-global-ai.png');assert.equal(m.ogTitle,m.title);assert.ok(html.includes('property="og:image"'));assert.equal(descriptions.has(m.description),false);descriptions.add(m.description);}
  else assert.equal(m.canonical,null);
  assert.equal(m.socialLinks.length,1);assert.ok(m.socialLinks[0].href.startsWith('https://www.linkedin.com/'));report.pages.push({path,...m});
 }
 for(const path of ['/not-a-real-page','/challenges/not-a-real-challenge','/challenges/ai-clinician-matching/invalid-extra']){
  const response=await page.goto(base+path,{waitUntil:'networkidle'});const status=response.status();assert.equal(status,404,`${path} must be an actual 404`);report.routeChecks.push({path,status});
 }
 const robots=await context.request.get(base+'/robots.txt');assert.equal(robots.status(),200);assert.match(robots.headers()['content-type'],/text\/plain/);assert.doesNotMatch(await robots.text(),/<html|Disallow: \//);report.robots=await robots.text();
 const sitemap=await context.request.get(base+'/sitemap.xml');assert.equal(sitemap.status(),200);assert.match(sitemap.headers()['content-type'],/xml/);assert.match(await sitemap.text(),/<urlset/);assert.doesNotMatch(await sitemap.text(),/<html|<loc>/);report.sitemap=await sitemap.text();
 const image=await context.request.get(base+'/startupfair-hero-global-ai.png');assert.equal(image.status(),200);assert.match(image.headers()['content-type'],/image/);
 await context.close();
 for(const width of [1440,390]){
  const c=await browser.newContext({viewport:{width,height:900}});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  const link=p.locator('footer a[data-social-channel="linkedin"]');await link.scrollIntoViewIfNeeded();assert.match(await link.getAttribute('href'),/linkedin.com\/sharing/);
  await p.locator('footer').screenshot({path:`seo-evidence/footer-${width}.png`});report.footer.push({width,linkedinOnly:true});
  await p.getByRole('button',{name:'Start a Conversation',exact:true}).click();const dialog=p.getByRole('dialog');await dialog.waitFor();await p.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});report.popups.push({width,opensAndCloses:true});
  await p.goto(base+'/about',{waitUntil:'networkidle'});assert.equal(await p.locator('#event-telecasts .telecast-card').count(),2);
  await c.close();
 }
 assert.equal(report.errors.length,0);
 console.log('PASS: unique server-rendered metadata, canonical/OG, noindex gates, valid robots/sitemap, actual 404 responses, LinkedIn-only footer and existing popup/video preservation.');
}catch(e){report.failure=String(e);throw e;}finally{writeFileSync('seo-evidence/seo-results.json',JSON.stringify(report,null,2));await browser.close();}
