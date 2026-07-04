"use client";

import { FC, useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import HeroLinkButton from "@/components/HeroLinkButton";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { Shapes } from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const jobTitleClassName =
  "job-title block bg-gradient-to-tr from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-center text-2xl font-bold uppercase tracking-[0.2rem] text-transparent opacity-0 sm:text-xl md:text-left md:text-3xl";

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-greeting",
        {
          opacity: 0,
          y: 24,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
      );

      tl.fromTo(
        ".name-animation",
        {
          opacity: 0,
          x: -100,
          rotate: -10,
        },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
        "-=0.4",
      );

      tl.fromTo(
        ".job-title",
        {
          opacity: 0,
          y: 20,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.5",
      );

      tl.fromTo(
        ".hero-summary",
        {
          opacity: 0,
          y: 20,
          filter: "blur(6px)",
          clipPath: "inset(100% 0 0 0)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.2",
      );

      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="relative grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        <HeroAtmosphere />
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <div className="mb-4 flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-5">
            <p className="hero-greeting text-center text-lg font-medium text-slate-300 opacity-0 will-change-[transform,filter] md:text-left md:text-xl">
              <span aria-hidden="true">Hi! 👋 </span>I&apos;m
            </p>
          </div>
          <h1
            className="mb-8 text-center text-[clamp(2rem,12vmin,16rem)] leading-none font-extrabold tracking-tighter max-sm:text-[clamp(2rem,8vmin,16rem)] md:text-left"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block tracking-wider text-white">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2rem] block text-slate-100">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className={jobTitleClassName}>{slice.primary.tag_line}</span>
          <p className="hero-summary mx-auto mt-6 max-w-xl text-center text-base text-slate-300 opacity-0 will-change-[transform,filter,clip-path] md:mx-0 md:text-left md:text-lg">
            Building clean, scalable, and high-performance interfaces
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <HeroLinkButton
              href="/#projects"
              label="View My Work"
              variant="primary"
              className="hero-cta opacity-0"
            />
            <HeroLinkButton
              href="/#contact"
              label="Get in Touch"
              variant="secondary"
              className="hero-cta opacity-0"
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
