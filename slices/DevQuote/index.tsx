import { JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { getDevQuote } from "@/utils/getDevQuote";
import DevQuoteContent from "./DevQuoteContent";

/**
 * Add this slice in Prismic Homepage after Hero:
 * Homepage → Slice Zone → Dev Quote → Publish
 */
export type DevQuoteProps = SliceComponentProps<Content.DevQuoteSlice>;

const DevQuote = async ({ slice }: DevQuoteProps): Promise<JSX.Element> => {
  const quote = await getDevQuote();
  const sectionLabel = isFilled.keyText(slice.primary.section_label)
    ? slice.primary.section_label
    : "Dev Quote";

  return (
    <DevQuoteContent
      quote={quote}
      sectionLabel={sectionLabel}
      sliceType={slice.slice_type}
      sliceVariation={slice.variation}
    />
  );
};

export default DevQuote;
