import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Link from "next/link";

import { CustomPortableText } from "@/components/shared/CustomPortableText";
import { Header } from "@/components/shared/Header";
import ImageBox from "@/components/shared/ImageBox";
import type { PostPayload } from "@/types";
import { parseOutline } from "@/lib/helpers";
import TableOfContents from "@/app/(personal)/blog/[slug]/components/TableOfContents";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";
import GoBackButton from "@/components/GoBackButton";
import { toPlainText } from "next-sanity";
import { useReadingTime } from "@/hooks/useReadingTime";
import Image from "next/image";

export interface PostPageProps {
  data: PostPayload | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function PostPage({ data, encodeDataAttribute }: PostPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  console.log(data);
  const {
    coverImage = {},
    headings,
    body = [],
    overview,
    publishedAt = "",
    // site,
    tags,
    title,
  } = data ?? {};

  const outline = parseOutline(headings ?? []);

  const publishedDate = new Date(publishedAt);

  const postText = toPlainText(body);
  const { minutesToRead } = useReadingTime(postText);

  const { height, src, width } = useNextSanityImage(client, coverImage, {
    imageBuilder: (image) => image.fit("max").width(1920).height(1080),
  });

  return (
    <article className="container my-8 space-y-8">
      <GoBackButton className="xl:sticky xl:top-[6.5rem]" />
      <div className="flex flex-col justify-center gap-4 sm:items-center sm:text-center">
        {tags && tags.length > 0 && (
          <div className="flex gap-2">
            {tags?.map((tag, index) => (
              <div key={index} className="badge badge-orange">
                {tag}
              </div>
            ))}
          </div>
        )}

        {title && (
          <h1 className="max-w-3xl  text-3xl font-bold lg:text-5xl">{title}</h1>
        )}
        {overview && (
          <div className="prose prose-lg mx-auto dark:prose-invert">
            <CustomPortableText value={overview} />
          </div>
        )}
        <div className="flex gap-2 text-sm text-neutral-400">
          <time itemProp="datePublished" dateTime={publishedDate.toISOString()}>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(publishedDate)}
          </time>
          <span>|</span>
          <p>{minutesToRead}m read</p>
        </div>
      </div>
      {coverImage && (
        <Image
          className="relative z-10 aspect-video w-full rounded-lg object-cover"
          src={src}
          width={width}
          height={height}
          alt={coverImage.alt ?? "Post image"}
          priority
          sizes="
          (max-width: 768px) 95vw,
          (max-width: 1200px) 80vw,
          1304px"
          placeholder={coverImage?.lqip ? "blur" : "empty"}
          blurDataURL={coverImage?.lqip}
        />
      )}

      {body && body.length > 0 && (
        <div className="flex gap-2 max-xl:flex-col">
          <section className="prose text-pretty dark:prose-invert sm:prose-lg xl:mx-auto">
            <CustomPortableText value={body} />
          </section>
          {outline && outline.length > 0 && (
            <nav className="sticky h-full space-y-2 text-pretty rounded-xl border-2 border-border bg-neutral-950 p-4 px-6 lg:p-6 lg:px-8 xl:top-36 xl:w-[300px]">
              <header className="flex items-center gap-2">
                {/* <ListOlAlt className="w-5" /> */}

                <h2 className="text-xl font-bold">Table of Contents</h2>
              </header>
              <TableOfContents outline={outline} />
            </nav>
          )}
        </div>
      )}
    </article>
  );
}

export default PostPage;
