import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from '/tmp/sf-handoff-browser/node_modules/playwright/index.mjs';

const base = 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const report = [];

async function expectPage(page, path, text) {
  const response = await page.goto(base + path, { waitUntil: 'networkidle' });
  assert.ok(response && response.ok(), `${path} returned ${response?.status()}`);
  await page.getByText(text, { exact: false }).first().waitFor();
  report.push({ check: 'page', path, text, pass: true });
}

function registeredRoutes() {
  const source = readFileSync('lib/site-routes.ts', 'utf8');
  const listBody = source.match(/SITE_PATHS\s*=\s*\[([\s\S]*?)\]\s*as const/)?.[1] ?? '';
  return [...listBody.matchAll(/"(\/[^"\n]*)"/g)].map(match => match[1]);
}

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const corePages = [
  ['/', 'Build. Solve.'],
  ['/challenges', 'Real Problems. Proven Capability. Meaningful Outcomes.'],
  ['/challenges/global-ai-software-talent', 'Global AI & Software Talent Challenge'],
  ['/challenges/global-innovator', 'Global Innovator Challenge'],
  ['/apply/global-ai-software-talent', 'A résumé is not required at this stage'],
  ['/apply/global-ai-software-talent/full-application', 'Full Application'],
  ['/apply/global-ai-software-talent/confirmation', 'Your Talent Application Has Been Submitted'],
  ['/apply/global-innovator', 'A pitch deck is not required at this stage'],
  ['/apply/global-innovator/full-application', 'Full Application'],
  ['/apply/global-innovator/confirmation', 'Your Innovator Application Has Been Submitted'],
  ['/for-talent', 'Prove What You Can Build'],
  ['/for-organizations', 'Solve Real Problems. Discover Proven Talent.'],
  ['/partners', 'Build the Future of Talent and Innovation Together.'],
  ['/about', 'Built on Entrepreneurial Roots'],
  ['/contact', 'Start With the Right Conversation.'],
  ['/launch-challenge', 'Launch an AI or Innovation Challenge'],
  ['/find-talent', 'Find Proven Talent'],
  ['/partner-inquiry', 'Partner'],
  ['/privacy', 'Privacy'],
  ['/terms', 'Terms'],
  ['/challenge-rules', 'Challenge'],
  ['/cookies', 'Cookie'],
];
for (const [path, text] of corePages) await expectPage(page, path, text);

// Every registered route must answer successfully. This protects all existing beta workflows.
const routes = registeredRoutes();
assert.equal(routes.length, 89, `Expected 89 registered routes, found ${routes.length}`);
for (const path of routes) {
  const response = await page.request.get(base + path, { failOnStatusCode: false });
  assert.ok(response.status() >= 200 && response.status() < 400, `${path} returned ${response.status()}`);
}
report.push({ check: 'all-registered-routes', routes: routes.length, pass: true });

// Homepage preservation and approved compact flow.
await page.goto(base + '/', { waitUntil: 'networkidle' });
const heroSrc = await page.locator('.hero-art-image img').first().getAttribute('src');
assert.equal(heroSrc, '/startupfair-hero-global-ai.png');
assert.ok(await page.getByText('Two Global Programs. Built for Real Outcomes.', { exact: false }).count());
assert.ok(await page.getByText('Built Around Demonstrated Ability and Real Outcomes', { exact: false }).count());
assert.ok(await page.getByText('Ideas Across Industries', { exact: false }).count());
assert.ok(await page.locator('a[href="/challenges/global-ai-software-talent"]').count());
assert.ok(await page.locator('a[href="/challenges/global-innovator"]').count());
assert.ok(await page.locator('a[href="/launch-challenge"]').count());
assert.ok(await page.locator('a[href="/challenges?theme=healthcare-workforce"]').count());
const schedule = page.locator('.approved-schedule-note');
assert.ok(await schedule.count());
const scheduleSize = parseFloat(await schedule.evaluate(el => getComputedStyle(el).fontSize));
assert.ok(scheduleSize <= 12, `Schedule notice too prominent: ${scheduleSize}px`);
report.push({ check: 'homepage-approved-flow', pass: true });

// Contact popup routing on Home.
await page.getByRole('button', { name: 'Start a Conversation', exact: true }).click();
const dialog = page.getByRole('dialog');
await dialog.waitFor();
for (const [label, mailbox] of [
  ['Launching a Challenge', 'challenges@startupfair.org'],
  ['Applying to a Challenge', 'challenges@startupfair.org'],
  ['Joining as Talent', 'talent@startupfair.org'],
  ['Hiring or Requesting Talent', 'talent@startupfair.org'],
  ['Partnership', 'partners@startupfair.org'],
  ['Investment or Venture Opportunity', 'hello@startupfair.org'],
  ['General Inquiry', 'hello@startupfair.org'],
]) {
  await dialog.getByRole('combobox').selectOption({ label });
  assert.equal(await dialog.locator('form').getAttribute('data-email-recipient'), mailbox);
}
await dialog.getByRole('button', { name: 'Close', exact: true }).click();
report.push({ check: 'home-inquiry-routing', pass: true });

// Homepage theme links must arrive at a functioning filtered directory.
await page.goto(base + '/challenges?theme=healthcare-workforce', { waitUntil: 'networkidle' });
await page.getByText('AI Clinician Matching Challenge', { exact: true }).waitFor();
assert.equal(await page.getByText('Enterprise AI Agent Builder', { exact: true }).count(), 0);
assert.ok(await page.getByText('Theme filter: healthcare workforce', { exact: false }).count());
report.push({ check: 'challenge-theme-deep-link', pass: true });

// Directory filters must operate without dead cards.
await page.goto(base + '/challenges', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Coming Soon', exact: true }).click();
await page.getByText('Publisher-to-Campaign Intelligence', { exact: true }).waitFor();
assert.equal(await page.getByText('AI Clinician Matching Challenge', { exact: true }).count(), 0);
report.push({ check: 'challenge-directory-filter', pass: true });

// Initial qualification must never upload resume/deck or auto-unlock the full application.
await page.goto(base + '/apply/global-ai-software-talent', { waitUntil: 'networkidle' });
assert.equal(await page.locator('input[type="file"]').count(), 0, 'Talent qualification requests a file too early');
assert.equal(await page.locator('input[name="resume"]').count(), 0, 'Talent qualification contains a resume input');
await page.getByRole('button', { name: /Step 5.*Review & Submit/i }).click();
await page.getByRole('button', { name: 'Submit Qualification', exact: true }).click();
await page.getByText('Your Qualification Is Under Review.', { exact: false }).waitFor();
assert.equal(new URL(page.url()).pathname, '/apply/global-ai-software-talent');
assert.equal(await page.locator('input[type="file"]').count(), 0);
report.push({ check: 'talent-qualification-review-gate', pass: true });

await page.goto(base + '/apply/global-innovator', { waitUntil: 'networkidle' });
assert.equal(await page.locator('input[type="file"]').count(), 0, 'Innovator qualification requests files too early');
await page.getByRole('button', { name: /Step 5.*Review & Submit/i }).click();
await page.getByRole('button', { name: 'Submit Qualification', exact: true }).click();
await page.getByText('Your Innovation Qualification Is Under Review.', { exact: false }).waitFor();
assert.equal(new URL(page.url()).pathname, '/apply/global-innovator');
report.push({ check: 'innovator-qualification-review-gate', pass: true });

// Full applications contain the expected uploads and explicit invite boundary.
await page.goto(base + '/apply/global-ai-software-talent/full-application', { waitUntil: 'networkidle' });
assert.ok(await page.getByText('Qualification approval required', { exact: false }).count());
assert.ok(await page.locator('input[name="resume"][type="file"]').count(), 'Talent full application missing resume upload');
await page.goto(base + '/apply/global-innovator/full-application', { waitUntil: 'networkidle' });
assert.ok(await page.getByText('Qualification approval required', { exact: false }).count());
assert.ok(await page.locator('input[name="pitch"][type="file"]').count(), 'Innovator full application missing pitch upload');
report.push({ check: 'full-application-boundary-and-uploads', pass: true });

// Internal links rendered on key public pages must point to registered routes (hash/external/contact links excluded).
const linkPages = ['/', '/challenges', '/challenges/global-ai-software-talent', '/challenges/global-innovator', '/for-talent', '/for-organizations', '/partners', '/about', '/contact'];
const routeSet = new Set(routes);
for (const path of linkPages) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  const hrefs = await page.locator('a[href]').evaluateAll(els => els.map(el => el.getAttribute('href')).filter(Boolean));
  for (const href of hrefs) {
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:\/\//.test(href)) continue;
    const pathname = new URL(href, base).pathname;
    assert.ok(routeSet.has(pathname), `Unregistered internal link ${href} rendered on ${path}`);
  }
}
report.push({ check: 'key-page-internal-links', pages: linkPages.length, pass: true });

// Existing historical assets and telecasts remain available.
await page.goto(base + '/about', { waitUntil: 'networkidle' });
assert.ok(await page.locator('img[src="/history/homeslide6.png"]').count(), 'Historical primary image missing');
assert.ok(await page.getByText('Watch earlier StartupFair events.', { exact: false }).count(), 'Telecasts section missing');
assert.ok(await page.locator('a[href*="youtube.com/watch?v=fYOiJnL4Ars"]').count(), 'Telecast 1 missing');
assert.ok(await page.locator('a[href*="youtube.com/watch?v=OLXfRG4oYok"]').count(), 'Telecast 2 missing');
const brokenImages = await page.locator('img').evaluateAll(imgs => imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.getAttribute('src')));
assert.deepEqual(brokenImages, [], `Broken About images: ${brokenImages.join(', ')}`);
report.push({ check: 'history-and-telecasts-preserved', pass: true });

// Mobile navigation and horizontal layout integrity on major new pages.
for (const path of ['/', '/challenges', '/challenges/global-ai-software-talent', '/challenges/global-innovator', '/apply/global-ai-software-talent', '/apply/global-innovator']) {
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await mobile.newPage();
  await p.goto(base + path, { waitUntil: 'networkidle' });
  const widths = await p.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  assert.ok(widths.scroll <= widths.client + 2, `${path} has mobile horizontal overflow ${widths.scroll} > ${widths.client}`);
  await p.getByRole('button', { name: 'Open navigation menu' }).click();
  const nav = p.locator('#mobile-navigation');
  await nav.waitFor();
  assert.ok(await nav.locator('a[href="/challenges"]').count());
  await nav.locator('a[href="/about"]').first().click();
  await p.waitForURL(base + '/about');
  await mobile.close();
}
report.push({ check: 'mobile-navigation-and-overflow', pass: true });

// Unknown routes remain 404 and search indexing remains disabled.
const missing = await page.goto(base + '/for-innovators', { waitUntil: 'networkidle' });
assert.equal(missing?.status(), 404);
await page.goto(base + '/', { waitUntil: 'networkidle' });
const robots = await page.locator('meta[name="robots"]').getAttribute('content');
assert.match(robots ?? '', /noindex/i);
report.push({ check: '404-and-search-lock', pass: true });

await context.close();
await browser.close();
console.log(JSON.stringify({ passed: report.length, report }, null, 2));
