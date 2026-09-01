// Free-preview release: deliberately cannot be enabled through an environment variable.
// Re-enable only after server-side entitlements, durable usage limits, and output
// validation are implemented and tested. Never trust localStorage premium flags.
export const AI_AVAILABLE: boolean = true;
export const AI_PAUSED_MESSAGE = "AI feedback requires an active Pro or Max subscription and sufficient credits.";
