import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const base = 'http://127.0.0.1:5173';
const out = 'review-artifacts';
mkdirSync(out, { recursive: true });
const source = readFileSync('components/startupfair-page.tsx', 'utf8');
const routes = new Set(['/', ...Array.from(source.matchAll(/page === "([^"]+)"/g), m => '/' + m[1]).filter(p => p !== '/home'), '/challenges/ai-clinician-matching', '/challenges/enterprise-ai-agent', '/challenges/publisher-campaign-intelligence', '/privacy', '/terms', '/cookies', '/challenge-rules']);
const publicRoutes = ['/', '/challenges', '/for-talent', '/for-organizations', '/partners', '/about', '/contact'];
const report = { commit: process.env.GITHUB_SHA, checkedAt: new Date().toISOString(), routes: [], pages: [], popup: [], errors: [], notes: ['Tests use a separate GitHub Actions server from the checked-out source, not the user\'s private Codespace.', 'No form is submitted to a live service. HTTP checks alone do not verify business functionality.'] };
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    const page = await context.newPage();
    page.on('pageerror', e => report.errors.push({ url: page.url(), message: e.message }));
    for (const path of publicRoutes) {
      await page.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 });
      await page.locator('h1').first().waitFor();
      await page.evaluate(async () => { await Promise.all(Array.from(document.images, i => i.decode().catch(() => {}))); });
      const data = await page.evaluate(() => ({
        title: document.querySelector('h1')?.textContent,
        headingCount: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 2,
        documentWidth: document.documentElement.scrollWidth,
        images: Array.from(document.images, i => ({ src: i.getAttribute('src'), alt: i.alt, loaded: i.complete && i.naturalWidth > 0 })),
        sections: Array.from(document.querySelectorAll('main section'), e => ({ heading: e.querySelector('h1,h2,h3')?.textContent, classes: e.className, height: Math.round(e.getBoundingClientRect().height), padding: getComputedStyle(e).padding, background: getComputedStyle(e).backgroundColor })),
        links: Array.from(document.querySelectorAll('a[href]'), a => ({ text: a.textContent.trim(), href: a.getAttribute('href') })),
      }));
      report.pages.push({ path, width, ...data });
      for (const link of data.links) if (link.href?.startsWith('/') && !link.href.startsWith('//')) routes.add(link.href.split('#')[0].split('?')[0] || '/');
      const name = path === '/' ? 'home' : path.slice(1);
      await page.screenshot({ path: `${out}/${name}-${width}.png`, fullPage: true });
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Start a Conversation', exact: true }).click();
    const modal = page.getByRole('dialog');
    await modal.waitFor();
    const bounds = await modal.boundingBox();
    const viewport = page.viewportSize();
    const withinViewport = bounds && bounds.x >= -1 && bounds.y >= -1 && bounds.x + bounds.width <= viewport.width + 1 && bounds.y + bounds.height <= viewport.height + 1;
    const routing = [];
    for (const [interest, address] of [['Launching a Challenge', 'challenges'], ['Joining as Talent', 'talent'], ['Hiring or Requesting Talent', 'talent'], ['Partnership', 'partners'], ['General Inquiry', 'hello']]) {
      await modal.locator('select[name="interest"]').selectOption({ label: interest });
      const actual = await modal.locator('form').getAttribute('data-email-recipient');
      routing.push({ interest, expected: `${address}@startupfair.org`, actual, passed: actual === `${address}@startupfair.org` });
    }
    await page.screenshot({ path: `${out}/popup-${width}.png` });
    await page.keyboard.press('Escape');
    const closes = await modal.count() === 0;
    report.popup.push({ width, bounds, withinViewport, closes, routing });
    if (width === 390) {
      await page.getByRole('button', { name: 'Open navigation menu', exact: true }).click();
      await page.locator('#mobile-navigation').getByRole('link', { name: 'For Talent', exact: true }).click();
      await page.waitForURL('**/for-talent');
      report.notes.push('Mobile menu opens and its For Talent link navigates successfully.');
    }
    await context.close();
  }
  for (const path of [...routes].sort()) {
    try {
      const response = await fetch(base + path);
      const body = await response.text();
      report.routes.push({ path, status: response.status, rendered: body.includes('StartupFair'), notFound: /Page Not Found|Page not found|This page could not be found/.test(body) });
    } catch (e) { report.routes.push({ path, error: e.message }); }
  }
} finally {
  await browser.close();
  writeFileSync(`${out}/audit.json`, JSON.stringify(report, null, 2));
}
const failed = report.pages.filter(p => p.overflow || p.headingCount !== 1 || p.images.some(i => !i.loaded));
console.log(JSON.stringify({ pages: report.pages.length, routeChecks: report.routes.length, problemPages: failed.map(p => ({ path: p.path, width: p.width, overflow: p.overflow, images: p.images.filter(i => !i.loaded) })), popup: report.popup, jsErrors: report.errors }, null, 2));
if (existsSync('docs/SITE-REVIEW-IMPLEMENTED.md')) {
  if (failed.length || report.errors.length || report.popup.some(p => !p.withinViewport || !p.closes || p.routing.some(r => !r.passed)) || report.routes.some(r => r.error || r.status >= 400 || r.notFound)) process.exitCode = 1;
}
