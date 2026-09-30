'use client';

import Link from 'next/link';
import { useSiteContent } from '../context/ContentContext';

export default function AboutPageClient() {
  const { content } = useSiteContent();
  const about = content?.aboutPage || {};

  const heroTag = about.heroTag || 'ABOUT MTS OFFSHORE';
  const heroTitle = about.heroTitle || 'Fueling The Future Of Offshore Construction';
  const heroDesc =
    about.heroDesc ||
    'Delivering safe, efficient, and cost-effective offshore construction, transport & installation, and marine terminal services worldwide.';
  const heroBg = about.heroBg || '/assets/images/mts_hero_cinematic.jpg';

  const storyTag = about.storyTag || 'WHO WE ARE';
  const storyTitle = about.storyTitle || 'Specialists In Complex Offshore & Subsea Environments.';
  const storyP1 =
    about.storyP1 ||
    'MTS OFFSHORE Group operates as an agile, technically advanced offshore solutions provider. We bring together seasoned Tier-1 marine engineering expertise with the responsiveness and flexibility required by today’s energy operators.';
  const storyP2 =
    about.storyP2 ||
    'From Single Point Mooring (SPM) CALM buoy changeouts to deepwater subsea flowline stabilization, jacket installations, and topside rejuvenations, our multi-disciplinary offshore taskforces deliver safely, on schedule, and within budget.';
  const storyImg = about.storyImg || '/assets/images/mts_ti_heavylift.jpg';

  const whyTag = about.whyTag || 'WHY CHOOSE US';
  const whyTitle = about.whyTitle || 'Tailored Solutions For Offshore';
  const whyDesc =
    about.whyDesc ||
    'MTS OFFSHORE develops tailored offshore solutions that work specifically for Client operations. Our flexible and collaborative approach ensures stakeholder satisfaction and reliable work delivery.';

  const whyCards = about.whyCards || [
    {
      title: 'Commitment to Safety & Quality',
      img: '/assets/img/65d42f6da16840ca2f806a13_PMT3.png',
      link: '/services',
      alt: 'Commitment to Safety & Quality',
    },
    {
      title: 'Global Turn-key Offshore Solutions',
      img: '/assets/img/69c040bdb0bd6707f3fccde4_DJI_20260214070435_0974_D.JPG',
      link: '/services',
      alt: 'Global Turn-key Offshore Solutions',
    },
    {
      title: 'Expert Personnel and Engineering',
      img: '/assets/img/65d42c822b203dab730eac0d_TI3.png',
      link: '/our-advantage',
      alt: 'Expert Personnel and Engineering',
    },
  ];

  return (
    <>
      {/* About Hero Banner */}
      <div
        className="home-four-hero"
        style={{
          height: '460px',
          backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.6), rgba(5, 19, 41, 0.75)), url("${heroBg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="tag-two-block padding-bottom-ten">
            <div className="tag-two">{heroTag}</div>
          </div>
          <h1 className="text-color-white text-center padding-bottom-ten" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
            {heroTitle}
          </h1>
          <p className="home-four-hero-description text-center light-color-text" style={{ maxWidth: '760px', margin: '0 auto' }}>
            {heroDesc}
          </p>
        </div>
      </div>

      {/* Main Company Story Section */}
      <section className="section" style={{ padding: '90px 0', backgroundColor: '#ffffff' }}>
        <div className="w-layout-blockcontainer container-one w-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <div className="single-line-tag">{storyTag}</div>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: '800', color: '#0c3247', lineHeight: '1.25', marginBottom: '24px' }}>
                {storyTitle}
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
                {storyP1}
              </p>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '32px' }}>
                {storyP2}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/our-advantage" className="body-button bg-dark-pmg-blue w-inline-block">
                  <div className="text-block-2">Our Advantage →</div>
                </Link>
                <Link href="/contact-us" className="body-button w-inline-block" style={{ border: '2px solid #0c3247', backgroundColor: 'transparent' }}>
                  <div className="text-block-2" style={{ color: '#0c3247' }}>Get In Touch</div>
                </Link>
              </div>
            </div>

            {/* Visual Side */}
            <div style={{ position: 'relative' }}>
              <img
                src={storyImg}
                alt="Offshore Construction Operations"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(5, 19, 41, 0.16)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  right: '-20px',
                  backgroundColor: '#0c3247',
                  color: '#ffffff',
                  padding: '24px 30px',
                  borderRadius: '8px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                  maxWidth: '260px',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffb800' }}>ISO</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#e2e8f0' }}>Certified Management Systems: 9001, 14001 &amp; 45001</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why-section">
        <div className="about-why-header">
          <div className="w-layout-blockcontainer container-one w-container">
            <div className="about-why-header-flex">
              <div className="about-why-header-left">
                <span className="about-why-tag" style={{ color: '#ffb800' }}>{whyTag}</span>
                <h2 className="about-why-title text-color-white text-white" style={{ color: '#ffffff' }}>
                  {whyTitle}
                </h2>
              </div>
              <div className="about-why-header-right">
                <p className="about-why-desc text-white" style={{ color: '#cbd5e1' }}>
                  {whyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-why-cards-container">
          <div className="w-layout-blockcontainer container-one w-container">
            <div className="about-why-grid">
              {whyCards.map((card, idx) => (
                <Link key={idx} href={card.link} className="about-why-card">
                  <div className="about-why-img-wrap">
                    <img src={card.img} alt={card.alt} className="about-why-img" />
                  </div>
                  <div className="about-why-tab">
                    <div className="about-why-tab-title">{card.title}</div>
                    <img
                      src="/assets/img/65d4023f0fe16f42cb183782_White_arrow.svg"
                      alt="Arrow"
                      width="24"
                      height="12"
                      className="about-why-arrow-icon"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
