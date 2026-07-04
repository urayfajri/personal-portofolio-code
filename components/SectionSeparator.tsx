type SectionSeparatorProps = {
  label?: string;
};

export default function SectionSeparator({
  label = "Dev Quote",
}: SectionSeparatorProps) {
  return (
    <div
      className="border-t border-white/10 pt-8 md:pt-10"
      aria-hidden={label ? undefined : true}
    >
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />
        {label ? (
          <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-200">
            {label}
          </span>
        ) : null}
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />
      </div>
    </div>
  );
}
