/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://sipherstorage.s3.ap-southeast-1.amazonaws.com", "https://lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
