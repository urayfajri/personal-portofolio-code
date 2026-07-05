import { JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import BiographyStory from "./BiographyStory";

export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      id="about"
    >
      <div className="about-shell relative isolate overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950/60 p-8 shadow-[0_10px_80px_rgba(15,23,42,0.45)] backdrop-blur-lg md:p-14">
        <span className="about-aurora about-aurora--one" aria-hidden />
        <span className="about-aurora about-aurora--two" aria-hidden />
        <BiographyStory slice={slice} />
      </div>
    </Bounded>
  );
};

export default Biography;
