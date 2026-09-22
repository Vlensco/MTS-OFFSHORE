'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  const creativeRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (creativeRef.current) {
      observer.observe(creativeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-four-about-us">
      <div className="w-layout-blockcontainer home-four-about-us-container w-container">
        <div className="home-four-about-us-main">
          {/* Left Content Column */}
          <div className="home-four-about-us-content-block">
            <div className="single-line-tag">About Us</div>
            <h2 className="heading-2">Offshore Construction Services</h2>
            <p className="padding-bottom-three">
              MTS OFFSHORE&apos;s operations span over three decades, successfully delivering complex marine projects across the Middle East, Europe, South East Asia and Oceania.
            </p>

            {/* Checklist items */}
            <div className="home-four-about-us-flex padding-bottom-fifteen">
              <img
                src="/assets/img/65d4023f0fe16f42cb1838cf_Yellow_Tick.svg"
                alt="Yellow Tick Icons"
                width={21}
                height={20}
              />
              <div className="home-four-about-us-text-block">
                Expert Personnel and technical understanding
              </div>
            </div>

            <div className="home-four-about-us-flex padding-bottom-fifteen">
              <img
                src="/assets/img/65d4023f0fe16f42cb1838cf_Yellow_Tick.svg"
                alt="Yellow Tick Icons"
                width={21}
                height={20}
              />
              <div className="home-four-about-us-text-block">
                Outstanding Quality management and process control
              </div>
            </div>

            <div className="home-four-about-us-flex padding-bottom-thirty-five">
              <img
                src="/assets/img/65d4023f0fe16f42cb1838cf_Yellow_Tick.svg"
                alt="Yellow Tick Icons"
                width={21}
                height={20}
              />
              <div className="home-four-about-us-text-block">
                Strong track record of safe and reliable delivery
              </div>
            </div>

            {/* Mission & Vision Flex */}
            <div className="home-four-about-us-flex-two padding-bottom-fourty">
              <div className="home-four-about-us-flex-image">
                <img
                  src="/assets/images/about_thumb.jpg"
                  alt="Offshore Construction Operations"
                  width={226}
                  height={149}
                  className="full-width cover-image"
                />
              </div>
              <div className="home-four-about-us-flex-content">
                <div className="heading-five padding-bottom-ten">Our Mission &amp; Vision</div>
                <p className="paragraph-6">
                  Fueling the future of offshore construction. We are pioneers of turnkey offshore construction services that are flexible, agile, and cost-effective for global and regional operators.
                </p>
              </div>
            </div>

            <div className="btn-flex">
              <Link href="/about" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block-8">About Us</div>
              </Link>
            </div>
          </div>

          {/* Right Creative Visual Column */}
          <div ref={creativeRef} className="home-four-about-us-creative" style={{ position: 'relative' }}>
            {/* Animated blue decorative border (moves out on scroll then stays) */}
            <div className={`home-one-about-yellow-bg ${isAnimated ? 'is-animated' : 'is-initial'}`} />

            <div className="creative-image-block" style={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <img
                src="/assets/images/about_jacket_portrait.jpg"
                alt="Offshore Jacket Installation"
                width={496}
                height={616}
                className="responsive-full-width cover-image image-shadow"
                style={{ borderRadius: '12px', objectFit: 'cover', display: 'block', width: '100%', height: '100%', aspectRatio: '3/4' }}
              />
            </div>

            {/* Overlapping Inset Badge */}
            <div
              className="home-four-about-content-absolute"
              style={{
                zIndex: 2,
                borderRadius: '8px',
                boxShadow: '0 14px 34px rgba(5, 19, 41, 0.16)',
                transform: isAnimated ? 'translate(0, 0)' : 'translateY(18px)',
                opacity: isAnimated ? 1 : 0.5,
                transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.7s ease 0.15s',
              }}
            >
              <img
                src="/assets/img/65d42addbadc4b36cf019683_20200121_134838.jpg"
                alt="Offshore Management Action"
                width={202}
                height={151}
                style={{ borderRadius: '6px', objectFit: 'cover' }}
              />
              <div className="experience-content-block margin-top-twenty-five">
                <div className="heading-five" style={{ fontWeight: '800', fontSize: '2rem', color: '#0f172a' }}>50+</div>
                <div className="heading-six width-one-twenty-four" style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a', lineHeight: '1.3' }}>
                  Years Of Management Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

