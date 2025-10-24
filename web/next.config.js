/**
 * @type {import('next').NextConfig}
 */

// Function to get PWA configuration using dynamic import

  async function getPWAConfig(config) {

  try {
    // Dynamically import next-pwa to avoid require() ESLint error
    const { default: withPWA } = await import('next-pwa');
    return withPWA({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      sw: 'service-worker.js'
    })(config);
  } catch (error) {
    console.warn('Failed to load next-pwa, continuing without PWA support:', error);
    return config;
  }
}
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
    allowedDevOrigins: ['http://localhost:8080'],
  },
};

/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
 reactStrictMode: true,
});

// Export a promise that resolves to the final config
module.exports = getPWAConfig(nextConfig);
