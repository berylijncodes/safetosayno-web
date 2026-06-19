// lib/sanity.ts
import { createClient } from "next-sanity"
import { createImageUrlBuilder } from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-04-03",
  useCdn: process.env.NODE_ENV === "production",
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
