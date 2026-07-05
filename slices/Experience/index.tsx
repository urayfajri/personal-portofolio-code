import { JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import ExperienceTimeline from "./ExperienceTimeline";
import { mapExperienceEntries } from "@/utils/mapExperienceEntries";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const entries = mapExperienceEntries(slice);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="!py-8 md:!py-10 lg:!py-12"
    >
      <ExperienceTimeline entries={entries} />
    </Bounded>
  );
};

export default Experience;
