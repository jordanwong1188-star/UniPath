import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import { currentUser, subscriptionFor } from "@/lib/supabase-server";

type SearchParams = Promise<{ session_id?: string }>;

async function retrieveSession(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId.startsWith("cs_")) return null;
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
}

export default async function CheckoutSuccess({ searchParams }: { searchParams: SearchParams }) {
  const { session_id: sessionId } = await searchParams;
  const account = await currentUser();
  const candidate = account && sessionId ? await retrieveSession(sessionId).catch(() => null) : null;
  const session = candidate?.client_reference_id === account?.user.id ? candidate : null;
  const confirmed = session?.status === "complete" && (session?.payment_status === "paid" || session?.payment_status === "no_payment_required");
  const membership = confirmed && account ? await subscriptionFor(account.accessToken, account.user.id) : null;
  const ready = membership?.status === "active" && membership.credits_remaining > 0;
  const plan = session?.metadata?.plan === "max" ? "Max" : "Pro";

  return <main className="min-h-screen bg-[#132c29] text-[#f2ede2]">
    <SiteHeader dark />
    <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#e0a17f]">Membership</p>
      <h1 className="mt-5 text-5xl leading-tight">{confirmed ? ready ? `Your ${plan} membership is ready.` : "Payment received. Your credits are being confirmed." : "We could not confirm this checkout."}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">{confirmed ? ready ? "Your account has been updated. Open your dashboard to see your current credit balance." : "Stripe has recorded the checkout, but account processing is not yet confirmed. Refresh your dashboard shortly. If credits do not appear, contact unipath.guidance@gmail.com; do not purchase again." : "Sign in to the account used at checkout and check your dashboard. If you were charged but credits are missing, contact support before trying another purchase."}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        {confirmed ? <Link href="/dashboard" className="bg-[#d4865f] px-5 py-3 text-sm font-semibold text-[#132c29]">Continue to your workspace</Link> : null}
        <Link href="/pricing" className="border border-white/20 px-5 py-3 text-sm font-semibold text-white">Return to plans</Link>
      </div>
    </section>
  </main>;
}
