import { describe, expect, it, vi } from "vitest";
import { submitContactForm } from "@/lib/contactForm";

const formData = { name: "Jane", email: "jane@example.com", message: "Hello" };

describe("submitContactForm", () => {
  it("posts formData only when no siteKey is given", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    await submitContactForm({ formData, fetchImpl, baseUrl: "https://cms/api" });
    expect(fetchImpl).toHaveBeenCalledWith("https://cms/api/ezforms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });
  });

  it("fetches a token via grecaptcha and includes it when a siteKey is given", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    const execute = vi.fn().mockResolvedValue("the-token");
    const grecaptcha = {
      ready: (cb) => cb(),
      execute,
    };
    await submitContactForm({
      formData,
      siteKey: "site-key",
      grecaptcha,
      fetchImpl,
      baseUrl: "https://cms/api",
    });
    expect(execute).toHaveBeenCalledWith("site-key", { action: "contact" });
    expect(fetchImpl).toHaveBeenCalledWith("https://cms/api/ezforms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, token: "the-token" }),
    });
  });

  it("throws on a non-2xx response", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    await expect(
      submitContactForm({ formData, fetchImpl, baseUrl: "https://cms/api" })
    ).rejects.toThrow("Ezforms submit 500");
  });
});
