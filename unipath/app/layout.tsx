import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { StudentProvider } from "./components/StudentProvider";
import MotionEffects from "./components/MotionEffects";

const uiFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

const editorialFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UniPath — Canadian university admissions",
  description: "Research Canadian programs, transfer pathways, deadlines, scholarships, and supplemental applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${uiFont.variable} ${editorialFont.variable}`}><StudentProvider><MotionEffects />{children}</StudentProvider></body></html>;
}
