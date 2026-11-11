import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/strapi", () => ({ strapiGet: vi.fn() }));

import { getContact, getHome, getNosaltres, getProject, getProjectsPage, getServeis } from "@/lib/content";
import { strapiGet } from "@/lib/strapi";
import contacte from "../fixtures/contacte.json";
import home from "../fixtures/home.json";
import nosaltres from "../fixtures/nosaltres.json";
import projectsPage from "../fixtures/projects-page.json";
import servei from "../fixtures/servei.json";

beforeEach(() => strapiGet.mockReset());

describe("getProjectsPage", () => {
  it("requests a stable, newest-first page of 12", async () => {
    strapiGet.mockResolvedValue(projectsPage);
    const result = await getProjectsPage("es", 3);
    expect(strapiGet).toHaveBeenCalledWith("/projects", {
      locale: "es",
      "sort[0]": "Date:desc",
      "sort[1]": "id:desc",
      populate: "Images",
      "pagination[page]": 3,
      "pagination[pageSize]": 12,
    });
    expect(result.projects[0].title).toBe(projectsPage.data[0].attributes.Title);
  });
});

describe("getHome", () => {
  it("asks for the 6 newest projects", async () => {
    strapiGet.mockResolvedValueOnce(home).mockResolvedValueOnce(projectsPage);
    const result = await getHome("ca");
    expect(strapiGet).toHaveBeenCalledWith("/projects", expect.objectContaining({
      "sort[0]": "Date:desc",
      "pagination[pageSize]": 6,
    }));
    expect(result.reasons.length).toBeGreaterThan(0);
    expect(result.projects).toHaveLength(2);
  });
});

describe("getProject", () => {
  it("queries the projects collection filtered by id and locale", async () => {
    strapiGet.mockResolvedValue({ data: [projectsPage.data[0]] });
    await getProject("ca", projectsPage.data[0].id);
    expect(strapiGet).toHaveBeenCalledWith("/projects", {
      locale: "ca",
      "filters[id][$eq]": projectsPage.data[0].id,
      populate: "Images",
    });
  });

  it("returns the project when the query matches one entry", async () => {
    strapiGet.mockResolvedValue({ data: [projectsPage.data[0]] });
    const project = await getProject("ca", projectsPage.data[0].id);
    expect(project.id).toBe(projectsPage.data[0].id);
  });

  it("returns null when the query matches no entries (wrong locale or deleted)", async () => {
    strapiGet.mockResolvedValue({ data: [] });
    expect(await getProject("en", projectsPage.data[0].id)).toBeNull();
  });

  it("returns null without calling strapiGet for a null id", async () => {
    expect(await getProject("ca", null)).toBeNull();
    expect(strapiGet).not.toHaveBeenCalled();
  });

  it("returns null without calling strapiGet for a NaN id", async () => {
    expect(await getProject("ca", Number.NaN)).toBeNull();
    expect(strapiGet).not.toHaveBeenCalled();
  });
});

describe("getNosaltres", () => {
  it("requests the nosaltres entry with its tema image populated", async () => {
    strapiGet.mockResolvedValue(nosaltres);
    const result = await getNosaltres("ca");
    expect(strapiGet).toHaveBeenCalledWith("/nosaltres", { locale: "ca", "populate[tema][populate]": "imatge" });
    expect(result[0].title).toBe(nosaltres.data.attributes.tema[0].titol);
  });
});

describe("getServeis", () => {
  it("requests the servei entry with full population", async () => {
    strapiGet.mockResolvedValue(servei);
    const result = await getServeis("ca");
    expect(strapiGet).toHaveBeenCalledWith("/servei", { locale: "ca", populate: "*" });
    expect(result[0].title).toBe(servei.data.attributes.servei[0].titol_servei);
  });
});

describe("getContact", () => {
  it("requests the contacte entry", async () => {
    strapiGet.mockResolvedValue(contacte);
    const result = await getContact("ca");
    expect(strapiGet).toHaveBeenCalledWith("/contacte", { locale: "ca" });
    expect(result.name).toBe(contacte.data.attributes.nom_empresa);
  });
});
