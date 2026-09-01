"use client";

import { CHECKOUT_AVAILABLE, CHECKOUT_PAUSED_MESSAGE } from "@/data/billingAvailability";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function SubscribeButton({ plan, label, featured = false }: { plan: "pro" | "max"; label: string; featured?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function beginCheckout() {
    if (!CHECKOUT_AVAILABLE) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();
      if (!response.ok || !data?.url) throw new Error(data?.error || "Checkout could not be opened.");
      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout could not be opened.");
      setLoading(false);
    }
  }

  return <div className="mt-8">
    <button type="button" onClick={beginCheckout} disabled={!CHECKOUT_AVAILABLE || loading} className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${featured ? "bg-[#d4865f] text-[#132c29]" : "border border-white/18 text-white"}`}>
      {!CHECKOUT_AVAILABLE ? "Subscriptions temporarily paused" : loading ? "Opening secure checkout…" : label}<ArrowRight className="h-4 w-4" />
    </button>
    {!CHECKOUT_AVAILABLE ? <p className="mt-2 text-xs leading-5 text-white/60">{CHECKOUT_PAUSED_MESSAGE}</p> : null}
    {error ? <p role="alert" className="mt-2 text-xs leading-5 text-[#f0aa88]">{error}</p> : null}
  </div>;
}
