'use client';

/**
 * Contact Component
 * 
 * Contact form section with validation and submission handling.
 * 
 * Features:
 * - Form validation with real-time feedback
 * - Accessible form structure with ARIA labels
 * - Animated form elements on scroll
 * - Success/error state management
 * - Contact information display
 * 
 * Form Fields:
 * - Name (required, min 2 characters)
 * - Email (required, valid email format)
 * - Message (required, min 10 characters)
 * 
 * Accessibility:
 * - Proper label associations
 * - Error announcements for screen readers
 * - Focus management on errors
 * - ARIA live regions for form feedback
 * 
 * Note: Since this is for GitHub Pages (static hosting),
 * form submission uses Formspree or similar service.
 * Update the form action URL for production use.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Contact.module.css';

// Form field types
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Form status types
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  /**
   * Intersection Observer for scroll animations
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

  /**
   * Email validation regex
   * Checks for standard email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate individual field
   * Returns error message or undefined
   */
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return undefined;
  }, []);

  /**
   * Validate all form fields
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  /**
   * Handle input change
   * Updates form data and validates on change if field was touched
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate if field was previously touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  /**
   * Handle input blur
   * Marks field as touched and validates
   */
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  /**
   * Handle form submission
   * Validates form and simulates submission
   * 
   * For production: Replace with actual form submission logic
   * Options: Formspree, Netlify Forms, EmailJS, or custom backend
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      // Simulate form submission (replace with actual API call)
      // For GitHub Pages, use Formspree or similar:
      // await fetch('https://formspree.io/f/your-form-id', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2 
            id="contact-heading" 
            className={`${styles.title} ${isVisible ? styles.visible : ''}`}
          >
            Get In Touch
          </h2>
          <p className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}>
            Have a security challenge or want to discuss a project? 
            I&apos;d love to hear from you.
          </p>
        </header>

        <div className={styles.content}>
          {/* Contact Information */}
          <div className={`${styles.info} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.infoTitle}>Let&apos;s Connect</h3>
            <p className={styles.infoText}>
              Whether you&apos;re looking for security consultation, interested in 
              collaboration, or just want to chat about DevSecOps best practices, 
              feel free to reach out.
            </p>

            {/* Contact Methods */}
            <ul className={styles.contactMethods} aria-label="Contact methods">
              <li className={styles.contactMethod}>
                <span className={styles.methodIcon} aria-hidden="true">📧</span>
                <div>
                  <span className={styles.methodLabel}>Email</span>
                  <a 
                    href="mailto:maajagat@gmail.com" 
                    className={styles.methodValue}
                    aria-label="Send email to maajagat@gmail.com"
                  >
                    maajagat@gmail.com
                  </a>
                </div>
              </li>
              <li className={styles.contactMethod}>
                <span className={styles.methodIcon} aria-hidden="true">📱</span>
                <div>
                  <span className={styles.methodLabel}>Phone</span>
                  <a 
                    href="tel:+919910045106" 
                    className={styles.methodValue}
                    aria-label="Call +91 9910045106"
                  >
                    +91 9910045106
                  </a>
                </div>
              </li>
              <li className={styles.contactMethod}>
                <span className={styles.methodIcon} aria-hidden="true">🔗</span>
                <div>
                  <span className={styles.methodLabel}>LinkedIn</span>
                  <a 
                    href="https://linkedin.com" 
                    className={styles.methodValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View LinkedIn profile"
                  >
                    /in/devsecops-pro
                  </a>
                </div>
              </li>
              <li className={styles.contactMethod}>
                <span className={styles.methodIcon} aria-hidden="true">💻</span>
                <div>
                  <span className={styles.methodLabel}>GitHub</span>
                  <a 
                    href="https://github.com" 
                    className={styles.methodValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View GitHub profile"
                  >
                    @devsecops-pro
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <form
            className={`${styles.form} ${isVisible ? styles.visible : ''}`}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            {/* Status Messages */}
            {status === 'success' && (
              <div 
                className={styles.successMessage}
                role="alert"
                aria-live="polite"
              >
                <span className={styles.statusIcon}>✅</span>
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {status === 'error' && (
              <div 
                className={styles.errorMessage}
                role="alert"
                aria-live="polite"
              >
                <span className={styles.statusIcon}>❌</span>
                Something went wrong. Please try again later.
              </div>
            )}

            {/* Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
                <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                placeholder="Your name"
                required
                aria-required="true"
                aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.name && touched.name && (
                <span id="name-error" className={styles.errorText} role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
                <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                placeholder="your.email@example.com"
                required
                aria-required="true"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.email && touched.email && (
                <span id="email-error" className={styles.errorText} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
                <span className={styles.required} aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
                placeholder="Tell me about your project or question..."
                rows={5}
                required
                aria-required="true"
                aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.message && touched.message && (
                <span id="message-error" className={styles.errorText} role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'submitting'}
              aria-disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <span className={styles.buttonIcon} aria-hidden="true">📤</span>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
