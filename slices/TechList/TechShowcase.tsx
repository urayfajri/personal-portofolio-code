import clsx from "clsx";
import type { ColorField, KeyTextField } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { getTechIcon } from "@/utils/techIcons";

export type TechItem = {
  tech_name: KeyTextField;
  tech_color: ColorField;
  tech_badge: KeyTextField;
};

type TechMarqueePillProps = {
  item: TechItem;
  itemIndex: number;
  isActive?: boolean;
  isDimmed?: boolean;
  decorative?: boolean;
  onSelect?: (index: number) => void;
  onHoverStart?: (index: number) => void;
  onHoverEnd?: () => void;
  className?: string;
};

export function TechMarqueePill({
  item,
  itemIndex,
  isActive = false,
  isDimmed = false,
  decorative = false,
  onSelect,
  onHoverStart,
  onHoverEnd,
  className,
}: TechMarqueePillProps) {
  const name = isFilled.keyText(item.tech_name) ? item.tech_name : "Tech";
  const badge = isFilled.keyText(item.tech_badge) ? item.tech_badge : null;
  const color = isFilled.color(item.tech_color) ? item.tech_color : null;
  const Icon = getTechIcon(name);
  const ariaLabel = badge ? `${name} — ${badge}` : name;

  const content = (
    <>
      <span
        className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-25"
        style={{ backgroundColor: color ?? "rgba(253, 224, 71, 0.35)" }}
        aria-hidden
      />

      <div className="relative flex min-w-0 flex-1 flex-col gap-2.5">
        {badge ? (
          <span className="tech-marquee-badge w-fit">{badge}</span>
        ) : null}

        <span className="flex items-center gap-3">
          {Icon ? (
            <Icon
              className="shrink-0 text-xl transition-transform duration-300 group-hover:scale-110 md:text-2xl"
              style={color ? { color } : undefined}
              aria-hidden
            />
          ) : (
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: color ?? "rgb(253 224 71)" }}
              aria-hidden
            />
          )}
          <span className="truncate text-sm font-bold uppercase tracking-[0.1em] text-slate-100 md:text-base">
            {name}
          </span>
        </span>
      </div>
    </>
  );

  if (decorative) {
    return (
      <span
        className={clsx(
          "tech-marquee-pill pointer-events-none inline-flex shrink-0 items-center rounded-2xl border border-white/10 bg-slate-950/55 px-5 py-4 shadow-[0_8px_28px_rgba(15,23,42,0.35)] backdrop-blur-sm",
          className,
        )}
        style={
          color
            ? {
                boxShadow: `inset 0 0 0 1px ${color}22, 0 8px 28px rgba(15,23,42,0.35)`,
              }
            : undefined
        }
        aria-hidden
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={clsx(
        "tech-marquee-pill group relative inline-flex shrink-0 items-center rounded-2xl border px-5 py-4 text-left shadow-[0_8px_28px_rgba(15,23,42,0.35)] backdrop-blur-sm transition-[border-color,background-color,box-shadow,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        isActive
          ? "tech-marquee-pill--active border-yellow-300/50 bg-yellow-300/10 shadow-[0_0_24px_rgba(253,224,71,0.18)]"
          : "border-white/10 bg-slate-950/55 hover:border-yellow-300/35 hover:bg-slate-950/70",
        isDimmed && "tech-marquee-pill--dimmed opacity-45 saturate-50",
        className,
      )}
      style={
        color && !isActive
          ? {
              boxShadow: `inset 0 0 0 1px ${color}22, 0 8px 28px rgba(15,23,42,0.35)`,
            }
          : undefined
      }
      onClick={() => onSelect?.(itemIndex)}
      onMouseEnter={() => onHoverStart?.(itemIndex)}
      onMouseLeave={() => onHoverEnd?.()}
      onFocus={() => onHoverStart?.(itemIndex)}
      onBlur={() => onHoverEnd?.()}
    >
      {content}
    </button>
  );
}

type TechStaticGridProps = {
  items: TechItem[];
  activeIndex: number | null;
  hoveredIndex: number | null;
  onSelect: (index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
};

export function TechStaticGrid({
  items,
  activeIndex,
  hoveredIndex,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: TechStaticGridProps) {
  const hasFocus = activeIndex !== null || hoveredIndex !== null;

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item, index) => {
        const isActive = activeIndex === index || hoveredIndex === index;
        const isDimmed =
          hasFocus && activeIndex !== index && hoveredIndex !== index;

        return (
          <li key={`static-${item.tech_name}-${index}`}>
            <TechMarqueePill
              item={item}
              itemIndex={index}
              isActive={isActive}
              isDimmed={isDimmed}
              onSelect={onSelect}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          </li>
        );
      })}
    </ul>
  );
}
