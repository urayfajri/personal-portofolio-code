import { JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ExperienceTimeline from "./ExperienceTimeline";
import { mapExperienceEntries } from "@/utils/mapExperienceEntries";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const entries = mapExperienceEntries(slice);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.keyText(slice.primary.story_chapter_label) ? (
        <span className="story-chapter-badge mb-4 inline-block">
          {slice.primary.story_chapter_label}
        </span>
      ) : null}

      {isFilled.keyText(slice.primary.heading) ? (
        <Heading as="h2" size="lg" className="mb-8">
          {slice.primary.heading}
        </Heading>
      ) : null}

      <ExperienceTimeline entries={entries} />
    </Bounded>
  );
};

export default Experience;
