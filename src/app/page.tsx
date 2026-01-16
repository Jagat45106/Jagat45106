/**
 * Home Page - DevSecOps Portfolio
 * 
 * Main landing page that assembles all sections into a cohesive
 * single-page portfolio website.
 * 
 * Page Structure:
 * 1. Header - Fixed navigation with mobile menu
 * 2. Hero/About - Introduction and professional summary
 * 3. Skills - Technical expertise showcase
 * 4. Projects - Security POC projects gallery
 * 5. Contact - Contact form and information
 * 6. Footer - Links and copyright
 * 
 * SEO Optimization:
 * - Semantic HTML structure (main, sections, articles)
 * - Proper heading hierarchy (h1 -> h2 -> h3)
 * - ARIA landmarks for accessibility
 * - All interactive elements are keyboard accessible
 * 
 * Performance:
 * - Components use lazy loading where appropriate
 * - Intersection Observer for scroll animations
 * - CSS animations use will-change for GPU acceleration
 * - Images can be optimized with next/image (if added)
 */

import { Header, Hero, Skills, Projects, Contact, Footer } from '@/components';

export default function Home() {
  return (
    <>
      {/* 
        Header Component
        Fixed navigation bar that persists across the page
        Includes mobile hamburger menu for responsive design
      */}
      <Header />
      
      {/* 
        Main Content Area
        Uses semantic main element for accessibility
        id="main-content" for skip link navigation
      */}
      <main id="main-content" role="main">
        {/* 
          Hero/About Section
          Primary introduction with animated elements
          Contains: tagline, description, CTAs, quick stats
        */}
        <Hero />
        
        {/* 
          Skills Section
          Four-category grid of technical expertise
          Animated on scroll with staggered card reveal
        */}
        <Skills />
        
        {/* 
          Projects Section
          Security POC showcase in card grid
          Hover effects reveal detailed descriptions
        */}
        <Projects />
        
        {/* 
          Contact Section
          Two-column layout: info + form
          Form validation with accessible error messages
        */}
        <Contact />
      </main>
      
      {/* 
        Footer Component
        Site-wide footer with navigation and social links
        Includes Indian tri-colour accent bar
      */}
      <Footer />
    </>
  );
}
