/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire application.
 * It includes:
 * - Google Fonts (Roboto) loading via next/font
 * - Global metadata for SEO
 * - Accessibility features (skip link, proper lang attribute)
 * - Animated tri-colour bubbles background component
 */

import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import { AnimatedBubbles } from '@/components/AnimatedBubbles';

// Configure Roboto font with all necessary weights
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap', // Ensures text remains visible during font load
  variable: '--font-roboto',
});

/**
 * Viewport Configuration
 * Separated from metadata as required by Next.js 14+
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Metadata Configuration for SEO
 * 
 * Includes:
 * - Title and description for search engines
 * - Open Graph tags for social media sharing
 * - Twitter card configuration
 */
export const metadata: Metadata = {
  title: 'Jagat Pradhan | Product Security Engineer',
  description: 'Portfolio of Jagat Pradhan - Product Security Engineer specializing in SSDLC, SAST, SCA, CI/CD Security, Cloud Security, and Threat Modelling. Explore projects, skills, and security expertise.',
  keywords: [
    'Jagat Pradhan',
    'Product Security Engineer',
    'Cloud Security',
    'SSDLC',
    'SAST',
    'SCA',
    'CI/CD Security',
    'Threat Modelling',
    'Application Security',
    'Cybersecurity',
  ],
  authors: [{ name: 'Jagat Pradhan' }],
  creator: 'Jagat Pradhan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jagat Pradhan | Product Security Engineer',
    description: 'Portfolio showcasing expertise in Product Security, Cloud Security, and secure software development practices.',
    siteName: 'Jagat Pradhan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagat Pradhan | Product Security Engineer',
    description: 'Portfolio showcasing expertise in Product Security, Cloud Security, and secure software development practices.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/**
 * Root Layout Component
 * 
 * Wraps all pages with common elements:
 * - Skip link for keyboard navigation (accessibility)
 * - Animated background bubbles
 * - Main content area
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={roboto.className}>
        {/* 
          Skip Link for Accessibility
          Allows keyboard users to skip navigation and go directly to main content
          Hidden visually but accessible to screen readers and keyboard navigation
        */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* 
          Animated Tri-colour Bubbles Background
          Decorative Indian flag colored bubbles that float gently
          Uses CSS animations for smooth movement
        */}
        <AnimatedBubbles />
        
        {/* Main content wrapper */}
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  );
}
