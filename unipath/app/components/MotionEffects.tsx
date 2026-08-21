"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const pageName = pathname === "/" ? "home" : pathname.split("/").filter(Boolean)[0] || "home";
    document.body.dataset.page = pageName;

    if (pathname === "/") return () => { delete document.body.dataset.page; };

    const selector = "main section, main article, main aside, main footer";
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    elements.forEach((element, index) => {
      element.classList.add("unipath-reveal");
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("unipath-visible");
          observer.unobserve(target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      delete document.body.dataset.page;
    };
  }, [pathname]);

  return null;
}
