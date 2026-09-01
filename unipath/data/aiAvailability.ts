// Free-preview release: deliberately cannot be enabled through an environment variable.
// Re-enable only after server-side entitlements, durable usage limits, and output
// validation are implemented and tested. Never trust localStorage premium flags.
export const AI_AVAILABLE: boolean = false;
export const AI_PAUSED_MESSAGE = "AI feedback and paid checkout remain paused until the final credit migration is installed.";
