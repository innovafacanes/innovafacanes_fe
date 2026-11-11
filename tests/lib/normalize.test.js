import { describe, expect, it } from "vitest";
import {
  normalizeContact,
  normalizeHome,
  normalizeNosaltres,
  normalizeProject,
  normalizeProjectsPage,
  normalizeServeis,
} from "@/lib/normalize";
import contacte from "../fixtures/contacte.json";
import home from "../fixtures/home.json";
import nosaltres from "../fixtures/nosaltres.json";
import projectsPage from "../fixtures/projects-page.json";
import servei from "../fixtures/servei.json";

describe("normalizeProjectsPage", () => {
  it("flattens projects and keeps pagination", () => {
    const result = normalizeProjectsPage(projectsPage);
    expect(result.page).toBe(1);
    expect(result.pageCount).toBe(Math.ceil(result.total / 2));
    expect(result.projects).toHaveLength(2);

    const [first] = result.projects;
    expect(first.id).toBe(projectsPage.data[0].id);
    expect(first.title).toBe(projectsPage.data[0].attributes.Title);
    expect(first.date).toBe(projectsPage.data[0].attributes.Date);
    expect(first.images[0]).toEqual({
      url: projectsPage.data[0].attributes.Images.data[0].attributes.url,
      alt: projectsPage.data[0].attributes.Images.data[0].attributes.alternativeText ?? "",
      width: projectsPage.data[0].attributes.Images.data[0].attributes.width,
      height: projectsPage.data[0].attributes.Images.data[0].attributes.height,
    });
  });
});

describe("normalizeProject", () => {
  it("handles a project without images and null alt text", () => {
    const project = normalizeProject({
      id: 7,
      attributes: { Title: "Obra", Description: null, Date: null, Images: { data: null } },
    });
    expect(project).toEqual({ id: 7, title: "Obra", description: "", date: null, images: [] });
  });
});

describe("normalizeHome", () => {
  it("returns carousel images and reasons", () => {
    const result = normalizeHome(home);
    expect(result.carousel.length).toBeGreaterThan(0);
    expect(result.carousel[0].url).toMatch(/^https:\/\/res\.cloudinary\.com\//);
    expect(result.reasons[0]).toEqual({
      title: home.data.attributes.perque_nosaltres[0].titol_rao,
      description: home.data.attributes.perque_nosaltres[0].descripcio_rao,
    });
  });
});

describe("normalizeNosaltres", () => {
  it("returns sections with title, description and image", () => {
    const result = normalizeNosaltres(nosaltres);
    expect(result).toHaveLength(nosaltres.data.attributes.tema.length);
    expect(result[0].title).toBe(nosaltres.data.attributes.tema[0].titol);
    expect(result[0].image.url).toMatch(/^https:\/\/res\.cloudinary\.com\//);
  });
});

describe("normalizeServeis", () => {
  it("returns services", () => {
    expect(normalizeServeis(servei)[0]).toEqual({
      title: servei.data.attributes.servei[0].titol_servei,
      description: servei.data.attributes.servei[0].descripcio_servei,
    });
  });
});

describe("normalizeContact", () => {
  it("renames the company fields", () => {
    expect(normalizeContact(contacte)).toEqual({
      name: contacte.data.attributes.nom_empresa,
      address: contacte.data.attributes.direccio_empresa,
      phone: contacte.data.attributes.telefon_empresa,
      mobile: contacte.data.attributes.mobil_empresa,
      email: contacte.data.attributes.email_empresa,
    });
  });
});
