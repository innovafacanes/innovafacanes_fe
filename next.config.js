/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  }
}

module.exports = nextConfig
