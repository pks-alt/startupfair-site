import assert from 'node:assert/strict';
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

const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

const corePages = [
  ['/', 'Build. Solve.'],
  ['/challenges', 'Two Recurring Global Programs'],
  ['/challenges/global-ai-software-talent', 'Global AI & Software Talent Challenge'],
  ['/challenges/global-innovator', 'Global Innovator Challenge'],
  ['/apply/global-ai-software-talent', 'Show Us What You Can Build'],
  ['/apply/global-ai-software-talent/full-application', 'Full Application'],
  ['/apply/global-ai-software-talent/confirmation', 'Application'],
  ['/apply/global-innovator', 'Global Innovator'],
  ['/apply/global-innovator/full-application', 'Full Application'],
  ['/apply/global-innovator/confirmation', 'Application'],
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

// Homepage preservation and approved flow.
await page.goto(base + '/', { waitUntil: 'networkidle' });
const heroSrc = await page.locator('.hero-art-image img').first().getAttribute('src');
assert.equal(heroSrc, '/startupfair-hero-global-ai.png');
assert.ok(await page.getByText('Two Global Programs. Built for Real Outcomes.', { exact: false }).count());
assert.ok(await page.getByText('Built Around Demonstrated Ability and Real Outcomes', { exact: false }).count());
assert.ok(await page.getByText('Ideas Across Industries', { exact: false }).count());
assert.equal(await page.locator('a[href="/challenges/global-ai-software-talent"]').count() > 0, true);
assert.equal(await page.locator('a[href="/challenges/global-innovator"]').count() > 0, true);
assert.equal(await page.locator('a[href="/launch-challenge"]').count() > 0, true);
assert.equal(await page.locator('a[href="/challenges?theme=healthcare-workforce"]').count() > 0, true);
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

// Initial qualification must not request resume/deck files.
await page.goto(base + '/apply/global-ai-software-talent', { waitUntil: 'networkidle' });
assert.equal(await page.locator('input[type="file"]').count(), 0, 'Talent qualification requests a file too early');
assert.equal(await page.locator('text=Resume').count(), 0, 'Talent qualification should not request resume');
report.push({ check: 'talent-qualification-no-resume', pass: true });

await page.goto(base + '/apply/global-innovator', { waitUntil: 'networkidle' });
assert.equal(await page.locator('input[type="file"]').count(), 0, 'Innovator qualification requests files too early');
report.push({ check: 'innovator-qualification-no-deck-upload', pass: true });

// Full applications should include stage-appropriate uploads.
await page.goto(base + '/apply/global-ai-software-talent/full-application', { waitUntil: 'networkidle' });
assert.ok(await page.locator('input[type="file"]').count() >= 1, 'Talent full application missing resume upload');
await page.goto(base + '/apply/global-innovator/full-application', { waitUntil: 'networkidle' });
assert.ok(await page.locator('input[type="file"]').count() >= 1, 'Innovator full application missing material upload');
report.push({ check: 'full-application-uploads', pass: true });

// Existing historical assets and telecasts remain available.
await page.goto(base + '/about', { waitUntil: 'networkidle' });
assert.ok(await page.locator('img[src="/history/homeslide6.png"]').count(), 'Historical primary image missing');
assert.ok(await page.getByText('Watch earlier StartupFair events.', { exact: false }).count(), 'Telecasts section missing');
assert.ok(await page.locator('a[href*="youtube.com/watch?v=fYOiJnL4Ars"]').count(), 'Telecast 1 missing');
assert.ok(await page.locator('a[href*="youtube.com/watch?v=OLXfRG4oYok"]').count(), 'Telecast 2 missing');
report.push({ check: 'history-and-telecasts-preserved', pass: true });

// Mobile navigation must work on Home and a new program page.
for (const path of ['/', '/challenges/global-ai-software-talent']) {
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await mobile.newPage();
  await p.goto(base + path, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Open navigation menu' }).click();
  const nav = p.locator('#mobile-navigation');
  await nav.waitFor();
  assert.ok(await nav.locator('a[href="/challenges"]').count());
  await nav.locator('a[href="/about"]').first().click();
  await p.waitForURL(base + '/about');
  await mobile.close();
}
report.push({ check: 'mobile-navigation', pass: true });

// Unknown routes should stay 404 / non-indexable.
const missing = await page.goto(base + '/for-innovators', { waitUntil: 'networkidle' });
assert.equal(missing?.status(), 404);
report.push({ check: 'unknown-route-404', pass: true });

// Search launch must remain disabled via rendered robots metadata.
await page.goto(base + '/', { waitUntil: 'networkidle' });
const robots = await page.locator('meta[name="robots"]').getAttribute('content');
assert.match(robots ?? '', /noindex/i);
report.push({ check: 'search-noindex', pass: true });

await context.close();
await browser.close();
console.log(JSON.stringify({ passed: report.length, report }, null, 2));
