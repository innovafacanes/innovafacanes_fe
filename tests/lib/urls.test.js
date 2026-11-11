import { describe, expect, it } from "vitest";
import { localizedPath, localizedUrl } from "@/lib/urls";

describe("localizedPath", () => {
  it("keeps the default locale without prefix", () => {
    expect(localizedPath("ca", "/projectes")).toBe("/projectes");
    expect(localizedPath("ca", "/")).toBe("/");
  });

  it("prefixes other locales", () => {
    expect(localizedPath("es", "/projectes")).toBe("/es/projectes");
  });

  it("does not add a trailing slash to a locale home", () => {
    expect(localizedPath("en", "/")).toBe("/en");
  });
});

describe("localizedUrl", () => {
  it("builds an absolute URL on the production domain", () => {
    expect(localizedUrl("es", "/serveis")).toBe("https://www.innovafacanes.cat/es/serveis");
  });
});
