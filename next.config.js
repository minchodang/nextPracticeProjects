/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        MONGO_KEY: process.env.MONGO_KEY,
        MONGO_ID: process.env.MONGO_ID,
    },
};

module.exports = nextConfig;
