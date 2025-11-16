"use client";

import { JSX, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setExpandedIndex((current) => (current === index ? null : index));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      <div className="mt-10 space-y-6">
        {slice.primary.informations.map((item, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <article
              key={index}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.75)] transition hover:border-white/30 hover:bg-white/10"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isExpanded}
                aria-controls={`experience-panel-${index}`}
              >
                <div>
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight text-slate-300">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
                      {item.time_period}
                    </span>
                    <span className="text-2xl font-extralight text-white/70">/</span>
                    <span className="text-base font-medium text-white/80">
                      {item.institution}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/40 via-white/10 to-transparent text-lg font-semibold text-slate-900 transition-all duration-500 ${
                    isExpanded ? "rotate-45 scale-95" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                id={`experience-panel-${index}`}
                className={`grid transition-all duration-500 ease-out ${
                  isExpanded
                    ? "mt-6 grid-rows-[1fr] opacity-100"
                    : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="prose prose-lg prose-invert max-w-none text-slate-100">
                    <PrismicRichText field={item.description} />
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_65%)] transition-opacity duration-500 ${
                  isExpanded ? "opacity-80" : "opacity-0"
                }`}
              />
            </article>
          );
        })}
      </div>
    </Bounded>
  );
};

export default Experience;
