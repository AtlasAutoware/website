export const SITE_URL = "https://atlasautoware.org";

/** The public email address, used on every page and in the privacy policy. */
export const CONTACT_EMAIL = "contact@atlasautoware.org";

type MetaTag =
  { title: string } | { name: string; content: string } | { property: string; content: string };
type LinkTag = { rel: string; href: string };

/**
 * Per-route head tags: title, description, Open Graph and Twitter title/description,
 * og:url and the canonical link. Site-wide tags (og:image, og:site_name…) live in __root.
 */
export function pageHead({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): { meta: MetaTag[]; links: LinkTag[] } {
  const url = SITE_URL + path;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
