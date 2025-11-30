"use client";

import { useLayoutEffect, useRef } from "react";
import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";

gsap.registerPlugin(ScrollTrigger);

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=120",
        },
      });

      timeline.fromTo(
        cardRef.current,
        { y: 60, autoAlpha: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          boxShadow: "0px 40px 120px rgba(15,23,42,0.45)",
        },
      );

      timeline.from(
        titleRef.current,
        { y: 24, autoAlpha: 0, duration: 0.9 },
        "-=0.5",
      );

      const tags = tagRefs.current.filter((tag): tag is HTMLSpanElement =>
        Boolean(tag),
      );

      if (tags.length) {
        timeline.from(
          tags,
          { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.6 },
          "-=0.4",
        );
      }

      if (dateRef.current) {
        timeline.from(
          dateRef.current,
          { x: -30, autoAlpha: 0, duration: 0.6 },
          "-=0.3",
        );
      }

      if (bodyRef.current) {
        const bodyChildren = Array.from(
          bodyRef.current.querySelectorAll(
            "p, h1, h2, h3, h4, h5, ul, ol, li, pre, blockquote, img",
          ),
        );
        if (bodyChildren.length) {
          timeline.from(
            bodyChildren,
            { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.5 },
            "-=0.2",
          );
        }
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  tagRefs.current = [];

  return (
    <Bounded as="article" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto h-72 w-3/4 rounded-full bg-gradient-to-r from-yellow-500/10 via-sky-500/10 to-transparent blur-3xl" />
      <div
        ref={cardRef}
        className="rounded-[2.5rem] border border-white/5 bg-slate-950/60 px-4 py-10 shadow-[0_10px_80px_rgba(15,23,42,0.45)] backdrop-blur-lg transition duration-500 md:px-8 md:py-20"
      >
        <span className="about-aurora about-aurora--one" aria-hidden />
        <span className="about-aurora about-aurora--two" aria-hidden />
        <div ref={titleRef}>
          <Heading as="h1">{page.data.title}</Heading>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-yellow-400">
          {page.tags.map((tag, index) => (
            <span
              key={index}
              ref={(el) => {
                tagRefs.current[index] = el;
              }}
              className="rounded-full border border-yellow-400/40 px-4 py-1 text-sm font-semibold tracking-widest uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <p
          ref={dateRef}
          className="mt-8 border-b border-slate-600 pb-6 text-lg font-medium text-slate-300"
        >
          {formattedDate}
        </p>
        <div
          ref={bodyRef}
          className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20"
        >
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
