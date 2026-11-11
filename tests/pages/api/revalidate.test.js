import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/content", () => ({ getProjectsPage: vi.fn() }));

const { getProjectsPage } = await import("@/lib/content");
const { default: handler } = await import("@/pages/api/revalidate");

const SECRET = "test-secret";

function makeRes() {
  const res = {
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    revalidate: vi.fn().mockResolvedValue(undefined),
  };
  return res;
}

beforeEach(() => {
  process.env.REVALIDATE_SECRET = SECRET;
  getProjectsPage.mockReset();
});

describe("POST /api/revalidate", () => {
  it("rejects non-POST methods with Allow: POST", async () => {
    const req = { method: "GET", headers: {} };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe("POST");
  });

  it("rejects an invalid secret", async () => {
    const req = { method: "POST", headers: { "x-revalidate-secret": "wrong" } };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(401);
  });

  it("revalidates static paths and pagina 2..pageCount+1 per locale on success", async () => {
    getProjectsPage.mockResolvedValue({ pageCount: 3 });
    const req = { method: "POST", headers: { "x-revalidate-secret": SECRET } };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    // 5 static + (2,3,4) pagina pages = 8 per locale * 3 locales = 24
    expect(res.body.revalidated).toBe(24);
    expect(res.revalidate).toHaveBeenCalledWith("/projectes/pagina/4");
    expect(res.revalidate).not.toHaveBeenCalledWith("/projectes/pagina/5");
  });

  it("still revalidates the 5 static paths for every locale and returns 502 when Strapi is unavailable", async () => {
    getProjectsPage.mockRejectedValue(new Error("fetch failed"));
    const req = { method: "POST", headers: { "x-revalidate-secret": SECRET } };
    const res = makeRes();
    await handler(req, res);
    expect(res.statusCode).toBe(502);
    expect(res.body.message).toBe("Strapi unavailable");
    // 5 static paths * 3 locales, no pagina paths since getProjectsPage always failed
    expect(res.body.revalidated).toBe(15);
    expect(res.revalidate).toHaveBeenCalledTimes(15);
  });
});
