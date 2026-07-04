import Link from "next/link";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";

type HeroLinkButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function HeroLinkButton({
  href,
  label,
  variant = "primary",
  className,
}: HeroLinkButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 md:text-base",
        variant === "primary"
          ? "border-2 border-yellow-300/40 bg-yellow-300/90 text-slate-900 hover:bg-yellow-200"
          : "border-2 border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10",
        className,
      )}
    >
      {label}
      <MdArrowOutward className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
