import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { EMAIL_ROUTES, INQUIRY_OPTIONS, categoryForInterest, categoryForPath } from '../lib/email-routing.ts';

test('exact approved mailbox map', () => {
  assert.deepEqual(EMAIL_ROUTES, {
    general: 'hello@startupfair.org', challenges: 'challenges@startupfair.org',
    talent: 'talent@startupfair.org', partners: 'partners@startupfair.org',
  });
});
for (const [interest, expected] of [
  ['Launching a Challenge', 'challenges'], ['Applying to a Challenge', 'challenges'],
  ['Joining as Talent', 'talent'], ['Hiring or Requesting Talent', 'talent'],
  ['Partnership', 'partners'], ['Investment or Venture Opportunity', 'general'],
  ['General Inquiry', 'general'], ['', 'general'], ['anyone@example.com', 'general'],
]) {
  test(`Home interest: ${interest || '(empty)'}`, () => assert.equal(categoryForInterest(interest), expected));
}
for (const [path, expected] of [
  ['/apply/ai-clinician-matching/review', 'challenges'],
  ['/apply/enterprise-ai-agent/review', 'challenges'],
  ['/apply/publisher-campaign-intelligence/review', 'challenges'],
  ['/launch-challenge/talent', 'challenges'], ['/launch-challenge/review', 'challenges'],
  ['/talent-profile/contact', 'talent'], ['/talent-profile/review', 'talent'],
  ['/find-talent/review', 'talent'], ['/partner-inquiry/review', 'partners'],
  ['/partner-inquiry/sponsorship', 'partners'], ['/contact', 'general'],
  ['/privacy', 'general'], ['/contact?email=someone@example.com', 'general'],
  ['/unknown', 'general'],
]) {
  test(`Path: ${path}`, () => assert.equal(categoryForPath(path), expected));
}
test('all 49 existing form screens are assigned without leftover unclassified forms', () => {
  const source = readFileSync(new URL('../components/startupfair-page.tsx', import.meta.url), 'utf8');
  assert.equal((source.match(/<EmailRoutingForm /g) || []).length, 49);
  assert.equal((source.match(/<form\b/g) || []).length, 0);
  for (const [category, count] of [['general', 2], ['challenges', 27], ['talent', 13], ['partners', 7]]) {
    assert.equal((source.match(new RegExp(`<EmailRoutingForm category="${category}"`, 'g')) || []).length, count);
  }
  assert.match(source, /category="general" routeByInterest showEmailContact/);
  assert.match(source, /INQUIRY_OPTIONS\.map/);
  assert.equal((source.match(/<EmailRecipientNotice category=/g) || []).length, 5);
  assert.match(source, /information is not transmitted or stored/);
});
test('routing component remains explicit preview, not a hidden transport', () => {
  const source = readFileSync(new URL('../components/email-routing-form.tsx', import.meta.url), 'utf8');
  assert.match(source, /data-delivery-mode="preview-only"/);
  assert.match(source, /data-email-recipient=\{EMAIL_ROUTES\[recipientCategory\]\}/);
  assert.doesNotMatch(source, /\bfetch\s*\(|localStorage|sessionStorage/);
  assert.equal(INQUIRY_OPTIONS.length, 7);
});
