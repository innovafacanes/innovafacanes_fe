/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "ca",
    locales: ["ca", "es", "en"],
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

module.exports = nextConfig;
