// Strict integer-string check: rejects leading zeros, decimals, exponents, signs, whitespace.
const PAGE_PARAM_RE = /^[1-9]\d*$/;

// Parses a `[page]` route param into a page number, or null when it is not a canonical
// positive integer string (eg. "02", "2.0", "1e1" must all 404 rather than silently coerce).
export function parsePageParam(param) {
  if (typeof param !== "string" || !PAGE_PARAM_RE.test(param)) return null;
  return Number(param);
}
