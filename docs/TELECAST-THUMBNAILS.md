# Event telecast preview images

Scope: restore visible preview pictures for the two existing About > Event Telecasts cards. The previous cards contained no image before their iframe loaded; this was not a missing YouTube link.

Each card now renders a genuine thumbnail as an ordinary same-origin image before interaction. Verified thumbnail bytes are checked in under public/telecast-posters with provenance and checksums in docs/telecast-poster-provenance.json. These assets must be deployed along with the other public files. They do not depend on a live YouTube request or JavaScript to display. No videos are downloaded or modified.

The complete thumbnail/button area loads the existing iframe on click or keyboard activation. Playback is not automatic. The original Open on YouTube links remain visible, including t=7s for fYOiJnL4Ars and the matching start=7 embed parameter. No player or third-party image request occurs before activation. If an image is unavailable, the load control and direct link still work.

Existing page layout, Home headline, popup, LinkedIn configuration and all database/form behavior remain unchanged. The separately approved prize-photo display edits are integrated in the subsequent update documented in PHOTO-BRANDING-UPDATE.md; the two video posters and playback configuration are preserved.

Tests cover initial pictures and absence of iframes/YouTube requests, five desktop/mobile sizes, keyboard activation, preserved links, player containment, JavaScript-disabled previews, image failure and the Home popup. These are component/browser checks, not certification of YouTube stream playback or a Hostinger deployment.
