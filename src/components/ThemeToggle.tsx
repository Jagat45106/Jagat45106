'use client';

/**
 * ThemeToggle Component
 * 
 * A toggle button for switching between light and dark themes
 * - Persists theme preference in localStorage
 * - Respects system preference on initial load
 * - Smooth animated transition between sun/moon icons
 * - Glowing effect on the toggle button
 */

import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.setAttribute('data-theme', systemTheme);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button 
        className={styles.toggle}
        aria-label="Toggle theme"
        disabled
      >
        <span className={styles.iconPlaceholder}>○</span>
      </button>
    );
  }

  return (
    <button
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={styles.iconWrapper}>
        {/* Sun Icon */}
        <span className={`${styles.icon} ${styles.sunIcon} ${theme === 'light' ? styles.visible : ''}`}>
          ☀️
        </span>
        {/* Moon Icon */}
        <span className={`${styles.icon} ${styles.moonIcon} ${theme === 'dark' ? styles.visible : ''}`}>
          🌙
        </span>
      </span>
      <span className={styles.glow} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
