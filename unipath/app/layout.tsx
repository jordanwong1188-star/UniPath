import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { StudentProvider } from "./components/StudentProvider";
import MotionEffects from "./components/MotionEffects";
import AdmissionsDisclaimer from "./components/AdmissionsDisclaimer";

const uiFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
  display: "swap",
});

const editorialFont = Newsreader({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  robots: process.env.NEXT_PUBLIC_BILLING_SANDBOX === "true" ? { index: false, follow: false } : undefined,
  title: "UniPath — Canadian university admissions",
  description: "Research Canadian programs, transfer pathways, deadlines, scholarships, and supplemental applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${uiFont.variable} ${editorialFont.variable}`}><StudentProvider>{process.env.NEXT_PUBLIC_BILLING_SANDBOX === "true" && <div role="status" className="bg-amber-100 px-4 py-3 text-center text-sm font-semibold text-black">UniPath billing sandbox — test accounts and Stripe test cards only. No real purchases.</div>}<MotionEffects /><AdmissionsDisclaimer />{children}</StudentProvider></body></html>;
}
