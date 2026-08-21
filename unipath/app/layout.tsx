import type { Metadata } from "next";
import "./globals.css";
import { StudentProvider } from "./components/StudentProvider";
import MotionEffects from "./components/MotionEffects";

export const metadata: Metadata = { title: "UniPath", description: "Your university journey, organized." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><StudentProvider><MotionEffects />{children}</StudentProvider></body></html>;
}
