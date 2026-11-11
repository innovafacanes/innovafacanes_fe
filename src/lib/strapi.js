// Includes the /api suffix, e.g. https://strapi.innovafacanes.cat/api
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export const buildUrl = (path, params = {}, baseUrl = BASE_URL) => {
  const query = new URLSearchParams(params).toString();
  return `${baseUrl}${path}${query ? `?${query}` : ""}`;
};

export async function strapiGet(path, params = {}, { fetchImpl = fetch, baseUrl = BASE_URL } = {}) {
  if (!baseUrl) throw new Error("NEXT_PUBLIC_STRAPI_BASE_URL is not set");
  const url = buildUrl(path, params, baseUrl);
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Strapi ${response.status} for ${url}`);
  return response.json();
}
