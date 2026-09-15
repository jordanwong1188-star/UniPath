# Free-preview safety and verification

AI feedback and chat are intentionally unavailable in this release. Both POST
handlers return 503 / AI_DISABLED without importing a provider or reading a body.
GET /api/application-feedback returns enabled: false. Configured Gemini/OpenAI
keys cannot enable model usage. New subscription checkout is also paused.

Do not restore the previous paid handlers as-is. Before a paid launch, implement
server-verified entitlements, durable per-user usage accounting and rate limits,
request size limits, server-selected program rubrics, and validated provider
output. A localStorage plan flag is not an entitlement.

## Available without model calls

- Written practice, profile-specific limits, timers and self-review checklists.
- Browser-local draft saving and restoration. No account/cloud synchronization.
- Local interview recording, replay and download.
- Editable transcripts without recording or speech recognition.
- Optional browser captions, off by default. The browser may use its own remote
  speech service; the UI discloses this before opting in.

The recording simulator practices individual responses, not a locked, continuous
replica of Kira. Pausing, repeats and manual recording starts are practice aids.
No guarantee is made about unpublished prompts, internal weights or admission.

## Sources checked 2026-08-31

- Queen's written and video rubrics are separate. The UI paraphrases them as
  coaching dimensions, not an official weighted marking sheet:
  https://www.queensu.ca/admission/applying/supplementary-application-rubric
- McMaster confirms three video responses and one 10-minute written response.
  Its overview and FAQ conflict on preparation time (10 seconds versus 1 minute),
  so no fixed preparation timer is imposed. Students must check their invitation:
  https://www.eng.mcmaster.ca/supplementary-application/

## Offline verification

Run from unipath:

    node --test tests/free-preview.cjs
    node node_modules/typescript/bin/tsc --noEmit
    npm run build
    UNIPATH_TEST_BASE_URL=local node --test tests/free-preview.cjs

Tests cover all 86 profile records, key format settings, separate Queen's rubrics,
disabled API/checkout handlers, independent editor state, editable transcripts,
recording cleanup and stale recording callbacks. Media is mocked; no actual
camera, microphone, AI call or payment is used.

The optional local smoke test starts the built app, checks all 86 practice URLs
and an invalid URL, then stops its own server. It uses GET requests only.

Real-device camera/microphone permission and codec compatibility still need a
manual check on the browsers/devices your friends use.
