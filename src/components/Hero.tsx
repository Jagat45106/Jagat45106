'use client';

/**
 * Hero Component
 * 
 * The main landing section of the portfolio featuring:
 * - Animated headline with gradient text
 * - Professional tagline and description
 * - Call-to-action buttons
 * - Animated decorative elements
 * 
 * Accessibility:
 * - Semantic heading structure (h1)
 * - Descriptive link text
 * - Proper focus management
 * - Screen reader friendly content structure
 * 
 * Animations:
 * - Staggered fade-in for text elements (0.3-0.5s)
 * - Floating effect on decorative elements
 * - Smooth hover transitions on buttons
 */

import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Intersection Observer for scroll-triggered animations
   * Adds 'visible' class when section enters viewport
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  /**
   * Smooth scroll to contact section
   */
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      {/* Decorative gradient background */}
      <div className={styles.gradientBg} aria-hidden="true" />
      
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Professional Tag */}
          <span className={styles.tag}>
            <span className={styles.tagIcon}>🔐</span>
            Product Security Engineer
          </span>

          {/* Name */}
          <h1 id="hero-heading" className={styles.heading}>
            Hi, I&apos;m{' '}
            <span className={styles.gradient}>Jagat Pradhan</span>
          </h1>

          {/* Contact Info Bar */}
          <div className={styles.contactBar}>
            <a href="mailto:maajagat@gmail.com" className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              maajagat@gmail.com
            </a>
            <a href="tel:+919910045106" className={styles.contactItem}>
              <span className={styles.contactIcon}>📱</span>
              +91 9910045106
            </a>
          </div>

          {/* Description */}
          <p className={styles.description}>
            I&apos;m a passionate Product Security Engineer specializing in building secure 
            software development lifecycles, implementing robust cloud security architectures, 
            and integrating security seamlessly into CI/CD pipelines. With expertise in 
            threat modelling and vulnerability management, I help organizations shift 
            security left without compromising development velocity.
          </p>

          {/* Call-to-Action Buttons */}
          <div className={styles.cta}>
            <a
              href="#projects"
              className={styles.btnPrimary}
              onClick={(e) => {
                e.preventDefault();
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className={styles.btnIcon}>🚀</span>
              View My Work
            </a>
            <a
              href="#contact"
              className={styles.btnSecondary}
              onClick={scrollToContact}
            >
              <span className={styles.btnIcon}>💬</span>
              Get In Touch
            </a>
          </div>

          {/* Quick Stats */}
          <div className={styles.stats} role="list" aria-label="Professional highlights">
            <div className={styles.stat} role="listitem">
              <span className={styles.statNumber}>13+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.stat} role="listitem">
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Security Projects</span>
            </div>
          </div>
        </div>

        {/* Decorative Security Icons */}
        <div className={styles.decorative} aria-hidden="true">
          <div className={styles.iconFloat}>
            <span className={styles.securityIcon}>🛡️</span>
          </div>
          <div className={styles.iconFloat}>
            <span className={styles.securityIcon}>☁️</span>
          </div>
          <div className={styles.iconFloat}>
            <span className={styles.securityIcon}>🔒</span>
          </div>
          <div className={styles.iconFloat}>
            <span className={styles.securityIcon}>⚙️</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span className={styles.scrollText}>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
