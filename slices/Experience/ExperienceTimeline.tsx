"use client";

import { JSX, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StoryEntryDialog from "@/components/StoryEntryDialog";
import StoryTimeline from "@/components/StoryTimeline";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { StoryTimelineEntry } from "@/types/story-timeline";

gsap.registerPlugin(ScrollTrigger);

type ExperienceTimelineProps = {
  entries: StoryTimelineEntry[];
};

export default function ExperienceTimeline({
  entries,
}: ExperienceTimelineProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedEntry =
    selectedIndex !== null ? (entries[selectedIndex] ?? null) : null;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".story-timeline-row");

      if (prefersReducedMotion) {
        gsap.set(
          ".story-timeline-card--left, .story-timeline-card--right, .story-timeline-card--mobile, .story-timeline-axis-node",
          { autoAlpha: 1, x: 0, scale: 1 },
        );
        return;
      }

      rows.forEach((row) => {
        const leftCard = row.querySelector(".story-timeline-card--left");
        const rightCard = row.querySelector(".story-timeline-card--right");
        const mobileCard = row.querySelector(".story-timeline-card--mobile");
        const axisNode = row.querySelector(".story-timeline-axis-node");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top bottom-=100",
          },
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        if (axisNode) {
          tl.fromTo(axisNode, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1 }, 0);
        }

        if (leftCard) {
          tl.fromTo(
            leftCard,
            { autoAlpha: 0, x: -40 },
            { autoAlpha: 1, x: 0 },
            0.08,
          );
        }

        if (rightCard) {
          tl.fromTo(
            rightCard,
            { autoAlpha: 0, x: 40 },
            { autoAlpha: 1, x: 0 },
            0.08,
          );
        }

        if (mobileCard) {
          tl.fromTo(
            mobileCard,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0 },
            0,
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, entries.length]);

  return (
    <div ref={containerRef}>
      <StoryTimeline
        entries={entries}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
      <StoryEntryDialog
        entry={selectedEntry}
        entryIndex={selectedIndex}
        totalEntries={entries.length}
        onClose={() => setSelectedIndex(null)}
        onPrevious={() => {
          setSelectedIndex((current) =>
            current !== null && current > 0 ? current - 1 : current,
          );
        }}
        onNext={() => {
          setSelectedIndex((current) =>
            current !== null && current < entries.length - 1
              ? current + 1
              : current,
          );
        }}
      />
    </div>
  );
}
