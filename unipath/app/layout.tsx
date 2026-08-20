import type { Metadata } from "next";
import "./globals.css";
import { StudentProvider } from "./components/StudentProvider";

export const metadata: Metadata = { title: "UniPath", description: "Your university journey, organized." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><StudentProvider>{children}</StudentProvider></body></html>;
}
