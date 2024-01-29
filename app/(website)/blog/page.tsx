import { draftMode } from "next/headers";

import Posts from "@/components/blog/Posts";
import PostsPreview from "@/components/blog/PostsPreview";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import type { SanityPost } from "@/types/sanity/sanityPost";

export const metadata = {
  title: "Blog",
  description:
    "A collection of articles about my experience in web development and design.",
};

export default async function Page() {
  const initial = await loadQuery<SanityPost[]>(
    POSTS_QUERY,
    {},
    {
      perspective: draftMode().isEnabled ? "previewDrafts" : "published",
    },
  );

  return draftMode().isEnabled ? (
    <PostsPreview initial={initial} />
  ) : (
    <Posts posts={initial.data} />
  );
}
