module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['app-ambly.s3.amazonaws.com'],
    unoptimized: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};
