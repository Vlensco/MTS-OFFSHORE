'use client';

import { useSiteContent } from '../context/ContentContext';
import { useEffect } from 'react';

export default function ThemeStyleInjector() {
  const { content } = useSiteContent();
  const theme = content?.theme || {};

  const fontHeading = theme.fontHeading || 'Montserrat';
  const fontBody = theme.fontBody || 'Inter';
  const colorHeading = theme.colorHeading || '#0c3247';
  const colorBody = theme.colorBody || '#4a5568';
  const colorAccent = theme.colorAccent || '#0072ce';
  const colorTopBar = theme.colorTopBar || '#146cac';

  useEffect(() => {
    // Safely inject or update dynamic style element inside head on client only
    let styleEl = document.getElementById('mts-dynamic-theme-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'mts-dynamic-theme-style';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
      /* Global typography tokens */
      :root {
        --font-heading: '${fontHeading}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        --font-body: '${fontBody}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        --navy-deep: ${colorHeading} !important;
        --text-primary: ${colorHeading} !important;
        --text-secondary: ${colorBody} !important;
        --blue-accent: ${colorAccent} !important;
      }

      /* Apply font family to all headings */
      h1, h2, h3, h4, h5, h6, .heading-1, .heading-2, .heading-3, .heading-4 {
        font-family: '${fontHeading}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      }

      /* Apply heading color ONLY to elements that are NOT white and NOT inside hero or dark elements */
      h1:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      h2:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      h3:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      h4:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      h5:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      h6:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *):not(.about-why-section *):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]),
      .heading-1:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *),
      .heading-2:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *),
      .heading-3:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *),
      .heading-4:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.about-why-header *) {
        color: ${colorHeading};
      }

      /* Hero, dark sections, and white text MUST stay crisp white (Foto 1 Standard) */
      .home-four-hero h1,
      .home-four-hero p,
      .home-four-hero .heading-1,
      .home-four-hero .text-color-white,
      .home-four-hero-container h1,
      .home-four-hero-container p,
      .spm-hero-section h1,
      .spm-hero-section p,
      .spm-hero-section .spm-hero-title,
      .spm-hero-section .spm-hero-desc,
      .spm-hero-section .spm-hero-tag,
      .about-why-header h2,
      .about-why-title,
      .latest-project-card h3,
      .latest-project-card p,
      .latest-project-card .latest-project-meta,
      .latest-project-title,
      .text-color-white,
      .text-white,
      .footer-bg-black,
      .footer-bg-black *,
      .home-four-hero-description {
        color: #ffffff !important;
      }

      /* Body and standard paragraph fonts and colors */
      body {
        font-family: '${fontBody}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      }
      p:not(.text-color-white):not([class*="white"]):not(.home-four-hero *):not(.footer-bg-black *):not(.about-why-header *):not(.about-why-section *):not(.about-why-desc):not([style*="color: white"]):not([style*="color: #fff"]):not([style*="color: rgb(255"]):not([style*="color:#fff"]) {
        font-family: '${fontBody}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: ${colorBody};
      }

      /* Why Choose Us Dark Banner styling */
      .about-why-tag {
        color: #ffb800 !important;
      }
      .about-why-header h2,
      .about-why-title {
        color: #ffffff !important;
      }
      .about-why-desc,
      .about-why-header p {
        color: #cbd5e1 !important;
      }

      .bg-dark-pmg-blue, .body-button.bg-dark-pmg-blue {
        background-color: ${colorAccent} !important;
      }
      .top-utility-section, section[style*="background-color: rgb(20, 108, 172)"], section[style*="background-color: #146cac"] {
        background-color: ${colorTopBar} !important;
      }
    `;

    const root = document.documentElement;
    root.style.setProperty('--font-heading', `'${fontHeading}', sans-serif`);
    root.style.setProperty('--font-body', `'${fontBody}', sans-serif`);
    root.style.setProperty('--navy-deep', colorHeading);
    root.style.setProperty('--text-primary', colorHeading);
    root.style.setProperty('--text-secondary', colorBody);
    root.style.setProperty('--blue-accent', colorAccent);
  }, [fontHeading, fontBody, colorHeading, colorBody, colorAccent, colorTopBar]);

  // Return null to prevent any SSR / hydration mismatch
  return null;
}
