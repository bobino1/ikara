import { createClient, type SanityClient } from "@sanity/client";

/**
 * Sanity je zapojené iba ak je nastavené NEXT_PUBLIC_SANITY_PROJECT_ID
 * (viď .env.local). Ak nie je, appka beží na lokálnych dátach z data/courses.json.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
