import { HOME_PROJECTS_COUNT, PROJECTS_PAGE_SIZE } from "./config";
import {
  normalizeContact,
  normalizeHome,
  normalizeNosaltres,
  normalizeProject,
  normalizeProjectsPage,
  normalizeServeis,
} from "./normalize";
import { strapiGet } from "./strapi";

// Newest first; id breaks ties so pagination is stable for projects with the same date.
const projectsQuery = (locale, page, pageSize) => ({
  locale,
  "sort[0]": "Date:desc",
  "sort[1]": "id:desc",
  populate: "Images",
  "pagination[page]": page,
  "pagination[pageSize]": pageSize,
});

export async function getHome(locale) {
  const [home, projects] = await Promise.all([
    strapiGet("/home", { locale, populate: "*" }),
    strapiGet("/projects", projectsQuery(locale, 1, HOME_PROJECTS_COUNT)),
  ]);
  return { ...normalizeHome(home), projects: normalizeProjectsPage(projects).projects };
}

export async function getProjectsPage(locale, page) {
  return normalizeProjectsPage(await strapiGet("/projects", projectsQuery(locale, page, PROJECTS_PAGE_SIZE)));
}

export async function getProject(locale, id) {
  const response = await strapiGet(`/projects/${id}`, { populate: "Images" });
  if (response.data?.attributes?.locale !== locale) return null;
  return normalizeProject(response.data);
}

export const getNosaltres = async (locale) =>
  normalizeNosaltres(await strapiGet("/nosaltres", { locale, "populate[tema][populate]": "imatge" }));

export const getServeis = async (locale) => normalizeServeis(await strapiGet("/servei", { locale, populate: "*" }));

export const getContact = async (locale) => normalizeContact(await strapiGet("/contacte", { locale }));
