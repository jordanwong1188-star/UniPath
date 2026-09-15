"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const pageName = pathname === "/" ? "home" : pathname.split("/").filter(Boolean)[0] || "home";
    document.body.dataset.page = pageName;

    return () => {
      delete document.body.dataset.page;
    };
  }, [pathname]);

  return null;
}
