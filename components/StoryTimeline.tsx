"use client";

import clsx from "clsx";
import { isFilled } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import type { StoryTimelineEntry } from "@/types/story-timeline";

export type { StoryTimelineEntry };

type StoryTimelineProps = {
  entries: StoryTimelineEntry[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

type TimelineCardProps = {
  entry: StoryTimelineEntry;
  index: number;
  isSelected: boolean;
  isLatest: boolean;
  compact?: boolean;
  onSelect: (index: number) => void;
  className?: string;
};

function TimelineCard({
  entry,
  index,
  isSelected,
  isLatest,
  compact = false,
  onSelect,
  className,
}: TimelineCardProps) {
  const role = isFilled.keyText(entry.title)
    ? entry.title
    : isFilled.keyText(entry.story_teaser)
      ? entry.story_teaser
      : null;

  const summary = [entry.institution, role].filter(Boolean).join(" · ") || null;

  if (compact) {
    return (
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isSelected}
        aria-label={
          summary
            ? `Open details for ${summary}`
            : `Open details for entry ${index + 1}`
        }
        className={clsx(
          "story-timeline-card story-timeline-card--compact group flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,transform,box-shadow] duration-200 active:scale-[0.99] md:px-5 md:py-4",
          isSelected
            ? "story-timeline-node--selected border-yellow-300/40 bg-yellow-300/10 shadow-[0_8px_28px_rgba(15,23,42,0.4)]"
            : "border-white/10 bg-white/5 shadow-[0_8px_24px_rgba(15,23,42,0.28)] hover:border-white/20 hover:bg-white/10",
          className,
        )}
        onClick={() => onSelect(index)}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            {entry.time_period ? (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.14em] text-yellow-200/90 uppercase">
                {entry.time_period}
              </span>
            ) : null}
          </div>
          {summary ? (
            <p className="truncate text-sm font-semibold text-slate-100 md:text-base">
              {summary}
            </p>
          ) : null}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-400 transition-colors group-hover:text-yellow-200 md:text-sm">
          <span className="sr-only">Read more</span>
          <MdArrowOutward className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:text-lg" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      className={clsx(
        "story-timeline-card story-timeline-card--full group min-h-[10.5rem] w-full rounded-[1.75rem] border px-6 py-6 text-left transition-[border-color,background-color,transform,box-shadow] duration-200 active:scale-[0.99] md:min-h-[12rem] md:px-10 md:py-8",
        isSelected
          ? "story-timeline-node--selected border-yellow-300/40 bg-yellow-300/10 shadow-[0_12px_40px_rgba(15,23,42,0.45)]"
          : isLatest
            ? "story-timeline-card--latest border-yellow-300/30 bg-yellow-300/[0.08] shadow-[0_12px_40px_rgba(253,224,71,0.14)] hover:border-yellow-300/40 hover:bg-yellow-300/[0.12]"
            : "border-white/10 bg-white/5 shadow-[0_12px_40px_rgba(15,23,42,0.35)] hover:border-white/20 hover:bg-white/10",
        className,
      )}
      onClick={() => onSelect(index)}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {entry.time_period ? (
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold tracking-[0.16em] text-yellow-200/90 uppercase">
            {entry.time_period}
          </span>
        ) : null}
        {isLatest ? (
          <span className="rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-yellow-200 uppercase">
            Latest
          </span>
        ) : null}
      </div>

      {entry.institution ? (
        <p className="text-lg font-semibold text-slate-100 md:text-xl">
          {entry.institution}
        </p>
      ) : null}

      {role ? (
        <p className="mt-2 text-xl font-bold text-white md:text-2xl">{role}</p>
      ) : null}

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors group-hover:text-yellow-200">
        Read more
        <MdArrowOutward className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}

function TimelineAxis({
  index,
  isSelected,
  isLatest,
  compact = false,
  onSelect,
  connectorSide,
}: {
  index: number;
  isSelected: boolean;
  isLatest: boolean;
  compact?: boolean;
  onSelect: (index: number) => void;
  connectorSide: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "story-timeline-axis flex shrink-0 flex-col items-center",
        connectorSide === "left" && "story-timeline-axis--connect-left",
        connectorSide === "right" && "story-timeline-axis--connect-right",
      )}
    >
      <button
        type="button"
        aria-label={`Open details for entry ${index + 1}`}
        aria-haspopup="dialog"
        aria-expanded={isSelected}
        className={clsx(
          "story-timeline-axis-node relative z-10 inline-flex items-center justify-center rounded-full ring-4 ring-slate-950 transition-transform duration-200 hover:scale-110",
          compact ? "h-4 w-4" : "h-6 w-6",
          isSelected || isLatest
            ? "story-timeline-axis-node--latest bg-yellow-300"
            : "bg-slate-500 hover:bg-slate-300",
        )}
        onClick={() => onSelect(index)}
      >
        <span className="sr-only">View entry details</span>
      </button>
    </div>
  );
}

export default function StoryTimeline({
  entries,
  selectedIndex,
  onSelect,
}: StoryTimelineProps) {
  return (
    <ol className="story-timeline--alternating relative">
      {entries.map((entry, index) => {
        const isSelected = selectedIndex === index;
        const isLatest = index === 0;
        const compact = !isLatest;
        const cardOnRight = index % 2 === 0;

        return (
          <li
            key={`${entry.time_period}-${entry.institution}-${index}`}
            className={clsx(
              "story-timeline-row relative last:pb-0",
              compact ? "pb-5 md:pb-6" : "pb-10 md:pb-16",
              cardOnRight
                ? "story-timeline-row--card-right"
                : "story-timeline-row--card-left",
              isLatest && "story-timeline-row--latest",
              compact && "story-timeline-row--compact",
            )}
          >
            {/* Mobile: card + left spine */}
            <div className="story-timeline-mobile story-spine relative pl-6 md:hidden">
              <TimelineCard
                entry={entry}
                index={index}
                isSelected={isSelected}
                isLatest={isLatest}
                compact={compact}
                onSelect={onSelect}
                className="story-timeline-card--mobile"
              />
            </div>

            {/* Desktop: alternating left/right */}
            <div className="story-timeline-desktop hidden md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-10">
              {cardOnRight ? (
                <>
                  <div aria-hidden="true" />
                  <TimelineAxis
                    index={index}
                    isSelected={isSelected}
                    isLatest={isLatest}
                    compact={compact}
                    onSelect={onSelect}
                    connectorSide="right"
                  />
                  <TimelineCard
                    entry={entry}
                    index={index}
                    isSelected={isSelected}
                    isLatest={isLatest}
                    compact={compact}
                    onSelect={onSelect}
                    className="story-timeline-card--right md:w-full md:max-w-none md:justify-self-stretch"
                  />
                </>
              ) : (
                <>
                  <TimelineCard
                    entry={entry}
                    index={index}
                    isSelected={isSelected}
                    isLatest={isLatest}
                    compact={compact}
                    onSelect={onSelect}
                    className="story-timeline-card--left md:w-full md:max-w-none md:justify-self-stretch"
                  />
                  <TimelineAxis
                    index={index}
                    isSelected={isSelected}
                    isLatest={isLatest}
                    compact={compact}
                    onSelect={onSelect}
                    connectorSide="left"
                  />
                  <div aria-hidden="true" />
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
