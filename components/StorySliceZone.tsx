"use client";

import { Fragment } from "react";
import type { PageDocumentDataSlicesSlice } from "@/prismicio-types";
import Bounded from "@/components/Bounded";
import SectionSeparator from "@/components/SectionSeparator";
import { components } from "@/slices";
import { getStoryChapterLabel } from "@/utils/getStoryChapterLabel";

type StorySliceZoneProps = {
  slices: PageDocumentDataSlicesSlice[];
};

export default function StorySliceZone({ slices }: StorySliceZoneProps) {
  return (
    <>
      {slices.map((slice, index) => {
        const sliceType = slice.slice_type as keyof typeof components;
        const SliceComponent = components[sliceType];

        if (!SliceComponent) {
          return null;
        }

        const label = getStoryChapterLabel(slice);

        return (
          <Fragment key={`${slice.slice_type}-${index}`}>
            {index > 0 && label ? (
              <Bounded className="!py-0 md:!py-0 lg:!py-0">
                <SectionSeparator label={label} size="lg" />
              </Bounded>
            ) : null}
            <SliceComponent
              // slice_type key selects the matching component at runtime
              slice={slice as never}
              index={index}
              slices={slices}
              context={{}}
            />
          </Fragment>
        );
      })}
    </>
  );
}
