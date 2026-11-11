import { DEFAULT_LOCALE, SITE_URL } from "./config";

export const localizedPath = (locale, path) => {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const localizedUrl = (locale, path) => `${SITE_URL}${localizedPath(locale, path)}`;
