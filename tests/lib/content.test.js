import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/strapi", () => ({ strapiGet: vi.fn() }));

import { getHome, getProject, getProjectsPage } from "@/lib/content";
import { strapiGet } from "@/lib/strapi";
import home from "../fixtures/home.json";
import projectsPage from "../fixtures/projects-page.json";

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
  it("returns the project when it belongs to the requested locale", async () => {
    strapiGet.mockResolvedValue({ data: projectsPage.data[0] });
    const project = await getProject("ca", projectsPage.data[0].id);
    expect(project.id).toBe(projectsPage.data[0].id);
  });

  it("returns null for a project of another locale", async () => {
    strapiGet.mockResolvedValue({ data: projectsPage.data[0] });
    expect(await getProject("en", projectsPage.data[0].id)).toBeNull();
  });
});
