/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sipherstorage.s3.ap-southeast-1.amazonaws.com", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
