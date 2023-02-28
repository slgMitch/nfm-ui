/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_DOMAIN: process.env.APP_DOMAIN,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PRINTFUL_API_KEY: process.env.PRINTFUL_API_KEY,
    REMOVEBG_API_KEY: process.env.REMOVEBG_API_KEY,
    CDN_API_BASE: process.env.CDN_API_BASE,
    S3_IMAGE_BUCKET: process.env.S3_IMAGE_BUCKET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    SNIPCART_TEST_API_KEY: process.env.SNIPCART_TEST_API_KEY,
    CREATE_PRODUCT_EVENT_URL: process.env.CREATE_PRODUCT_EVENT_URL,
    API_BASE_DOMAIN: process.env.API_BASE_DOMAIN,
  },
}

module.exports = nextConfig
