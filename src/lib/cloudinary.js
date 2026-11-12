const UPLOAD_MARKER = "/image/upload/";
// Matches a plain upload URL's version segment, e.g. "v1776847631/". Any URL whose
// segment right after /image/upload/ isn't a version has already been transformed.
const VERSION_SEGMENT = /^v\d+\//;

// next/image loader: Cloudinary resizes and picks the best format (webp/avif) itself.
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src.startsWith("https://res.cloudinary.com/") || !src.includes(UPLOAD_MARKER)) return src;
  const afterMarker = src.slice(src.indexOf(UPLOAD_MARKER) + UPLOAD_MARKER.length);
  if (!VERSION_SEGMENT.test(afterMarker)) return src;
  const transformation = `f_auto,q_${quality || "auto"},w_${width}`;
  return src.replace(UPLOAD_MARKER, `${UPLOAD_MARKER}${transformation}/`);
}
