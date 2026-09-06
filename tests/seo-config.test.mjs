import test from 'node:test';
import assert from 'node:assert/strict';
import { SEO_PAGES, metadataFor, indexingAllowed, canonicalFor, structuredDataFor, sitemapXml, robotsText } from '../lib/seo.ts';
import { SITE_ORIGIN, SEARCH_LAUNCH_APPROVED, SOCIAL_CHANNELS, verifiedLinkedinUrl, linkedinShareUrl } from '../lib/seo-config.ts';
import { KNOWN_PATHS } from '../lib/site-routes.ts';
test('all public descriptions and titles are unique, descriptive and free of prototype copy',()=>{
 assert.equal(new Set(Object.values(SEO_PAGES).map(x=>x.title)).size,Object.keys(SEO_PAGES).length);
 assert.equal(new Set(Object.values(SEO_PAGES).map(x=>x.description)).size,Object.keys(SEO_PAGES).length);
 for(const [p,x] of Object.entries(SEO_PAGES)){assert.ok(KNOWN_PATHS.has(p));assert.ok(x.title.length<75);assert.ok(x.description.length>90&&x.description.length<180);assert.doesNotMatch(x.description,/prototype|click-through/i);}
});
test('search release is locked and non-production hosts never index',()=>{
 assert.equal(SEARCH_LAUNCH_APPROVED,false);
 for(const host of ['localhost','127.0.0.1:5173','anything.app.github.dev','www.startupfair.org.evil.test','startupfair.org',''])assert.equal(indexingAllowed('/',host,true),false);
 assert.equal(indexingAllowed('/','www.startupfair.org',true),true);
 assert.equal(indexingAllowed('/','www.startupfair.org'),false);
});
test('forms, policies and three unfinalized challenge pages stay out of index and sitemap',()=>{
 for(const p of ['/talent-profile/contact','/contact/confirmation','/privacy','/terms','/challenge-rules','/cookies',...Object.keys(SEO_PAGES).filter(x=>x.startsWith('/challenges/'))])assert.equal(indexingAllowed(p,'www.startupfair.org',true),false);
 assert.equal((sitemapXml('www.startupfair.org',true).match(/<loc>/g)||[]).length,7);
 assert.equal((sitemapXml('localhost',true).match(/<loc>/g)||[]).length,0);
 assert.equal((sitemapXml('www.startupfair.org').match(/<loc>/g)||[]).length,0);
});
test('canonical strips campaign tracking and unknown forms get no public canonical',()=>{
 assert.equal(canonicalFor('/for-talent?utm_source=linkedin#profile'),SITE_ORIGIN+'/for-talent');
 assert.equal(canonicalFor('/talent-profile/contact?email=private@example.test'),null);
 assert.equal(metadataFor('/contact','localhost').alternates.canonical,SITE_ORIGIN+'/contact');
});
test('only LinkedIn marketing; company page is the owner-supplied public URL',()=>{
 assert.deepEqual(SOCIAL_CHANNELS,['linkedin']);assert.equal(verifiedLinkedinUrl(),'https://www.linkedin.com/company/startupfair/');
 assert.equal(new URL(verifiedLinkedinUrl()).search,'');
 const share=new URL(linkedinShareUrl());assert.equal(share.hostname,'www.linkedin.com');assert.equal(share.searchParams.get('url'),SITE_ORIGIN+'/');
 assert.equal(new URL(linkedinShareUrl('//evil.test')).searchParams.get('url'),SITE_ORIGIN+'/');
});
test('structured data includes only the supplied social account and no invented events or ratings',()=>{
 const data=structuredDataFor('/');assert.ok(data);assert.doesNotMatch(JSON.stringify(data),/Event|JobPosting|AggregateRating/);
 assert.deepEqual(data['@graph'].find(item=>item['@type']==='Organization').sameAs,['https://www.linkedin.com/company/startupfair/']);
 assert.equal(structuredDataFor('/talent-profile/contact'),null);assert.equal(structuredDataFor('/challenges/ai-clinician-matching'),null);
 assert.match(robotsText('localhost'),/Allow: \//);assert.doesNotMatch(robotsText('localhost'),/Disallow: \/|Sitemap:/);
});
