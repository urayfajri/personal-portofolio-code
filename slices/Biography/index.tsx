import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="about-shell relative isolate overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950/60 p-8 shadow-[0_10px_80px_rgba(15,23,42,0.45)] backdrop-blur-lg md:p-14">
        <span className="about-aurora about-aurora--one" aria-hidden />
        <span className="about-aurora about-aurora--two" aria-hidden />

        <div className="relative grid gap-x-10 gap-y-6 text-justify md:grid-cols-[2fr,1fr]">
          <Heading
            size="xl"
            className="about-heading about-animate-heading col-start-1 text-balance"
          >
            {slice.primary.heading}
          </Heading>
          <div className="about-body about-animate-body prose prose-xl prose-invert col-start-1 text-slate-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div className="col-start-1 flex flex-wrap items-center gap-4">
            <div className="group relative inline-flex">
              <span
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/50 via-rose-400/40 to-indigo-400/50 opacity-80 blur-2xl transition duration-700 group-hover:blur-3xl"
                aria-hidden
              />
              <Button
                linkField={slice.primary.button_link}
                label={slice.primary.button_text}
                className="about-animate-cta relative rounded-full border-white/20 bg-gradient-to-r px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(15,23,42,0.65)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              />
            </div>
          </div>
          <Avatar
            image={slice.primary.avatar}
            className="about-floating-avatar row-start-1 max-w-sm md:col-start-2 md:row-end-3"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Biography;
