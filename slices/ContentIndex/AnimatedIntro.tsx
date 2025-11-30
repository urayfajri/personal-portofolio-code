"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isFilled, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

type AnimatedIntroProps = {
  heading: KeyTextField;
  description?: RichTextField;
};

export default function AnimatedIntro({
  heading,
  description,
}: AnimatedIntroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=120",
        },
      });

      timeline.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40, skewY: 6 },
        { autoAlpha: 1, y: 0, skewY: 0, duration: 1.1 }
      );

      if (descriptionRef.current) {
        timeline.fromTo(
          descriptionRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mb-10 md:mb-14">
      <div ref={headingRef}>
        <Heading size="xl">{heading}</Heading>
      </div>
      {isFilled.richText(description) && (
        <div
          ref={descriptionRef}
          className="prose prose-xl prose-invert mt-6 max-w-3xl text-slate-200 md:mt-8"
        >
          <PrismicRichText field={description} />
        </div>
      )}
    </div>
  );
}
