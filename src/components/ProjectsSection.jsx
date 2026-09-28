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
    <section className="home-three-project-section" style={{ backgroundColor: '#ffffff', padding: '70px 0 80px 0' }}>
      {/* Header with Title and Navigation Controls */}
      <div className="home-three-project-section-container">
        <div className="projects-header-flex">
          <div>
            <div className="projects-subtitle">{projectsTag}</div>
            <h2 className="heading-2" style={{ margin: 0, lineHeight: 1.15 }}>{projectsTitle}</h2>
          </div>

          <div className="projects-nav-controls">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="project-nav-btn"
              aria-label="Previous Projects"
              title="Previous project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Track - Native scrollbar hidden, drag-to-scroll enabled */}
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
            paddingLeft: 'max(20px, calc((100vw - 1290px) / 2 + 15px))',
            paddingRight: 'max(20px, calc((100vw - 1290px) / 2 + 15px))',
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
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                backgroundColor: '#0c3247',
              }}
            >
              <img
                height={609}
                alt={proj.title}
                width={477}
                src={proj.image}
                className="cover-image"
                draggable={false}
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              {/* On-Hover Box (Photo 1 Reference) */}
              <div
                className="home-three-project-on-hover"
                style={{
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  bottom: '30px',
                  left: '0',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  maxWidth: '88%',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  zIndex: 10,
                }}
              >
                <div className="home-three-project-black-line" style={{ backgroundColor: '#f6b61b', width: '40px', height: '3px', flexShrink: 0 }} />
                <h3 className="heading-five change-weight-medium underline-off" style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35 }}>
                  {proj.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modern Interactive Progress Indicator */}
      <div className="projects-progress-wrapper">
        <span className="projects-progress-counter">0{activeIndex}</span>
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="projects-progress-track"
          onClick={handleProgressBarClick}
          title="Click to seek"
        >
          <div
            className="projects-progress-bar"
            style={{
              width: `${Math.max(18, scrollProgress)}%`,
            }}
          />
        </div>
        <span className="projects-progress-counter">0{projectsList.length}</span>
      </div>

      {/* View All Button */}
      <div className="projects-view-all-wrap">
        <Link href="/project" className="projects-view-all-btn">
          <span>View All Offshore Projects</span>
          <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

