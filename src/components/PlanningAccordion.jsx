'use client';

import { useState } from 'react';
import Link from 'next/link';

const PLANNING_ITEMS = [
  {
    id: 1,
    title: 'Project Planning & FEED',
    desc: 'Comprehensive feasibility studies, mooring analysis, route surveys, and constructability assessments for complex offshore campaigns.',
    image: '/assets/images/mts_pmc_control.jpg',
    badge: 'Phase 01',
  },
  {
    id: 2,
    title: 'Engineering & Designing',
    desc: 'Detailed structural design, subsea flowline modeling, dynamic riser simulation, and CALM buoy configuration under international codes.',
    image: '/assets/images/mts_subsea_aim.jpg',
    badge: 'Phase 02',
  },
  {
    id: 3,
    title: 'Marine Execution & Installation',
    desc: 'Turnkey offshore execution with heavy-lift crane vessels, pipelaying barges, saturation diving spreads, and precision telemetry.',
    image: '/assets/images/mts_ti_heavylift.jpg',
    badge: 'Phase 03',
  },
];

export default function PlanningAccordion() {
  const [hoveredItem, setHoveredItem] = useState(1);

  return (
    <section className="home-four-planing" style={{ padding: '90px 0', backgroundColor: '#f8fafc' }}>
      <div className="w-layout-blockcontainer home-four-planing-container w-container">
        <div className="home-four-planing-flex" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '36px', alignItems: 'center' }}>
          {/* Visual Showcase Side */}
          <div className="home-four-planing-image-block" style={{ position: 'relative' }}>
            <div
              className="planning-image-wrapper"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(5, 19, 41, 0.16)',
                position: 'relative',
                minHeight: '300px',
                maxHeight: '480px',
                height: '480px',
              }}
            >
              {PLANNING_ITEMS.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: hoveredItem === item.id ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredItem === item.id ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
              ))}

              {/* Floating Stat Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  backgroundColor: 'rgba(5, 19, 41, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '20px 24px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #e5a93b',
                  color: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#e5a93b', fontWeight: '800', fontSize: '1.4rem' }}>100+</span>
                  <span style={{ fontWeight: '700', fontSize: '1rem', letterSpacing: '0.5px' }}>Offshore Campaigns Delivered</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>
                  Safe, incident-free marine terminal overhauls and subsea construction worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Accordion / Interactive List Side */}
          <div className="home-four-planing-content-block">
            <div style={{ marginBottom: '28px' }}>
              <div className="single-line-tag">
                Operational Excellence
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: '800', color: '#0c3247', lineHeight: '1.2' }}>
                Structured Project Lifecycle
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {PLANNING_ITEMS.map((item) => {
                const isActive = hoveredItem === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    style={{
                      backgroundColor: isActive ? '#ffffff' : '#ffffff',
                      border: isActive ? '2px solid #0072ce' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '24px 28px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 12px 28px rgba(0, 114, 206, 0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                      transform: isActive ? 'translateX(6px)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          backgroundColor: isActive ? '#e0f2fe' : '#f1f5f9',
                          color: isActive ? '#0369a1' : '#64748b',
                          letterSpacing: '1px',
                        }}
                      >
                        {item.badge}
                      </span>
                      <Link href="/project" style={{ textDecoration: 'none' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: isActive ? '#0072ce' : '#f1f5f9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isActive ? '#ffffff' : '#64748b',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                          }}
                        >
                          →
                        </div>
                      </Link>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: isActive ? '#0c3247' : '#1e293b',
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
