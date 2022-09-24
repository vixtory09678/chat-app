/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_COOKIE_APP: process.env.NEXT_PUBLIC_COOKIE_APP,
    NEXT_PUBLIC_MQTT_BROKER_URL: process.env.NEXT_PUBLIC_MQTT_BROKER_URL,
  }
}

module.exports = nextConfig
