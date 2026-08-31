"use client";

import { AI_AVAILABLE } from "@/data/aiAvailability";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function SubscribeButton({ plan, label, featured = false }: { plan: "pro" | "max"; label: string; featured?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function beginCheckout() {
    if (!AI_AVAILABLE) return;
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
    <button type="button" onClick={beginCheckout} disabled={!AI_AVAILABLE || loading} className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold disabled:cursor-wait disabled:opacity-60 ${featured ? "bg-[#d4865f] text-[#132c29]" : "border border-white/18 text-white"}`}>
      {!AI_AVAILABLE ? "Paid plans coming later" : loading ? "Opening secure checkout…" : label}<ArrowRight className="h-4 w-4" />
    </button>
    {error ? <p role="alert" className="mt-2 text-xs leading-5 text-[#f0aa88]">{error}</p> : null}
  </div>;
}
