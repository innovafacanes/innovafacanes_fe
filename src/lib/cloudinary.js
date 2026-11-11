const UPLOAD_MARKER = "/image/upload/";

// next/image loader: Cloudinary resizes and picks the best format (webp/avif) itself.
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src.startsWith("https://res.cloudinary.com/") || !src.includes(UPLOAD_MARKER)) return src;
  const transformation = `f_auto,q_${quality || "auto"},w_${width}`;
  return src.replace(UPLOAD_MARKER, `${UPLOAD_MARKER}${transformation}/`);
}
