import Link from 'next/link';

export default function Hero() {
  return (
    <div className="home-four-hero">
      <div
        className="home-four-hero-puzzle-wrapper"
        style={{
          backgroundImage:
            'linear-gradient(rgba(5, 19, 41, 0.48), rgba(5, 19, 41, 0.72)), url("/assets/images/mts_hero_cinematic.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="home-four-hero-puzzle-piece home-four-hero-puzzle-piece-middle"></div>
        <div className="home-four-content-block-container">
          <div className="home-four-content-block">
            <div className="tag-two-block padding-bottom-ten">
              <div className="tag-two">
                Tier-One Experience.<br />Independent Agility.
              </div>
            </div>
            <h1 className="text-color-white text-center padding-bottom-ten" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
              Global Offshore Construction &amp; Subsea Services
            </h1>
            <p className="home-four-hero-description text-center padding-bottom-twenty light-color-text" style={{ maxWidth: '720px', margin: '0 auto 24px' }}>
              Lean, responsive, and experienced — delivering safe and efficient PM&amp;C, T&amp;I, and marine terminal services worldwide.
            </p>
            <div className="home-one-hero-btn-flex home-four-flex-center">
              <Link href="/our-advantage" className="body-button bg-dark-pmg-blue w-inline-block">
                <div className="text-block">Our Advantage</div>
                <img
                  width="20"
                  height="12"
                  src="/assets/img/65d4023f0fe16f42cb18370a_White_Arrow.svg"
                  alt="White Medium Arrow"
                />
              </Link>
              <Link
                href="/services"
                className="body-button w-inline-block"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
              >
                <div className="text-block" style={{ color: '#ffffff' }}>Explore Services</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
