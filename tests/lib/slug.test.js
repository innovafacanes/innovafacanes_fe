import { describe, expect, it } from "vitest";
import { projectIdFromSlug, projectSlug, slugify } from "@/lib/slug";

describe("slugify", () => {
  it("removes accents and joins words with dashes", () => {
    expect(slugify("Rehabilitació a Begur")).toBe("rehabilitacio-a-begur");
  });

  it("drops the Catalan middle dot and trims dashes", () => {
    expect(slugify(" Passarel·la Marina Vela! ")).toBe("passarella-marina-vela");
  });
});

describe("projectSlug", () => {
  it("appends the Strapi id so the slug stays stable when titles repeat", () => {
    expect(projectSlug({ id: 180, title: "Hotel a Malgrat" })).toBe("hotel-a-malgrat-180");
  });
});

describe("projectIdFromSlug", () => {
  it("reads the trailing id", () => {
    expect(projectIdFromSlug("edifici-22-plantes-174")).toBe(174);
  });

  it("returns null when there is no id", () => {
    expect(projectIdFromSlug("hotel")).toBeNull();
    expect(projectIdFromSlug(undefined)).toBeNull();
  });
});
