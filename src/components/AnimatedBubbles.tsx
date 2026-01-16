'use client';

/**
 * AnimatedBubbles Component
 * 
 * Creates decorative floating bubbles in Indian tri-colours (saffron, white, green)
 * as subtle branding elements throughout the page.
 * 
 * Design Notes:
 * - Bubbles are positioned absolutely and float with CSS animations
 * - Low opacity ensures they don't distract from main content
 * - Multiple sizes and animation delays create organic, random feel
 * - Pointer-events disabled so they don't interfere with interactions
 * 
 * Accessibility:
 * - aria-hidden="true" hides decorative elements from screen readers
 * - Animations respect prefers-reduced-motion via global CSS
 * 
 * Animation Logic:
 * - Uses CSS keyframe animations defined in globals.css
 * - Float animation: gentle up-down movement with slight rotation
 * - Different durations (5-8s) and delays prevent synchronized movement
 */

import React, { useEffect, useState } from 'react';
import styles from './AnimatedBubbles.module.css';

interface Bubble {
  id: number;
  color: 'saffron' | 'white' | 'green';
  size: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

/**
 * Generates bubble configurations
 * Creates varied positions, sizes, and animation timings for natural appearance
 */
function generateBubbles(count: number): Bubble[] {
  const colors: Array<'saffron' | 'white' | 'green'> = ['saffron', 'white', 'green'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // Cycle through tri-colours
    color: colors[i % 3],
    // Random size between 30px and 120px
    size: 30 + Math.random() * 90,
    // Random horizontal position (0-100%)
    left: Math.random() * 100,
    // Random vertical position (0-100%)
    top: Math.random() * 100,
    // Animation duration between 5-8 seconds for varied movement
    animationDuration: 5 + Math.random() * 3,
    // Staggered delays up to 5 seconds
    animationDelay: Math.random() * 5,
  }));
}

export const AnimatedBubbles: React.FC = () => {
  // State to store bubble configurations
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  // Generate bubbles on client-side only to avoid hydration mismatch
  useEffect(() => {
    setBubbles(generateBubbles(15)); // 15 bubbles for subtle effect
  }, []);

  return (
    // Container spans full viewport, positioned behind content
    <div 
      className={styles.bubblesContainer}
      aria-hidden="true" // Hide from screen readers (decorative)
      role="presentation"
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`${styles.bubble} ${styles[bubble.color]}`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBubbles;
