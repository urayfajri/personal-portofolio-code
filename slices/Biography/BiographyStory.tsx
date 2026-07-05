"use client";

import { useLayoutEffect, useRef } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import StoryChapter from "@/components/StoryChapter";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type BiographyStoryProps = {
  slice: Content.BiographySlice;
};

export default function BiographyStory({ slice }: BiographyStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { primary } = slice;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>(".bio-story-chapter");

      if (prefersReducedMotion) {
        gsap.set(chapters, { autoAlpha: 1, y: 0 });
        return;
      }

      chapters.forEach((chapter, index) => {
        gsap.fromTo(
          chapter,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: chapter,
              start: "top bottom-=80",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative grid gap-x-10 gap-y-8 md:grid-cols-[2fr,1fr]"
    >
      <div className="order-1 space-y-8 md:col-start-1 md:row-start-1">
        {isFilled.keyText(primary.story_eyebrow) ? (
          <p className="bio-story-chapter story-chapter-badge w-fit opacity-0">
            {primary.story_eyebrow}
          </p>
        ) : null}

        {isFilled.keyText(primary.heading) ? (
          <Heading
            size="xl"
            className="bio-story-chapter about-heading text-balance opacity-0"
          >
            {primary.heading}
          </Heading>
        ) : null}

        {isFilled.richText(primary.value_hook) ? (
          <StoryChapter chapter="01 — Value" className="bio-story-chapter opacity-0">
            <div className="about-body prose prose-xl prose-invert max-w-none text-slate-200">
              <PrismicRichText field={primary.value_hook} />
            </div>
          </StoryChapter>
        ) : null}

        {isFilled.richText(primary.mindset_body) ? (
          <StoryChapter
            chapter="02 — Mindset"
            title={
              isFilled.keyText(primary.mindset_heading)
                ? primary.mindset_heading
                : "How I Build"
            }
            className="bio-story-chapter opacity-0"
          >
            <div className="about-body prose prose-lg prose-invert max-w-none text-slate-300">
              <PrismicRichText field={primary.mindset_body} />
            </div>
          </StoryChapter>
        ) : null}

        {isFilled.richText(primary.personal_body) ? (
          <StoryChapter
            chapter="03 — Personal"
            title={
              isFilled.keyText(primary.personal_heading)
                ? primary.personal_heading
                : "Beyond the Code"
            }
            className="bio-story-chapter opacity-0"
          >
            <div className="about-body prose prose-lg prose-invert max-w-none text-slate-300">
              <PrismicRichText field={primary.personal_body} />
            </div>
          </StoryChapter>
        ) : null}

        {isFilled.richText(primary.description) ? (
          <StoryChapter className="bio-story-chapter opacity-0">
            <div className="about-body prose prose-lg prose-invert max-w-none text-slate-300">
              <PrismicRichText field={primary.description} />
            </div>
          </StoryChapter>
        ) : null}

        {isFilled.link(primary.button_link) &&
        isFilled.keyText(primary.button_text) ? (
          <div className="bio-story-chapter opacity-0">
            <Button
              linkField={primary.button_link}
              label={primary.button_text}
              className="rounded-full px-8 py-3"
            />
          </div>
        ) : null}
      </div>

      {isFilled.image(primary.avatar) ? (
        <Avatar
          image={primary.avatar}
          className="bio-story-chapter about-floating-avatar order-2 mx-auto max-w-sm opacity-0 md:col-start-2 md:row-start-1 md:self-start md:sticky md:top-24"
        />
      ) : null}
    </div>
  );
}
