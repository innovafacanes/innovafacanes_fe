import { timingSafeEqual } from "crypto";

import { LOCALES } from "@/lib/config";
import { getProjectsPage } from "@/lib/content";
import { localizedPath } from "@/lib/urls";

const STATIC_PATHS = ["/", "/projectes", "/serveis", "/nosaltres", "/contacte"];

function isValidSecret(req) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = req.headers["x-revalidate-secret"];
  if (!secret || typeof provided !== "string") return false;

  const expected = Buffer.from(secret);
  const actual = Buffer.from(provided);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

// Called by a Strapi webhook (header x-revalidate-secret) after content changes.
// The site is small, so every page in every language is regenerated.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  if (!isValidSecret(req)) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  const paths = [];
  for (const locale of LOCALES) {
    const { pageCount } = await getProjectsPage(locale, 1);
    const pagePaths = Array.from({ length: Math.max(pageCount - 1, 0) }, (_, i) => `/projectes/pagina/${i + 2}`);
    for (const path of [...STATIC_PATHS, ...pagePaths]) paths.push(localizedPath(locale, path));
  }

  const results = await Promise.allSettled(paths.map((path) => res.revalidate(path)));
  const failed = paths.filter((_, i) => results[i].status === "rejected");
  return res.status(failed.length ? 500 : 200).json({ revalidated: paths.length - failed.length, failed });
}
