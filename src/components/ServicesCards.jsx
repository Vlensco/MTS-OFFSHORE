'use client';

import Link from 'next/link';
import { useSiteContent } from '../context/ContentContext';

export default function ServicesCards() {
  const { content } = useSiteContent();
  const servSection = content?.home?.services || {};

  const tag = servSection.tag || 'Our Services';
  const title = servSection.title || 'Comprehensive Offshore Solutions';
  const description =
    servSection.description ||
    'We deliver a wide range of offshore construction, project management and consultancy services for subsea and surface installations.';
  const services = servSection.items || [];

  return (
    <section className="home-four-service">
      <div className="w-layout-blockcontainer home-four-service-container w-container">
        <div className="home-four-service-flex">
          <div className="home-four-service-title-block">
            <div className="tag" suppressHydrationWarning>{tag}</div>
            <h2 className="heading-2" suppressHydrationWarning>{title}</h2>
            <p className="home-four-service-paragraph-block" suppressHydrationWarning>
              {description}
            </p>
          </div>
        </div>

        {/* 4 Pillar Grid */}
        <div className="w-layout-grid home-four-services-grid">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="home-four-service-card overflow-hidden"
              style={{
                position: 'relative',
                borderRadius: '8px',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              <img
                src={s.image}
                alt={s.title}
                width={300}
                height={448}
                className="responsive-full-width cover-image"
                style={{
                  height: '448px',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div className="home-four-services-card-content">
                <div className="home-four-services-card-tag-block padding-bottom-ten">
                  <div className="home-four-services-card-tag">{s.tag}</div>
                </div>
                <div className="service-one-text-block padding-bottom-fifteen">
                  {s.title}
                </div>
                <div className="inline-btn-flex">
                  <Link href={s.href || '/services'} className="learn-more-btn text-color-white w-inline-block">
                    <span style={{ whiteSpace: 'nowrap' }}>Learn More</span>
                    <img
                      src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                      alt="White Arrow"
                      width="18"
                      height="10"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Central Action Buttons */}
      <div className="talk-flex-copy" style={{ marginTop: '40px' }}>
        <div className="w-layout-layout wf-layout-layout" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <div className="w-layout-cell" style={{ textAlign: 'center' }}>
            <a
              href="/assets/docs/MTS_Offshore_Capability_Statement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="body-button bg-dark-pmg-blue w-inline-block"
            >
              <div className="text-block-2">MTS OFFSHORE Capability Statement</div>
            </a>
          </div>
          <div className="w-layout-cell" style={{ textAlign: 'center' }}>
            <a
              href="/assets/images/iso_certs.png"
              target="_blank"
              rel="noopener noreferrer"
              className="body-button bg-dark-pmg-blue w-inline-block"
            >
              <div className="text-block-2">MTS OFFSHORE ISO Certificates</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
