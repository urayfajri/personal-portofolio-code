import { JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import StoryChapter from "@/components/StoryChapter";

export type AboutClosingProps = SliceComponentProps<Content.AboutClosingSlice>;

const AboutClosing = ({ slice }: AboutClosingProps): JSX.Element => {
  const { primary } = slice;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="contact"
    >
      <div className="about-shell relative isolate overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-950/60 p-8 shadow-[0_10px_80px_rgba(15,23,42,0.45)] backdrop-blur-lg md:p-14">
        <span className="about-aurora about-aurora--one" aria-hidden />
        <span className="about-aurora about-aurora--two" aria-hidden />

        <StoryChapter
          title={
            isFilled.keyText(primary.closing_heading)
              ? primary.closing_heading
              : undefined
          }
        >
          {isFilled.richText(primary.closing_body) ? (
            <div className="about-body prose prose-lg prose-invert max-w-none text-slate-300">
              <PrismicRichText field={primary.closing_body} />
            </div>
          ) : null}
        </StoryChapter>
      </div>
    </Bounded>
  );
};

export default AboutClosing;
