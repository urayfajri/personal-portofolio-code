import { Content } from "@prismicio/client";
import type { StoryTimelineEntry } from "@/types/story-timeline";

export function mapExperienceEntries(
  slice: Content.ExperienceSlice,
): StoryTimelineEntry[] {
  return slice.primary.informations.map((item) => ({
    title: item.title,
    time_period: item.time_period,
    institution: item.institution,
    description: item.description,
    entry_type: item.entry_type === "education" ? "education" : "work",
    story_teaser: item.story_teaser,
  }));
}
