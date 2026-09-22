'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TextRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Select headers, tags, key paragraphs, and cards across all pages
    const selectors = [
      'h1',
      'h2',
      'h3',
      '.single-line-tag',
      '.tag',
      '.tag-two',
      '.spm-hero-tag',
      '.contact-hero-tag',
      '.about-why-tag',
      '.contact-info-tag',
      '.contact-info-heading',
      '.about-why-title',
      '.home-four-service-paragraph-block',
      '.about-why-desc',
      '.contact-info-desc',
      '.about-why-card',
      '.contact-location-item',
      '.spm-capability-card',
      '.spm-work-card',
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    elements.forEach((el) => {
      // Exclude main header navigation, dropdowns, and copyright bar
      if (
        el.closest('.header-three') ||
        el.closest('.menu-list') ||
        el.closest('.nevigation-dropdown-list') ||
        el.closest('.footer-bottom-block')
      ) {
        return;
      }

      el.classList.add('text-reveal-fade');

      // Staggering based on element type
      const tagName = el.tagName.toLowerCase();
      if (
        el.classList.contains('single-line-tag') ||
        el.classList.contains('tag') ||
        el.classList.contains('tag-two') ||
        el.classList.contains('spm-hero-tag') ||
        el.classList.contains('contact-hero-tag') ||
        el.classList.contains('about-why-tag') ||
        el.classList.contains('contact-info-tag')
      ) {
        el.classList.add('reveal-delay-1');
      } else if (
        tagName === 'h1' ||
        tagName === 'h2' ||
        el.classList.contains('about-why-title') ||
        el.classList.contains('contact-info-heading')
      ) {
        el.classList.add('reveal-delay-2');
      } else if (
        tagName === 'p' ||
        el.classList.contains('about-why-desc') ||
        el.classList.contains('contact-info-desc') ||
        el.classList.contains('home-four-service-paragraph-block')
      ) {
        el.classList.add('reveal-delay-3');
      } else if (
        tagName === 'h3' ||
        el.classList.contains('about-why-card') ||
        el.classList.contains('contact-location-item')
      ) {
        el.classList.add('reveal-delay-2');
      }

      // Check if already in viewport
      const rect = el.getBoundingClientRect();
      const inInitialView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

      if (inInitialView) {
        setTimeout(() => {
          el.classList.add('is-revealed');
        }, 70);
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
