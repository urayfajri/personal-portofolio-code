import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";

import ContentBody from "@/components/ContentBody";

type Params = Promise<{ uid: string }>;

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", (await params).uid)
    .catch(() => notFound());

  return <ContentBody page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", (await params).uid)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
