"use client";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX, useEffect, useRef, useState } from "react";

import Bounded from "@/components/Bounded";
import TechMarqueeLane from "./TechMarqueeLane";
import { TechStaticGrid, type TechItem } from "./TechShowcase";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
  const marqueeAreaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const techItems = (slice.primary.tech ?? []) as TechItem[];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!marqueeAreaRef.current?.contains(event.target as Node)) {
        setActiveIndex(null);
        setHoveredIndex(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleSelect = (index: number) => {
    setActiveIndex((current) => (current === index ? current : index));
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="tech-showcase relative isolate overflow-hidden py-4 md:py-6"
      aria-label={
        isFilled.keyText(slice.primary.heading)
          ? slice.primary.heading
          : "Tech stack"
      }
    >
      {techItems.length > 0 ? (
        <>
          <ul className="sr-only">
            {techItems.map((item, index) => (
              <li key={`sr-${item.tech_name}-${index}`}>
                {isFilled.keyText(item.tech_name) ? item.tech_name : "Tech"}
                {isFilled.keyText(item.tech_badge)
                  ? ` — ${item.tech_badge}`
                  : ""}
              </li>
            ))}
          </ul>

          <div ref={marqueeAreaRef} className="relative">
            {prefersReducedMotion ? (
              <Bounded className="!py-0">
                <TechStaticGrid
                  items={techItems}
                  activeIndex={activeIndex}
                  hoveredIndex={hoveredIndex}
                  onSelect={handleSelect}
                  onHoverStart={setHoveredIndex}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              </Bounded>
            ) : (
              <div className="tech-marquee-shell relative">
                <TechMarqueeLane
                  items={techItems}
                  activeIndex={activeIndex}
                  hoveredIndex={hoveredIndex}
                  onSelect={handleSelect}
                  onHoverStart={setHoveredIndex}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              </div>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default TechList;
