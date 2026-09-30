'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projectsData';
import { useSiteContent } from '../context/ContentContext';

export default function ProjectsSection() {
  const { content } = useSiteContent();
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.projects && data.projects.length > 0) {
          setProjectsList(data.projects);
        }
      })
      .catch((err) => console.warn('Could not load dynamic projects:', err));
  }, []);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag tracking refs
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    if (maxScroll > 0) {
      const progress = (scrollLeft / maxScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    } else {
      setScrollProgress(0);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector('.home-three-project-section-item');
    const cardWidth = card ? card.getBoundingClientRect().width : 380;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Left mouse click only
    const el = scrollRef.current;
    if (!el) return;

    isMouseDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const el = scrollRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 120);
    }
  };

  const handleItemClick = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleProgressBarClick = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const maxScroll = el.scrollWidth - el.clientWidth;

    el.scrollTo({
      left: ratio * maxScroll,
      behavior: 'smooth',
    });
  };

  const activeIndex = Math.min(
    projectsList.length,
    Math.max(1, Math.round((scrollProgress / 100) * (projectsList.length - 1)) + 1)
  );

  const projectsTag = content?.home?.projectsSection?.tag || 'Featured Work';
  const projectsTitle = content?.home?.projectsSection?.title || 'Projects';

  return (
    <section className="home-three-project-section" style={{ backgroundColor: '#ffffff', padding: '70px 0 75px 0' }}>
      {/* Header with Title and Navigation Controls - Container Grid Aligned (Exact Image 2) */}
      <div className="w-layout-blockcontainer container-one w-container">
        <div className="projects-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <div
              className="projects-subtitle"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                color: '#0c3247',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              <span>{projectsTag ? projectsTag.toUpperCase().replace(/^[-—\s]+/, '') : 'FEATURED WORK'}</span>
            </div>
            <h2
              className="heading-2"
              style={{
                margin: 0,
                lineHeight: 1.15,
                fontSize: 'clamp(2.1rem, 3.6vw, 2.75rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                color: '#0c3247',
              }}
            >
              {projectsTitle}
            </h2>
          </div>

          {/* Navigation Controls: Circular < and > Buttons (Exact Image 2) */}
          <div className="projects-nav-controls" style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="project-nav-btn"
              aria-label="Previous Projects"
              title="Previous project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#0c3247',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                boxShadow: '0 2px 8px rgba(5, 19, 41, 0.06)',
                opacity: canScrollLeft ? 1 : 0.45,
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="project-nav-btn"
              aria-label="Next Projects"
              title="Next project"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#0c3247',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                boxShadow: '0 2px 8px rgba(5, 19, 41, 0.06)',
                opacity: canScrollRight ? 1 : 0.45,
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Track - Single Row Horizontal Scroll, Drag-to-Scroll Enabled (Exact Image 2) */}
      <div
        ref={scrollRef}
        className={`home-three-project-loop ${isDragging ? 'is-dragging' : ''}`}
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'block',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '8px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div
          className="projects-scroll-track home-three-project-flex"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '24px',
            width: 'max-content',
            paddingLeft: 'max(24px, calc((100vw - 1290px) / 2 + 15px))',
            paddingRight: 'max(24px, calc((100vw - 1290px) / 2 + 15px))',
          }}
        >
          {projectsList.map((proj) => (
            <Link
              key={proj.slug}
              href={`/project/${proj.slug}`}
              role="listitem"
              className="home-three-project-section-item project-card-interactive"
              onClickCapture={handleItemClick}
              draggable={false}
              style={{
                flex: '0 0 380px',
                width: '380px',
                minWidth: '380px',
                maxWidth: '380px',
                height: '460px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                backgroundColor: '#0c3247',
                boxShadow: '0 10px 30px rgba(5, 19, 41, 0.12)',
              }}
            >
              <img
                height={609}
                alt={proj.title}
                width={477}
                src={proj.image}
                className="cover-image"
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* On-Hover Bottom Tab with Yellow Accent Line */}
              <div
                className="home-three-project-on-hover"
                style={{
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  bottom: '24px',
                  left: '0',
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  maxWidth: '88%',
                  borderRadius: '0 8px 8px 0',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.18)',
                  zIndex: 10,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="home-three-project-black-line" style={{ backgroundColor: '#f6b61b', width: '32px', height: '3px', flexShrink: 0 }} />
                <h3
                  className="heading-five change-weight-medium underline-off"
                  style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.35,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {proj.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modern Interactive Progress Indicator: 02 ────────── 05 (Exact Image 2) */}
      <div
        className="projects-progress-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        <span
          className="projects-progress-counter"
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: '#0c3247',
            letterSpacing: '0.05em',
            minWidth: '24px',
            textAlign: 'right',
          }}
        >
          {String(activeIndex).padStart(2, '0')}
        </span>
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="projects-progress-track"
          onClick={handleProgressBarClick}
          title="Click to seek"
          style={{
            width: '240px',
            height: '4px',
            backgroundColor: '#e2e8f0',
            borderRadius: '999px',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <div
            className="projects-progress-bar"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              backgroundColor: '#0c3247',
              borderRadius: '999px',
              width: `${Math.max(16, scrollProgress)}%`,
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
        <span
          className="projects-progress-counter"
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: '#64748b',
            letterSpacing: '0.05em',
            minWidth: '24px',
          }}
        >
          {String(projectsList.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

