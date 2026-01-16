'use client';

/**
 * Projects Component
 * 
 * Showcases security POC projects in an attractive card grid layout.
 * 
 * Features:
 * - Project cards with hover overlay effect
 * - Technology tags for each project
 * - Links to GitHub and live demos
 * - Intersection Observer for scroll animations
 * 
 * Animation Logic:
 * - Cards fade in with staggered delays on scroll
 * - Hover reveals project description overlay
 * - Button hover with scale and color transition
 * - All transitions: 0.3-0.5s ease-in-out
 * 
 * Accessibility:
 * - Semantic article structure
 * - ARIA labels on links
 * - Keyboard accessible interactions
 * - Alt text for project images
 */

import React, { useEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  icon: string;
  github?: string;
  demo?: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

/**
 * Product Security Engineer Projects
 * 
 * Modern, buildable projects showcasing Product Security expertise.
 * Focus areas: SAST/DAST/SCA automation, SBOM/VEX, AI-augmented security,
 * supply chain security, and developer experience.
 * 
 * Each project includes:
 * - Real tools and technologies used in industry
 * - Practical implementation details
 * - References to open-source projects and standards
 */
const projects: Project[] = [
  {
    id: 1,
    title: 'Unified AppSec Pipeline',
    description: 'CI/CD security orchestration with policy-as-code',
    longDescription: 'End-to-end security pipeline integrating Semgrep (SAST), OWASP ZAP (DAST), and Snyk/Trivy (SCA) into GitHub Actions. Features policy-as-code for automatic PR blocking on high-severity findings, SARIF output aggregation, and Slack/Teams notifications. Includes reusable workflow templates.',
    technologies: ['GitHub Actions', 'Semgrep', 'OWASP ZAP', 'Trivy', 'Python'],
    category: 'AppSec Automation',
    icon: '🔄',
    github: 'https://github.com',
    demo: '#',
    color: 'blue',
  },
  {
    id: 2,
    title: 'SBOM & VEX Platform',
    description: 'Supply chain security with CycloneDX & OpenVEX',
    longDescription: 'Automated SBOM generation pipeline using Syft/cdxgen integrated into CI/CD. Implements OpenVEX for vulnerability exploitability analysis, filtering non-exploitable CVEs from dependency scans. Tracks component provenance, license compliance, and generates reports for EU CRA/CISA requirements.',
    technologies: ['CycloneDX', 'OpenVEX', 'Syft', 'Go', 'PostgreSQL'],
    category: 'Supply Chain Security',
    icon: '📦',
    github: 'https://github.com',
    color: 'green',
  },
  {
    id: 3,
    title: 'AI Vulnerability Triager',
    description: 'LLM-powered false positive reduction system',
    longDescription: 'Uses GPT-4/Claude API to analyze SAST findings and classify true vs false positives using chain-of-thought reasoning. Integrates with Semgrep/SonarQube output, provides exploitability context, and suggests remediation. Achieved ~60% false positive reduction in testing while maintaining recall.',
    technologies: ['Python', 'OpenAI API', 'LangChain', 'FastAPI', 'React'],
    category: 'AI Security',
    icon: '🤖',
    github: 'https://github.com',
    demo: '#',
    color: 'purple',
  },
  {
    id: 4,
    title: 'Custom Semgrep Rules Library',
    description: 'Organization-specific SAST rules & guardrails',
    longDescription: 'Curated library of 50+ custom Semgrep rules targeting: insecure deserialization, broken auth patterns, hardcoded secrets, crypto misuse, SQL injection variants, and framework-specific issues (Django, Express, Spring). Includes rule testing framework, CI integration, and severity/confidence tuning.',
    technologies: ['Semgrep', 'YAML', 'Python', 'GitHub Actions'],
    category: 'SAST',
    icon: '📝',
    github: 'https://github.com',
    color: 'orange',
  },
  {
    id: 5,
    title: 'Secure PR Review Bot',
    description: 'Automated security feedback in pull requests',
    longDescription: 'GitHub App that runs security checks on every PR: secrets detection (TruffleHog), dependency vulnerabilities, IaC misconfigs (Checkov), and custom Semgrep rules. Posts inline comments with fix suggestions, blocks merges for critical issues, and tracks security debt. Integrates with Jira for ticket creation.',
    technologies: ['TypeScript', 'Probot', 'TruffleHog', 'Checkov', 'Redis'],
    category: 'Developer Experience',
    icon: '🔔',
    github: 'https://github.com',
    demo: '#',
    color: 'blue',
  },
  {
    id: 6,
    title: 'ASPM Dashboard',
    description: 'Application Security Posture Management console',
    longDescription: 'Unified dashboard aggregating findings from Semgrep, Snyk, Trivy, AWS Security Hub, and Dependabot. Provides risk scoring based on CVSS, EPSS, reachability, and asset criticality. Tracks MTTR, vulnerability trends, SLA compliance, and generates executive reports for SOC2/ISO27001 audits.',
    technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Grafana'],
    category: 'Security Metrics',
    icon: '📊',
    github: 'https://github.com',
    demo: '#',
    color: 'green',
  },
  {
    id: 7,
    title: 'Secrets Scanner & Rotator',
    description: 'Detection, validation, and auto-rotation of secrets',
    longDescription: 'Extends Gitleaks/TruffleHog with custom validators that check if detected secrets (AWS keys, GitHub tokens, API keys) are still active. Integrates with HashiCorp Vault and AWS Secrets Manager for automated rotation. Includes pre-commit hooks, CI scanning, and historical repo scanning for leaked credentials.',
    technologies: ['Go', 'Gitleaks', 'Vault', 'AWS SDK', 'Python'],
    category: 'Secret Management',
    icon: '🔐',
    github: 'https://github.com',
    color: 'purple',
  },
  {
    id: 8,
    title: 'Threat Model as Code',
    description: 'Automated STRIDE analysis from architecture diagrams',
    longDescription: 'CLI tool that parses architecture diagrams (Draw.io, Mermaid, PlantUML) and generates STRIDE threat models. Outputs threat matrices, data flow diagrams with trust boundaries, attack trees, and mitigation recommendations. Integrates with Jira/GitHub Issues for threat tracking. Based on OWASP Threat Dragon concepts.',
    technologies: ['Python', 'PyTM', 'Graphviz', 'FastAPI', 'React'],
    category: 'Threat Modeling',
    icon: '🎯',
    github: 'https://github.com',
    color: 'orange',
  },
  {
    id: 9,
    title: 'Container & K8s Hardening',
    description: 'Security scanning and policy enforcement for containers',
    longDescription: 'Comprehensive container security: Dockerfile linting (Hadolint), image scanning (Trivy/Grype), runtime protection rules (Falco), and Kubernetes admission control (OPA Gatekeeper/Kyverno). Includes CIS benchmark automation, pod security policies, and network policy templates for zero-trust microsegmentation.',
    technologies: ['Trivy', 'Falco', 'OPA', 'Kyverno', 'Go'],
    category: 'Container Security',
    icon: '🐳',
    github: 'https://github.com',
    demo: '#',
    color: 'blue',
  },
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Intersection Observer for scroll-triggered animations
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 
            id="projects-heading" 
            className={`${styles.title} ${isVisible ? styles.visible : ''}`}
          >
            Product Security Projects
          </h2>
          <p className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}>
            Buildable POCs showcasing modern AppSec automation, supply chain security, 
            AI-augmented vulnerability management, and developer-first security tooling.
          </p>
        </header>

        {/* Projects Grid */}
        <div className={styles.grid} role="list" aria-label="Security projects">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`${styles.card} ${styles[project.color]} ${isVisible ? styles.visible : ''}`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : '0s' }}
              role="listitem"
              aria-labelledby={`project-${project.id}`}
            >
              {/* Card Header with Icon and Category */}
              <div className={styles.cardHeader}>
                <span className={styles.icon} aria-hidden="true">
                  {project.icon}
                </span>
                <span className={styles.category}>{project.category}</span>
              </div>

              {/* Project Title and Short Description */}
              <h3 id={`project-${project.id}`} className={styles.projectTitle}>
                {project.title}
              </h3>
              <p className={styles.shortDescription}>{project.description}</p>

              {/* Detailed Description (shown on hover/focus) */}
              <div className={styles.details}>
                <p className={styles.longDescription}>{project.longDescription}</p>
              </div>

              {/* Technology Tags */}
              <div className={styles.technologies}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className={styles.links}>
                {project.github && (
                  <a
                    href={project.github}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <svg 
                      className={styles.linkIcon} 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className={`${styles.link} ${styles.linkPrimary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} demo`}
                  >
                    <svg 
                      className={styles.linkIcon} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View More Link */}
        <div className={`${styles.viewMore} ${isVisible ? styles.visible : ''}`}>
          <a
            href="https://github.com"
            className={styles.viewMoreLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all projects on GitHub"
          >
            View All Projects on GitHub
            <svg 
              className={styles.arrowIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
