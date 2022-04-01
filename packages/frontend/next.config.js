/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins")
const withImages = require("next-images")

const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["sipherstorage.s3.ap-southeast-1.amazonaws.com", "via.placeholder.com", "lh3.googleusercontent.com"],
  },
}

module.exports = withPlugins([[withImages]], nextConfig)
