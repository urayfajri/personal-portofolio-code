import clsx from "clsx";
import type { ReactNode } from "react";

type StoryChapterProps = {
  chapter?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function StoryChapter({
  chapter,
  title,
  children,
  className,
  id,
}: StoryChapterProps) {
  return (
    <section
      id={id}
      className={clsx("story-spine relative pl-6 md:pl-8", className)}
    >
      {chapter ? (
        <span className="story-chapter-badge mb-3 inline-block">{chapter}</span>
      ) : null}
      {title ? (
        <h3 className="about-heading mb-4 text-balance text-2xl font-bold md:text-3xl">
          {title}
        </h3>
      ) : null}
      <div className="story-prose">{children}</div>
    </section>
  );
}
