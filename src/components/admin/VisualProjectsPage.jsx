'use client';

import React, { useState } from 'react';
import { IconCamera, IconPencil, IconPlus, IconTrash } from './AdminIcons';
import AdminVisualFooter from './AdminVisualFooter';
import { PROJECTS as DEFAULT_PROJECTS } from '../../data/projectsData';

export default function VisualProjectsPage({
  content = {},
  projectsList = [],
  openMediaPicker,
  onOpenProjectModal,
  onDeleteProject,
  openTextEditor,
}) {
  const general = content?.general || {};
  const [activeFilter, setActiveFilter] = useState('All');

  // Fallback to DEFAULT_PROJECTS if projectsList is empty
  const activeProjects = projectsList && projectsList.length > 0 ? projectsList : DEFAULT_PROJECTS;

  const categories = ['All', 'SPM', 'Subsea', 'Platform', 'Marine'];

  const filteredProjects =
    activeFilter === 'All'
      ? activeProjects
      : activeProjects.filter(
          (p) =>
            p.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.title?.toLowerCase().includes(activeFilter.toLowerCase()) ||
            p.service?.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0c3247' }}>
      {/* Hero Banner (Matching Foto 5 & Foto 1 with pure white title & dark overlay) */}
      <div
        style={{
          position: 'relative',
          height: '380px',
          backgroundImage:
            'linear-gradient(rgba(5, 19, 41, 0.55), rgba(5, 19, 41, 0.78)), url("/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="w-layout-blockcontainer container-one w-container" style={{ width: '100%', padding: '0 24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0072ce',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            <span>— RECENT PROJECTS</span>
          </div>

          <h1
            className="text-color-white"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff !important',
              lineHeight: 1.2,
              margin: '0 0 16px 0',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
            }}
          >
            Our Featured Projects
          </h1>
          <p
            style={{
              color: '#e2e8f0',
              fontSize: '1rem',
              maxWidth: '640px',
              margin: 0,
              lineHeight: 1.6,
              fontFamily: 'var(--font-body)',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            Proven execution across complex offshore environments, subsea flowlines, and SPM terminal campaigns worldwide.
          </p>
        </div>
      </div>

      {/* Control Bar: Category Filters & Add Project Button */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '16px 24px' }}>
        <div
          className="w-layout-blockcontainer container-one w-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '6px 16px',
                  backgroundColor: activeFilter === cat ? '#0072ce' : '#ffffff',
                  color: activeFilter === cat ? '#ffffff' : '#475569',
                  border: activeFilter === cat ? '1px solid #0072ce' : '1px solid #cbd5e1',
                  borderRadius: '999px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Add Project Button */}
          <button
            type="button"
            onClick={() => onOpenProjectModal(null)}
            style={{
              padding: '8px 18px',
              backgroundColor: '#0072ce',
              backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0072ce 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0, 114, 206, 0.35)',
            }}
          >
            <IconPlus size={15} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid: EXACT 1:1 REPLICA of Foto 5 (Two Columns, Full Bleed Cards) */}
      <section style={{ backgroundColor: '#eef2f6', padding: '60px 0 100px' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="latest-projects-grid" style={{ gap: '26px' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.slug || project.id}
                className="latest-project-card"
                style={{
                  height: '390px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(5, 19, 41, 0.18)',
                }}
              >
                {/* Background Image */}
                <img
                  src={project.image || '/assets/img/6886b9bc620916f9026a9219_Birdseye_Deck_View_Compressed.jpg'}
                  alt={project.title}
                  className="latest-project-card-bg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Dark Gradient Overlay matching Foto 5 */}
                <div
                  className="latest-project-card-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(to top, rgba(5, 19, 41, 0.94) 0%, rgba(5, 19, 41, 0.5) 55%, rgba(5, 19, 41, 0.25) 100%)',
                  }}
                />

                {/* Floating Admin Controls in Top-Right Corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      openMediaPicker(
                        `project-img-${project.slug}`,
                        project.image,
                        `Change Photo: ${project.title}`
                      )
                    }
                    title="Change Project Photo"
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <IconCamera size={12} color="#38bdf8" /> Photo
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(project)}
                    title="Edit Project Details"
                    style={{
                      backgroundColor: 'rgba(2, 132, 199, 0.9)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <IconPencil size={12} /> Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteProject(project.slug)}
                    title="Delete Project"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.85)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '5px 8px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <IconTrash size={12} />
                  </button>
                </div>

                {/* Card Content (Exact Replica of Foto 5) */}
                <div
                  className="latest-project-card-content"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '28px',
                    zIndex: 10,
                  }}
                >
                  {/* Slanted Arrow Icon */}
                  <svg
                    className="latest-project-arrow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '22px', height: '22px', marginBottom: '14px', display: 'block' }}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>

                  {/* Subtitle Line 1: Year and Location */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px' }}>
                    <div
                      className="latest-project-meta"
                      style={{
                        margin: 0,
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.year} {project.location}
                    </div>

                    {/* Subtitle Line 2: Service Category */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        color: '#cbd5e1',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.service}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3
                    className="latest-project-title"
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.25,
                      margin: 0,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Yellow "View Project" Circular Badge (Foto 5 Signature Element) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    backgroundColor: '#e5a93b',
                    color: '#051329',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    lineHeight: '1.15',
                    boxShadow: '0 8px 20px rgba(229, 169, 59, 0.45)',
                    zIndex: 15,
                    pointerEvents: 'none',
                    opacity: 0.95,
                  }}
                >
                  <span>
                    View<br />Project
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <AdminVisualFooter
        general={general}
        openTextEditor={openTextEditor}
        openMediaPicker={openMediaPicker}
      />
    </div>
  );
}
