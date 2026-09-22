'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '../data/projectsData';

function ProjectCard({ project }) {
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
    >
      <img
        src={project.image}
        alt={project.title}
        className="latest-project-card-bg"
      />
      <div className="latest-project-card-overlay" />

      <div className="latest-project-card-content">
        {/* Slanted Arrow Icon matching Photo 1 & 3 */}
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

        {/* Year and Location Tag */}
        <div className="latest-project-meta">
          {project.year} {project.location}
        </div>

        {/* Project Title */}
        <h3 className="latest-project-title">
          {project.title}
        </h3>
      </div>

      {/* Yellow Circular "View Project" Badge following cursor (Photo 3) */}
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

export default function LatestProjectsGrid({ currentSlug }) {
  // Select 4 representative projects (matching Photo 1)
  const displayProjects = PROJECTS.slice(0, 4);

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '90px 0 110px' }}>
      <div className="w-layout-blockcontainer container-one w-container">
        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
            fontWeight: 800,
            color: '#006699',
            marginBottom: '36px',
            letterSpacing: '-0.02em',
          }}
        >
          Latest Project
        </h2>

        <div className="latest-projects-grid">
          {displayProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
