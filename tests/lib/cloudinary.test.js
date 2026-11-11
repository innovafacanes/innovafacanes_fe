import { describe, expect, it } from "vitest";
import cloudinaryLoader from "@/lib/cloudinary";

const SRC = "https://res.cloudinary.com/drbqhjtmm/image/upload/v1776847631/8_a2b9fbb0a6.jpg";

describe("cloudinaryLoader", () => {
  it("inserts format, quality and width transformations", () => {
    expect(cloudinaryLoader({ src: SRC, width: 640 })).toBe(
      "https://res.cloudinary.com/drbqhjtmm/image/upload/f_auto,q_auto,w_640/v1776847631/8_a2b9fbb0a6.jpg"
    );
  });

  it("uses an explicit quality when given", () => {
    expect(cloudinaryLoader({ src: SRC, width: 320, quality: 60 })).toContain("/upload/f_auto,q_60,w_320/");
  });

  it("leaves non-Cloudinary URLs untouched", () => {
    expect(cloudinaryLoader({ src: "/iflogo_negro.png", width: 240 })).toBe("/iflogo_negro.png");
  });
});
