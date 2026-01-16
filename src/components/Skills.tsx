'use client';

/**
 * Skills Component
 * 
 * Displays professional skills in an organized grid layout featuring:
 * - Core security skills (SSDLC, SAST, SCA, etc.)
 * - Cloud and infrastructure expertise
 * - Tools and technologies
 * 
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Staggered card animations for visual interest
 * - Interactive hover effects with scale and shadow
 * - Accessible card structure with ARIA labels
 * 
 * Animation Logic:
 * - Cards fade in from bottom when entering viewport
 * - Each card has incremental delay (0.1s) for cascade effect
 * - Hover triggers subtle lift and shadow enhancement
 * - Duration: 0.3-0.5s with ease-in-out timing
 */

import React, { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';

// Skill category and item type definitions
interface Skill {
  name: string;
  description: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

/**
 * Product Security Engineer Skills
 * Organized by domain with modern tools and practices
 */
const skillCategories: SkillCategory[] = [
  {
    title: 'Application Security',
    icon: '🔐',
    color: 'blue',
    skills: [
      {
        name: 'SAST & Custom Rules',
        description: 'Semgrep, SonarQube, CodeQL - writing custom rules for org-specific vulnerabilities',
        icon: '🔍',
      },
      {
        name: 'DAST & API Security',
        description: 'OWASP ZAP, Burp Suite, Nuclei for dynamic testing and API fuzzing',
        icon: '🌐',
      },
      {
        name: 'SCA & SBOM',
        description: 'Snyk, Trivy, Syft - dependency scanning, CycloneDX/SPDX SBOM generation',
        icon: '📦',
      },
    ],
  },
  {
    title: 'Supply Chain Security',
    icon: '🔗',
    color: 'green',
    skills: [
      {
        name: 'SBOM & VEX',
        description: 'CycloneDX, OpenVEX for vulnerability exploitability and compliance (EU CRA, CISA)',
        icon: '📋',
      },
      {
        name: 'Secrets Detection',
        description: 'TruffleHog, Gitleaks, GitGuardian with custom validators and auto-rotation',
        icon: '🔑',
      },
      {
        name: 'Container Security',
        description: 'Trivy, Grype, Falco, OPA/Kyverno for image scanning and runtime protection',
        icon: '🐳',
      },
    ],
  },
  {
    title: 'Security Engineering',
    icon: '⚙️',
    color: 'orange',
    skills: [
      {
        name: 'CI/CD Security',
        description: 'GitHub Actions, GitLab CI security gates, policy-as-code, SARIF integration',
        icon: '🚀',
      },
      {
        name: 'Cloud Security',
        description: 'AWS/GCP/Azure security services, IaC scanning (Checkov, tfsec, KICS)',
        icon: '☁️',
      },
      {
        name: 'Security Automation',
        description: 'Python/Go tooling, API integrations, security chatbots, alert automation',
        icon: '🤖',
      },
    ],
  },
  {
    title: 'Security Program',
    icon: '🛡️',
    color: 'purple',
    skills: [
      {
        name: 'Threat Modeling',
        description: 'STRIDE, PASTA, Attack Trees - PyTM, OWASP Threat Dragon, Microsoft TMT',
        icon: '🎯',
      },
      {
        name: 'Secure Code Review',
        description: 'Manual code audits, security design reviews, architecture assessments',
        icon: '👁️',
      },
      {
        name: 'Metrics & Reporting',
        description: 'ASPM dashboards, MTTR tracking, risk scoring (CVSS, EPSS), executive reporting',
        icon: '📊',
      },
    ],
  },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Intersection Observer Setup
   * 
   * Triggers animation when section is 20% visible in viewport
   * Optimized with once-only observation to prevent re-triggering
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after triggering to optimize performance
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={styles.skills}
      aria-labelledby="skills-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 
            id="skills-heading" 
            className={`${styles.title} ${isVisible ? styles.visible : ''}`}
          >
            Skills & Expertise
          </h2>
          <p className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}>
            Comprehensive security expertise spanning the entire software development 
            and cloud infrastructure landscape.
          </p>
        </header>

        {/* Skills Grid */}
        <div className={styles.grid} role="list" aria-label="Skill categories">
          {skillCategories.map((category, categoryIndex) => (
            <article
              key={category.title}
              className={`${styles.card} ${styles[category.color]} ${isVisible ? styles.visible : ''}`}
              style={{ 
                animationDelay: isVisible ? `${categoryIndex * 0.1}s` : '0s' 
              }}
              role="listitem"
              aria-labelledby={`category-${categoryIndex}`}
            >
              {/* Category Header */}
              <header className={styles.cardHeader}>
                <span className={styles.categoryIcon} aria-hidden="true">
                  {category.icon}
                </span>
                <h3 id={`category-${categoryIndex}`} className={styles.categoryTitle}>
                  {category.title}
                </h3>
              </header>

              {/* Skills List */}
              <ul className={styles.skillsList} aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillIcon} aria-hidden="true">
                        {skill.icon}
                      </span>
                      <h4 className={styles.skillName}>{skill.name}</h4>
                    </div>
                    <p className={styles.skillDescription}>{skill.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Additional Technologies */}
        <div className={`${styles.technologies} ${isVisible ? styles.visible : ''}`}>
          <h3 className={styles.techTitle}>Technologies & Tools</h3>
          <div className={styles.techGrid} role="list" aria-label="Technologies and tools">
            {[
              'Semgrep', 'Snyk', 'SonarQube', 'CodeQL', 'Checkmarx',
              'OWASP ZAP', 'Burp Suite', 'Nuclei', 'Trivy', 'Grype',
              'TruffleHog', 'Gitleaks', 'Checkov', 'tfsec', 'KICS',
              'CycloneDX', 'OpenVEX', 'Syft', 'Falco', 'OPA',
              'GitHub Actions', 'GitLab CI', 'AWS', 'Terraform', 'Vault',
              'Docker', 'Kubernetes', 'Python', 'Go', 'TypeScript',
            ].map((tech) => (
              <span 
                key={tech} 
                className={styles.techBadge}
                role="listitem"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
