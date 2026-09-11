import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const routesSource = readFileSync("lib/platform-routes.ts", "utf8");
const componentSource = readFileSync("components/startupfair-platform.tsx", "utf8");
const publicRoutesSource = readFileSync("lib/site-routes.ts", "utf8");
const finalHomeSource = readFileSync("components/startupfair-page.tsx", "utf8");
const rootPageSource = readFileSync("app/page.tsx", "utf8");
const platformSource = routesSource + "\n" + componentSource;

const platformPaths = [...routesSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
const publicPaths = [...publicRoutesSource.matchAll(/"(\/[^"\n]*)"/g)].map((m) => m[1]);

assert.ok(platformPaths.length >= 70, `Expected at least 70 platform routes, found ${platformPaths.length}`);
assert.equal(new Set(platformPaths).size, platformPaths.length, "Duplicate platform route detected");
assert.equal(publicPaths.length, 89, "Public-site route registry should contain the preserved site plus approved new global-program routes");

// Lock the owner's previously finalized public homepage. New event/platform work must not replace it.
for (const phrase of [
  "A Real Problem. A Meaningful Opportunity.",
  "Where Technology Can Create Practical Impact",
  "AI Clinician Matching Challenge",
  "Let’s build something meaningful.",
  "/startupfair-hero-global-ai.png",
]) assert.ok(finalHomeSource.includes(phrase), `Final public homepage baseline changed or is missing: ${phrase}`);
assert.ok(rootPageSource.includes('StartupFairPage page="home"'), "Root page must continue rendering the previously finalized public homepage");
assert.ok(!rootPageSource.includes("StartupFairApprovedHome"), "Do not replace the finalized homepage with the later global-program homepage variant");

for (const expected of [
  "/app/home",
  "/app/innovator/home",
  "/app/organization/home",
  "/app/partner/home",
  "/app/mentor/home",
  "/app/judge/home",
  "/admin",
  "/admin/security",
  "/admin/ai",
  "/app/workspaces/current",
  "/app/workspaces/current/validation",
  "/app/submissions/current",
]) assert.ok(platformPaths.includes(expected), `Missing ${expected}`);

for (const phrase of [
  "StartupFair Build Studio",
  "Use Your Own AI Tool",
  "git@github.com:startupfair/team-phoenix.git",
  "AI Team Matching",
  "Exact Git commit freeze",
  "Private Enterprise",
  "Invite-Only",
  "StartupFair-managed repository",
  "Conflict Declaration",
  "Submit & Lock Score",
  "Security & Audit",
]) assert.ok(platformSource.includes(phrase), `Missing platform UX phrase: ${phrase}`);

console.log(JSON.stringify({
  publicRoutes: publicPaths.length,
  platformRoutes: platformPaths.length,
  preservedFinalHomepage: true,
  status: "pass"
}, null, 2));
