"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const ATMOSPHERE_ITEMS = [
  { type: "orb" as const, color: "rgba(129, 140, 248, 0.35)", top: "10%", left: "8%", size: 120 },
  { type: "orb" as const, color: "rgba(251, 191, 36, 0.2)", top: "70%", left: "75%", size: 90 },
  { type: "orb" as const, color: "rgba(148, 163, 184, 0.15)", top: "40%", left: "55%", size: 60 },
  { type: "arc" as const, top: "18%", left: "82%", size: 48 },
  { type: "arc" as const, top: "62%", left: "12%", size: 56 },
  { type: "tick" as const, top: "28%", left: "35%", width: 32 },
  { type: "tick" as const, top: "52%", left: "68%", width: 24 },
  { type: "tick" as const, top: "82%", left: "45%", width: 40 },
];

function AtmosphereShape({
  type,
  color,
  size,
  width,
}: {
  type: "orb" | "arc" | "tick";
  color?: string;
  size?: number;
  width?: number;
}) {
  if (type === "orb") {
    return (
      <div
        className="rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
    );
  }

  if (type === "arc") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="opacity-40"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
          strokeDasharray="40 85"
        />
      </svg>
    );
  }

  return (
    <div
      className="h-px bg-white/15"
      style={{ width }}
      aria-hidden="true"
    />
  );
}

export function HeroAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".atmosphere-item");
      if (!items) return;

      items.forEach((item) => {
        gsap.to(item, {
          y: gsap.utils.random(-10, 10),
          x: gsap.utils.random(-8, 8),
          rotation: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(8, 14),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 3),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {ATMOSPHERE_ITEMS.map((item, index) => (
        <div
          key={index}
          className="atmosphere-item absolute"
          style={{
            top: item.top,
            left: item.left,
          }}
        >
          <AtmosphereShape
            type={item.type}
            color={"color" in item ? item.color : undefined}
            size={"size" in item ? item.size : undefined}
            width={"width" in item ? item.width : undefined}
          />
        </div>
      ))}
    </div>
  );
}
