"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { Content } from "@prismicio/client";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

const MAX_PREVIEW_WIDTH = 320;
const MAX_PREVIEW_HEIGHT = 320;

const getPreviewDimensions = (width?: number, height?: number) => {
  const fallback = { width: 220, height: 320 };
  if (!width || !height) return fallback;

  const widthScale = MAX_PREVIEW_WIDTH / width;
  const heightScale = MAX_PREVIEW_HEIGHT / height;
  const scale = Math.min(widthScale, heightScale, 1);

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const highlightTween = useRef<gsap.core.Tween | null>(null);

  const revealRef = useRef<HTMLDivElement | null>(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const moveHighlight = useCallback((index: number) => {
    if (!highlightRef.current) return;
    const target = itemsRef.current[index];
    if (!target || !component.current) return;
    const offsetTop = target.offsetTop;
    highlightTween.current?.kill();
    highlightTween.current = gsap.to(highlightRef.current, {
      y: offsetTop,
      height: target.offsetHeight,
      opacity: 0.35,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const hideHighlight = useCallback(() => {
    if (!highlightRef.current) return;
    highlightTween.current?.kill();
    highlightTween.current = gsap.to(highlightRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const urlPrefix = contentType === "Blog" ? "/blog" : "/projects";

  useEffect(() => {
    // Animate list-items in with a stagger
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          },
        );
      });

      return () => ctx.revert(); // cleanup!
    }, component);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (currentItem === null || !revealRef.current) return;

      const mousePos = { x: e.clientX, y: e.clientY };
      const speed = Math.abs(mousePos.x - lastMousePos.current.x);
      const maxY = window.innerHeight - 350;
      const maxX = window.innerWidth - 250;

      gsap.to(revealRef.current, {
        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
        ease: "back.out(2)",
        duration: 1.2,
      });

      gsap.to(revealRef.current, {
        opacity: hovering ? 1 : 0,
        scale: hovering ? 1 : 0.9,
        visibility: "visible",
        ease: "power3.out",
        duration: 0.45,
      });

      lastMousePos.current = mousePos;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);
    moveHighlight(index);
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
    hideHighlight();
  };

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.data.date ?? "").getTime() -
          new Date(a.data.date ?? "").getTime(),
      ),
    [items],
  );

  const contentImages = useMemo(
    () =>
      sortedItems.map((item) => {
        const image = isFilled.image(item.data.hover_image)
          ? item.data.hover_image
          : fallbackItemImage;
        const url = asImageSrc(image) ?? "";
        const dimensions = getPreviewDimensions(
          image?.dimensions?.width,
          image?.dimensions?.height,
        );

        return {
          url,
          width: dimensions.width,
          height: dimensions.height,
        };
      }),
    [sortedItems, fallbackItemImage],
  );

  // Preload images
  useEffect(() => {
    contentImages.forEach(({ url }) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  const currentImage =
    currentItem !== null ? contentImages[currentItem] : null;

  const revealStyles =
    currentImage && currentImage.url
      ? {
          backgroundImage: `url(${currentImage.url})`,
          width: currentImage.width,
          height: currentImage.height,
        }
      : {};

  itemsRef.current = [];

  return (
    <>
      <div ref={component} className="relative" onMouseLeave={onMouseLeave}>
        <div
          ref={highlightRef}
          className="pointer-events-none absolute top-0 right-0 left-0 z-0 h-0 rounded-3xl bg-gradient-to-r from-yellow-500/20 via-slate-50/10 to-transparent opacity-0 blur-3xl"
        />
        <ul className="relative z-10 grid border-b border-b-slate-100">
          {sortedItems.map((item, index) => (
            <li
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              onMouseEnter={() => onMouseEnter(index)}
              className="list-item opacity-0"
            >
              <Link
                href={`${urlPrefix}/${item.uid}`}
                className="group relative flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 transition-all duration-300 ease-out hover:translate-x-2 md:flex-row"
                aria-label={item.data.title || ""}
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-yellow-300">
                    {item.data.title}
                  </span>
                  <div className="mt-3 flex flex-wrap gap-3 text-yellow-400">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full border border-yellow-400/40 px-3 py-1 text-sm font-bold tracking-wide uppercase transition-colors duration-300 group-hover:border-yellow-300/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="ml-auto flex items-center gap-2 text-xl font-medium text-slate-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-yellow-300 md:ml-0">
                  {viewMoreText} <MdArrowOutward />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="hover-reveal pointer-events-none fixed top-0 left-0 -z-10 rounded-lg bg-contain bg-center bg-no-repeat opacity-0 transition-all duration-300"
        style={revealStyles}
        ref={revealRef}
      ></div>
    </>
  );
}
