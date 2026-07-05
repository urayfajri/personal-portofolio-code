import { isFilled } from "@prismicio/client";
import type { PageDocumentDataSlicesSlice } from "@/prismicio-types";

export function getStoryChapterLabel(
  slice: PageDocumentDataSlicesSlice,
): string | null {
  switch (slice.slice_type) {
    case "tech_list":
    case "experience":
    case "about_closing": {
      const label = slice.primary.story_chapter_label;
      return isFilled.keyText(label) ? label : null;
    }
    default:
      return null;
  }
}
