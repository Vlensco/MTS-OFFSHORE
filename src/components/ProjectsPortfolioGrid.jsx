'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '../data/projectsData';

function PortfolioCard({ project }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <Link
      href={`/project/${project.slug}`}
      className="latest-project-card"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ height: '390px' }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="latest-project-card-bg"
      />
      <div className="latest-project-card-overlay" />

      <div className="latest-project-card-content">
        {/* Slanted Arrow Icon matching Pan Marina reference */}
        <svg
          className="latest-project-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>

        {/* Subtitle Line 1: Year and Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '14px' }}>
          <div className="latest-project-meta" style={{ margin: 0, color: '#ffffff' }}>
            {project.year} {project.location}
          </div>

          {/* Subtitle Line 2: Service Category */}
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#cbd5e1',
              textTransform: 'uppercase',
            }}
          >
            {project.service}
          </div>
        </div>

        {/* Project Title */}
        <h3 className="latest-project-title">
          {project.title}
        </h3>
      </div>

      {/* Yellow Circular "View Project" Badge following cursor */}
      <div
        className="view-project-circle"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.active ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${mousePos.active ? 1 : 0.35})`,
          transition: mousePos.active
            ? 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <span>
          View<br />Project
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsPortfolioGrid() {
  return (
    <section style={{ backgroundColor: '#eef2f6', padding: '60px 0 100px' }}>
      <div className="w-layout-blockcontainer container-one w-container">
        <div className="latest-projects-grid" style={{ gap: '26px' }}>
          {PROJECTS.map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
