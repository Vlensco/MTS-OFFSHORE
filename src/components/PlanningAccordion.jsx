'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSiteContent } from '../context/ContentContext';

const DEFAULT_PLANNING_ITEMS = [
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
  const { content } = useSiteContent();
  const planning = content?.home?.planning || {};
  const items = planning.items && planning.items.length > 0 ? planning.items : DEFAULT_PLANNING_ITEMS;

  const [hoveredItem, setHoveredItem] = useState(items[0]?.id || 1);

  const tag = planning.tag || 'Work Process';
  const title = planning.title || 'Precision Planning & Offshore Delivery';

  return (
    <section className="home-four-planing" style={{ padding: '90px 0', backgroundColor: '#f8fafc', display: 'block' }}>
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
              {items.map((item) => (
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
              <div className="single-line-tag" suppressHydrationWarning>
                {tag}
              </div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: '800', color: '#0c3247', lineHeight: '1.2' }} suppressHydrationWarning>
                {title}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {items.map((item) => {
                const isActive = hoveredItem === item.id;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: isActive ? '2px solid #0072ce' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '24px 28px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 12px 28px rgba(0, 114, 206, 0.12)' : '0 2px 6px rgba(0,0,0,0.03)',
                      transform: isActive ? 'translateX(6px)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          backgroundColor: isActive ? '#e0f2fe' : '#f1f5f9',
                          color: isActive ? '#0284c7' : '#64748b',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {item.badge}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isActive ? '#0072ce' : '#94a3b8'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(90deg)' : 'none' }}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0', fontFamily: 'Montserrat, sans-serif' }}>
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
