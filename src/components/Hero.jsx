'use client';

import Link from 'next/link';
import { useSiteContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useSiteContent();
  const hero = content?.home?.hero || {};

  const tag = hero.tag || 'Tier-One Experience.\nIndependent Agility.';
  const title = hero.title || 'Global Offshore Construction & Subsea Services';
  const description =
    hero.description ||
    'Lean, responsive, and experienced — delivering safe and efficient PM&C, T&I, and marine terminal services worldwide.';
  const bgImage = hero.bgImage || '/assets/images/mts_hero_cinematic.jpg';
  const primaryBtnText = hero.primaryBtnText || 'Our Advantage';
  const primaryBtnLink = hero.primaryBtnLink || '/our-advantage';
  const secondaryBtnText = hero.secondaryBtnText || 'Explore Services';
  const secondaryBtnLink = hero.secondaryBtnLink || '/services';

  return (
    <div className="home-four-hero">
      <div
        className="home-four-hero-puzzle-wrapper"
        style={{
          backgroundImage: `linear-gradient(rgba(5, 19, 41, 0.48), rgba(5, 19, 41, 0.72)), url("${bgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="home-four-hero-puzzle-piece home-four-hero-puzzle-piece-middle"></div>
        <div className="home-four-content-block-container">
          <div className="home-four-content-block">
            <div className="tag-two-block padding-bottom-ten">
              <div className="tag-two" style={{ whiteSpace: 'pre-line' }} suppressHydrationWarning>
                {tag}
              </div>
            </div>
            <h1
              className="text-color-white text-center padding-bottom-ten"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}
              suppressHydrationWarning
            >
              {title}
            </h1>
            <p
              className="home-four-hero-description text-center padding-bottom-twenty light-color-text"
              style={{ maxWidth: '720px', margin: '0 auto 24px' }}
              suppressHydrationWarning
            >
              {description}
            </p>
            <div className="home-one-hero-btn-flex home-four-flex-center">
              <Link href={primaryBtnLink} className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block" suppressHydrationWarning>{primaryBtnText}</div>
                <img
                  width="20"
                  height="12"
                  src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                  alt="White Medium Arrow"
                />
              </Link>
              <Link
                href={secondaryBtnLink}
                className="body-button w-inline-block"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <div className="text-block" style={{ color: '#ffffff' }}>
                  {secondaryBtnText}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
