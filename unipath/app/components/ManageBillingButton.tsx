"use client";

import { useState } from "react";

export default function ManageBillingButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function openPortal() {
    setLoading(true); setError("");
    const response = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await response.json();
    if (response.ok && data?.url) window.location.assign(data.url);
    else { setError(data?.error || "Billing management could not be opened."); setLoading(false); }
  }
  return <div><button type="button" onClick={openPortal} disabled={loading} className="border border-white/18 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Opening billing…" : "Manage an existing subscription"}</button>{error ? <p className="mt-2 text-xs text-[#f0aa88]">{error}</p> : null}</div>;
}
