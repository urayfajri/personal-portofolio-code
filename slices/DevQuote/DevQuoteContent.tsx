"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import SectionSeparator from "@/components/SectionSeparator";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { DevQuote } from "@/utils/getDevQuote";

gsap.registerPlugin(ScrollTrigger);

type DevQuoteContentProps = {
  quote: DevQuote;
  sectionLabel: string;
  sliceType: string;
  sliceVariation: string;
};

export default function DevQuoteContent({
  quote,
  sectionLabel,
  sliceType,
  sliceVariation,
}: DevQuoteContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = {
        separator: ".dev-quote-separator",
        shell: ".dev-quote-shell",
        mark: ".dev-quote-mark",
        text: ".dev-quote-text",
        author: ".dev-quote-author",
      };

      if (prefersReducedMotion) {
        gsap.set(
          [
            targets.separator,
            targets.shell,
            targets.mark,
            targets.text,
            targets.author,
          ],
          { autoAlpha: 1, y: 0, scale: 1 },
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
        },
      });

      tl.fromTo(
        targets.separator,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        targets.shell,
        { autoAlpha: 0, y: 36, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
        "-=0.3",
      );

      tl.fromTo(
        targets.mark,
        { autoAlpha: 0, scale: 0.6, y: 12 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.5",
      );

      tl.fromTo(
        targets.text,
        { autoAlpha: 0, y: 20, filter: "blur(6px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
        "-=0.35",
      );

      tl.fromTo(
        targets.author,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.6 },
        "-=0.45",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <Bounded
      data-slice-type={sliceType}
      data-slice-variation={sliceVariation}
      className="relative !py-0 md:!py-0 lg:!py-0"
      ref={containerRef}
    >
      <div className="dev-quote-separator opacity-0">
        <SectionSeparator label={sectionLabel} />
      </div>
      <div className="dev-quote-shell quote-shell relative isolate mx-auto mt-6 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 opacity-0 shadow-[0_10px_60px_rgba(15,23,42,0.5)] backdrop-blur-lg will-change-[transform,opacity] md:mt-8 md:p-12">
        <span
          className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-yellow-300/15 blur-3xl"
          aria-hidden="true"
        />
        <figure className="relative pb-2 text-center">
          <span
            className="dev-quote-mark mb-4 block text-5xl leading-none text-yellow-300/40 opacity-0 md:text-6xl"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote
            cite="https://api.quotable.io"
            className="dev-quote-text text-xl leading-relaxed text-white italic opacity-0 will-change-[transform,filter,opacity] md:text-2xl"
          >
            {quote.content}
          </blockquote>
          <figcaption className="dev-quote-author mt-6 text-sm font-medium tracking-wide text-yellow-200/90 opacity-0 md:text-base">
            &mdash; {quote.author}
          </figcaption>
        </figure>
      </div>
      <div className="pb-8 md:pb-10" />
    </Bounded>
  );
}
