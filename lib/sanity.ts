import { createClient, type SanityClient } from "@sanity/client";

/**
 * Sanity projekt Autoškoly IKARA. Project ID nie je tajné (je verejné),
 * preto je tu aj ako predvolená hodnota — web sa napojí na Sanity aj bez env.
 * Ak Sanity nevráti žiadne kurzy, appka spadne späť na data/courses.json.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "npcqujal";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      // false = vždy čerstvé dáta (web sa aj tak cachuje cez ISR), aby zmeny v CMS naskočili spoľahlivo
      useCdn: false,
    })
  : null;

/**
 * Zapisovací klient — potrebuje token (SANITY_API_TOKEN, rola Editor).
 * Používa sa na automatické navýšenie počtu prihlásených pri záväznej prihláške.
 */
const writeToken = process.env.SANITY_API_TOKEN;
export const sanityWriteClient: SanityClient | null =
  sanityConfigured && writeToken
    ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: false, token: writeToken })
    : null;
