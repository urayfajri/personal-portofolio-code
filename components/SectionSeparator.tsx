import clsx from "clsx";

type SectionSeparatorProps = {
  label?: string;
  size?: "default" | "lg";
};

export default function SectionSeparator({
  label = "Dev Quote",
  size = "default",
}: SectionSeparatorProps) {
  const isLarge = size === "lg";

  return (
    <div
      className={clsx(
        "border-t border-white/10",
        isLarge ? "pt-6 md:pt-8" : "pt-5 md:pt-6",
      )}
      aria-hidden={label ? undefined : true}
    >
      <div className={clsx("flex items-center", isLarge ? "gap-5" : "gap-4")}>
        <span
          className={clsx(
            "h-px flex-1 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent",
            isLarge && "via-yellow-300/75",
          )}
        />
        {label ? (
          <span
            className={clsx(
              "shrink-0 rounded-full border font-bold uppercase text-yellow-100",
              isLarge
                ? "border-yellow-300/45 bg-yellow-300/15 px-6 py-2 text-sm tracking-[0.2em] shadow-[0_0_28px_rgba(253,224,71,0.16)] md:px-8 md:py-2.5 md:text-base"
                : "border-yellow-300/30 bg-yellow-300/10 px-4 py-1 text-xs font-semibold tracking-[0.25em] text-yellow-200",
            )}
          >
            {label}
          </span>
        ) : null}
        <span
          className={clsx(
            "h-px flex-1 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent",
            isLarge && "via-yellow-300/75",
          )}
        />
      </div>
    </div>
  );
}
