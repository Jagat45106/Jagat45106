/** @type {import('next').NextConfig} */

/**
 * Next.js Configuration for GitHub Pages Static Export
 * 
 * Key configurations:
 * - output: 'export' - Generates static HTML/CSS/JS files
 * - images.unoptimized: true - Required for static export (no server-side image optimization)
 * - trailingSlash: true - Ensures proper routing on GitHub Pages
 * 
 * For GitHub Pages deployment:
 * 1. Run `npm run build` to generate the `out` directory
 * 2. Deploy the `out` directory contents to GitHub Pages
 */
const nextConfig = {
  // Enable static export for GitHub Pages hosting
  output: 'export',
  
  // Disable server-side image optimization (not available in static export)
  images: {
    unoptimized: true,
  },
  
  // Add trailing slashes for proper GitHub Pages routing
  trailingSlash: true,
  
  // Base path configuration - uncomment and set if deploying to a subdirectory
  // basePath: '/your-repo-name',
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

module.exports = nextConfig;
