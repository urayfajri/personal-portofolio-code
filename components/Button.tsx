import { PrismicNextLink } from "@prismicio/next";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";
import { KeyTextField, LinkField } from "@prismicio/client";

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
  variant?: "light" | "dark";
  onClick?: () => void;
};

export default function Button({
  linkField,
  label,
  showIcon = true,
  className,
  variant = "light",
  onClick,
}: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkField}
      onClick={onClick}
      className={clsx(
        "group relative flex w-fit items-center justify-center overflow-hidden rounded-md px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        variant === "dark"
          ? "border-2 border-white/20 bg-white/5 text-white"
          : "border-2 border-slate-900 bg-slate-50 text-slate-900",
        className,
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
        )}
      />
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-slate-950">
        {label} {showIcon && <MdArrowOutward className="inline-block" />}
      </span>
    </PrismicNextLink>
  );
}
