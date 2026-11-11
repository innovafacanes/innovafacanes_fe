import { describe, expect, it, vi } from "vitest";
import { buildUrl, strapiGet } from "@/lib/strapi";

describe("buildUrl", () => {
  it("encodes Strapi bracket parameters", () => {
    expect(buildUrl("/projects", { locale: "es", "pagination[page]": 2 }, "https://cms/api")).toBe(
      "https://cms/api/projects?locale=es&pagination%5Bpage%5D=2"
    );
  });

  it("omits the query string when there are no params", () => {
    expect(buildUrl("/contacte", {}, "https://cms/api")).toBe("https://cms/api/contacte");
  });
});

describe("strapiGet", () => {
  it("returns parsed JSON", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ data: 1 }) });
    await expect(strapiGet("/home", { locale: "ca" }, { fetchImpl, baseUrl: "https://cms/api" })).resolves.toEqual({ data: 1 });
    expect(fetchImpl).toHaveBeenCalledWith("https://cms/api/home?locale=ca");
  });

  it("throws on non-2xx so ISR keeps serving the previous page", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 502 });
    await expect(strapiGet("/home", {}, { fetchImpl, baseUrl: "https://cms/api" })).rejects.toThrow("Strapi 502");
  });
});
