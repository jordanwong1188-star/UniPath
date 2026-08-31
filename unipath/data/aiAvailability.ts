// Free-preview release: deliberately cannot be enabled through an environment variable.
// Re-enable only after server-side entitlements, durable usage limits, and output
// validation are implemented and tested. Never trust localStorage premium flags.
export const AI_AVAILABLE: boolean = false;
export const AI_PAUSED_MESSAGE = "AI feedback and chat are paused during free testing. Practice, recording, transcripts and self-review remain available. No AI request is sent.";
