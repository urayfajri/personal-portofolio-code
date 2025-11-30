import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import { JSX } from "react";
import AnimatedIntro from "./AnimatedIntro";
/**
 * Props for `BlogPostIndex`.
 */
export type BlogPostIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "BlogPostIndex" Slices.
 */
const BlogPostIndex = async ({
  slice,
}: BlogPostIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const items = slice.primary.content_type === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AnimatedIntro
        heading={slice.primary.heading}
        description={slice.primary.description}
      />
      <ContentList
        items={items}
        contentType={slice.primary.content_type}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default BlogPostIndex;
