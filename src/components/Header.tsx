'use client';

/**
 * Header Component
 * 
 * Responsive navigation header with:
 * - Fixed positioning for persistent visibility
 * - Mobile hamburger menu with smooth transitions
 * - Smooth scroll navigation to sections
 * - Background blur effect on scroll
 * 
 * Accessibility Features:
 * - ARIA labels on navigation
 * - Keyboard accessible menu toggle
 * - Focus management for mobile menu
 * - Proper semantic structure (nav, ul, li)
 * 
 * Animation:
 * - Fade in on page load (0.3s ease-in-out)
 * - Background opacity change on scroll
 * - Mobile menu slide-in transition
 */

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';
import { ThemeToggle } from './ThemeToggle';

// Navigation items configuration
const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for header background on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * Handle scroll event to add background to header
   * Uses useCallback for performance optimization
   */
  const handleScroll = useCallback(() => {
    // Add background when scrolled more than 50px
    setIsScrolled(window.scrollY > 50);
  }, []);

  /**
   * Handle smooth scroll navigation
   * Closes mobile menu and scrolls to section
   */
  const handleNavClick = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Get target element and scroll smoothly
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Calculate offset for fixed header (80px)
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  /**
   * Toggle mobile menu with keyboard support
   */
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  /**
   * Close menu on Escape key press
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  // Set up scroll and keyboard event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.container}>
        {/* Logo/Brand */}
        <a 
          href="#" 
          className={styles.logo}
          aria-label="Go to homepage"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>Jagat Pradhan</span>
        </a>

        {/* Desktop Navigation */}
        <nav 
          className={styles.desktopNav}
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side controls - Theme toggle + Mobile menu */}
        <div className={styles.rightControls}>
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
          <span className={styles.menuBar}></span>
        </button>

        </div>

        {/* Mobile Navigation Overlay */}
        <div 
          className={`${styles.mobileOverlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-menu"
          className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!isMenuOpen}
        >
          <ul className={styles.mobileNavList}>
            {navItems.map((item, index) => (
              <li 
                key={item.href}
                style={{ 
                  animationDelay: isMenuOpen ? `${index * 0.1}s` : '0s' 
                }}
                className={styles.mobileNavItem}
              >
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
