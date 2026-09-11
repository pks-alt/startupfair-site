import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const routesSource = readFileSync("lib/platform-routes.ts", "utf8");
const componentSource = readFileSync("components/startupfair-platform.tsx", "utf8");
const publicRoutesSource = readFileSync("lib/site-routes.ts", "utf8");
const platformSource = routesSource + "\n" + componentSource;

const platformPaths = [...routesSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
const publicPaths = [...publicRoutesSource.matchAll(/"(\/[^"\n]*)"/g)].map((m) => m[1]);

assert.ok(platformPaths.length >= 70, `Expected at least 70 platform routes, found ${platformPaths.length}`);
assert.equal(new Set(platformPaths).size, platformPaths.length, "Duplicate platform route detected");
assert.equal(publicPaths.length, 89, "Verified public-site route registry changed unexpectedly");

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
  status: "pass"
}, null, 2));
