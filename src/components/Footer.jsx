import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer footer-blue">
      <div className="w-layout-blockcontainer container-one w-container">
        <div className="w-layout-grid footer-bottom-grid">
          {/* Col 1: Logo & Company Entity */}
          <div className="footer-col-company" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', textAlign: 'center' }}>
            <Link href="/" className="panmarina-logo flex-center w-inline-block">
              <img
                src="/assets/images/mts_logo_white.svg"
                alt="MTS Logo"
                width={220}
                height={58}
                className="image-2"
                style={{ objectFit: 'contain', height: 'auto', maxHeight: '50px' }}
              />
            </Link>
            <div className="footer-text">
              MTS Group Pte Ltd<br />
              MTS Indonesia
            </div>
          </div>

          {/* Col 2: Site Links with White Vertical Left/Right Borders */}
          <div className="footer-text-block align-center">
            <div className="footer-title">Site Links</div>
            <div className="w-layout-grid grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 18px', textAlign: 'center' }}>
              <Link href="/" className="footer-item underline-off footer-two-item">
                Home
              </Link>
              <Link href="/services" className="footer-item underline-off footer-two-item">
                Services
              </Link>
              <Link href="/project" className="footer-item underline-off footer-two-item">
                Projects
              </Link>
              <Link href="/services/pmc" className="footer-item underline-off footer-two-item">
                Project Management
              </Link>
              <Link href="/services/asset-integrity" className="footer-item underline-off footer-two-item">
                Asset Integrity
              </Link>
              <Link href="/services/transport-installation" className="footer-item underline-off footer-two-item">
                Transport &amp; Installation
              </Link>
              <Link href="/single-point-mooring-systems" className="footer-item underline-off footer-two-item">
                SPMs
              </Link>
              <Link href="/about" className="footer-item underline-off footer-two-item">
                About
              </Link>
              <Link href="/contact-us" className="footer-item underline-off footer-two-item">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Col 3: ISO Certification Badges */}
          <div className="footer-col-iso" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/assets/images/iso_certs.png" target="_blank" rel="noopener noreferrer" className="w-inline-block">
              <img
                src="/assets/img/68aeae5e149ae54ab4564fe7_Combined_ISO_Certifications.png"
                alt="Combined ISO Certifications"
                width={190}
                height={135}
                className="image"
                style={{ objectFit: 'contain', height: '135px', width: 'auto' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

