import clsx from "clsx";
import type { CSSProperties } from "react";
import { getLoopCopiesClass, getLoopCopyCount } from "@/utils/techMarquee";
import { TechItem, TechMarqueePill } from "./TechShowcase";

type TechMarqueeLaneProps = {
  items: TechItem[];
  activeIndex: number | null;
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  className?: string;
};

export default function TechMarqueeLane({
  items,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHoverStart,
  onHoverEnd,
  className,
}: TechMarqueeLaneProps) {
  if (items.length === 0) return null;

  const isPaused = activeIndex !== null || hoveredIndex !== null;
  const hasFocus = isPaused;
  const loopCopies = getLoopCopyCount(items.length);
  const loopItems = Array.from({ length: loopCopies }, () => items).flat();

  return (
    <div
      className={clsx(
        "tech-marquee-row overflow-hidden py-5 md:py-6",
        isPaused && "tech-marquee-row--paused",
        className,
      )}
    >
      <div
        className={clsx(
          "tech-marquee-track tech-marquee-track--left flex w-max items-center gap-3 md:gap-4",
          getLoopCopiesClass(loopCopies),
        )}
      >
        {loopItems.map((item, globalIndex) => {
          const sourceIndex = globalIndex % items.length;
          const isInteractive = globalIndex < items.length;
          const isActive =
            isInteractive &&
            (activeIndex === sourceIndex || hoveredIndex === sourceIndex);
          const isDimmed =
            isInteractive &&
            hasFocus &&
            activeIndex !== sourceIndex &&
            hoveredIndex !== sourceIndex;

          return (
            <div
              key={`wave-${item.tech_name}-${globalIndex}`}
              className={clsx(
                "tech-marquee-wave-item shrink-0",
                isActive && "tech-marquee-wave-item--active",
              )}
              style={
                {
                  "--wave-index": globalIndex,
                } as CSSProperties
              }
            >
              <TechMarqueePill
                item={item}
                itemIndex={sourceIndex}
                isActive={isActive}
                isDimmed={isDimmed}
                decorative={!isInteractive}
                onSelect={isInteractive ? onSelect : undefined}
                onHoverStart={isInteractive ? onHoverStart : undefined}
                onHoverEnd={isInteractive ? onHoverEnd : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
