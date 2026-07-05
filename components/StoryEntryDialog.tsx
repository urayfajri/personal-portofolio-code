"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { MdClose } from "react-icons/md";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { StoryTimelineEntry } from "@/components/StoryTimeline";

type StoryEntryDialogProps = {
  entry: StoryTimelineEntry | null;
  entryIndex: number | null;
  totalEntries: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function StoryEntryDialog({
  entry,
  entryIndex,
  totalEntries,
  onClose,
  onPrevious,
  onNext,
}: StoryEntryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isOpen = entry !== null && entryIndex !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
      triggerRef.current?.focus();
      triggerRef.current = null;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  if (!entry || entryIndex === null) {
    return (
      <dialog
        ref={dialogRef}
        className="story-entry-dialog hidden"
        aria-hidden="true"
      />
    );
  }

  const isWork = entry.entry_type !== "education";
  const hasPrevious = entryIndex > 0;
  const hasNext = entryIndex < totalEntries - 1;
  const titleId = `story-entry-title-${entryIndex}`;

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={clsx(
        "story-entry-dialog fixed inset-0 z-[70] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-slate-950/80",
        !prefersReducedMotion && "story-entry-dialog--animated",
      )}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center p-4 md:p-8">
        <div className="story-entry-dialog__panel relative flex max-h-[min(92vh,44rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_20px_80px_rgba(15,23,42,0.65)] backdrop-blur-xl md:max-w-4xl">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8 md:py-6">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {entry.time_period ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                    {entry.time_period}
                  </span>
                ) : null}
                <span
                  className={clsx(
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]",
                    isWork
                      ? "bg-yellow-300/15 text-yellow-200"
                      : "story-timeline-badge--education bg-indigo-400/15 text-indigo-200",
                  )}
                >
                  {isWork ? "Work" : "Education"}
                </span>
              </div>
              {entry.title ? (
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-white md:text-3xl"
                >
                  {entry.title}
                </h2>
              ) : null}
              {entry.institution ? (
                <p className="text-base font-medium text-slate-300 md:text-lg">
                  {entry.institution}
                </p>
              ) : null}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close dialog"
              className="shrink-0 rounded-full p-2 text-2xl text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              onClick={handleClose}
            >
              <MdClose />
            </button>
          </div>

          <div className="story-entry-dialog__body story-prose min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-7">
            {entry.description ? (
              <div className="prose prose-lg prose-invert max-w-none text-base text-slate-200 md:prose-xl md:text-lg">
                <PrismicRichText field={entry.description as RichTextField} />
              </div>
            ) : (
              <p className="text-slate-400">No details available yet.</p>
            )}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-8 md:py-5">
            <button
              type="button"
              disabled={!hasPrevious}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={onPrevious}
            >
              Previous
            </button>
            <span className="text-xs font-medium tracking-wide text-slate-400">
              {entryIndex + 1} / {totalEntries}
            </span>
            <button
              type="button"
              disabled={!hasNext}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition-colors enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
