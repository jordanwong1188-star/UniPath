// Re-enable only after the billing migration and sandbox acceptance tests pass.
// This does not disable existing subscribers' AI access or billing management.
export const CHECKOUT_AVAILABLE: boolean =
  process.env.NEXT_PUBLIC_BILLING_SANDBOX === "true" &&
  process.env.NEXT_PUBLIC_APP_URL === "https://unipath-billing-test.netlify.app" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL === "https://zarawaytmqjvkrrushey.supabase.co";
export const CHECKOUT_PAUSED_MESSAGE = "New subscriptions are temporarily paused while we finish payment verification.";
