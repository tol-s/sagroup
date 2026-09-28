/**
 * Builds an Unsplash CDN URL from a photo id.
 * next/image resizes it further, so only a sensible max width is requested here.
 * To use your own photo instead, pass a local path such as "/images/projects/villa-1.jpg".
 */
export function unsplash(id: string, width = 2400) {
  if (id.startsWith("/") || id.startsWith("http")) return id;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
