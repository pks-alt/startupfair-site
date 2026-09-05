# StartupFair email routing — preview configuration

| Request | Responsible mailbox |
|---|---|
| General inquiries, media, support, privacy, legal, historical inquiries | hello@startupfair.org |
| Challenge applications, registrations of interest and challenge proposals | challenges@startupfair.org |
| Talent profiles and hiring/talent requests | talent@startupfair.org |
| Partnership and sponsorship inquiries | partners@startupfair.org |

`lib/email-routing.ts` is the shared recipient map. `EmailRoutingForm` attaches
that map to all 49 existing form screens and shows a direct email link at the
final review step, general contact form and Home inquiry popup. Contact pathway
cards show their departmental address. The Home dropdown routes according to
interest, including separate challenge-application and hiring-request options.
Unclassified investment/venture inquiries go to general inquiries; explicit
partnership/sponsorship inquiries go to partners.

## Delivery status: NOT CONNECTED
These remain click-through preview forms. Submitting does not send email or
save a profile/application. Existing submit handlers and prototype notices are
preserved. The recipient attributes are configuration, not an email transport.
The mailto links open the visitor's email application; the visitor must send.
Mailbox existence, aliases, domain configuration and receipt are not verified.

Before launch: confirm mailboxes/aliases and provider, connect a server-side
email service with credentials held outside Git, validate submissions and
consent, add abuse protection, retain required application data securely,
then test receipt at all four addresses. Resolve recipients from this
allowlist on the server, never a recipient supplied by a browser. Show success
only after the server accepts the submission; do not email full resumes or
private profile data without an approved storage and notification design.

Scope: preview-codespaces only. No CSS, images, dialog implementation,
main branch, recovered-baseline, or downloaded ZIP is changed by this work.
