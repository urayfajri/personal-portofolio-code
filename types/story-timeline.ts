import { KeyTextField, RichTextField } from "@prismicio/client";

export type StoryTimelineEntry = {
  title: KeyTextField;
  time_period: KeyTextField;
  institution: KeyTextField;
  description: RichTextField;
  entry_type?: "work" | "education";
  story_teaser?: KeyTextField;
};
