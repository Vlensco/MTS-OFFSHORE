// Projects filtering and interactive case study modal

export const PROJECTS_DATA = [
  {
    id: 'subsea-flowline',
    title: 'Subsea & Floating Flowline Installation',
    category: 'subsea',
    categoryLabel: 'Subsea & Pipeline',
    location: 'Offshore West Africa / Nigeria',
    year: '2025',
    image: '/assets/images/project-subsea.jpg',
    scope: 'Turnkey engineering, transport, and subsea installation of flexible flowlines, risers, and umbilical connections to deepwater FPSO facility.',
    highlights: [
      'Installed 14.2 km of high-pressure flexible subsea pipelines',
      'Deployed DP2 Construction Support Vessel with 250T AHC crane',
      'Zero Lost Time Incidents (LTI) across 180,000 man-hours',
      'Hydrotesting and pre-commissioning completed 4 days ahead of schedule'
    ],
    client: 'Major Offshore Operator'
  },
  {
    id: 'kumul-terminal',
    title: 'Kumul Marine Terminal Maintenance & Overhaul',
    category: 'spm',
    categoryLabel: 'SPM & Marine Terminal',
    location: 'Gulf of Papua, Papua New Guinea',
    year: '2025',
    image: '/assets/images/project-kumul.jpg',
    scope: 'Comprehensive offshore maintenance campaign for CALM Buoy terminal, including subsea hose string replacement, telemetry overhaul, and structural integrity inspection.',
    highlights: [
      'Full replacement of 20-inch marine floating and submarine hoses',
      'Anode replacement & cathodic protection potential survey',
      'Execution under challenging monsoon open-sea current conditions',
      'Complete mooring leg tension verification and ultrasonic NDT'
    ],
    client: 'National Energy Exploration Co.'
  },
  {
    id: 'calm-buoy-inspection',
    title: 'Inspection & Maintenance of CALM Buoy System',
    category: 'spm',
    categoryLabel: 'SPM & Mooring',
    location: 'Southeast Asia / Natuna Sea',
    year: '2024',
    image: '/assets/images/project-calm.jpg',
    scope: 'Multi-disciplinary offshore inspection and overhaul of SPM CALM Buoy swivel, mooring hawser changeout, and underwater hull cleaning.',
    highlights: [
      'Class renewal inspection compliant with ABS standards',
      'Swivel seal replacement without interrupting production shutdown limits',
      'Air and Nitrox surface-supplied diving operations down to 45m depth',
      '100% adherence to IMCA diving safety guidelines'
    ],
    client: 'Offshore Production Joint Venture'
  },
  {
    id: 'platform-maintenance',
    title: 'Offshore Platform Structural Maintenance & Modification',
    category: 'maintenance',
    categoryLabel: 'Platform Maintenance',
    location: 'Oceania Offshore Basin',
    year: '2024',
    image: '/assets/images/project-platform.jpg',
    scope: 'Topsides structural refurbishment, piping modifications, blast & paint remediation, and helideck recertification for fixed offshore production platform.',
    highlights: [
      'Fabrication and installation of 45 tonnes of structural steel replacement',
      'Rope access NDT inspection for critical jacket nodes',
      'Hot work managed under strict pressurized habitat system',
      'Delivered seamlessly within scheduled brownfield shutdown window'
    ],
    client: 'International Oil & Gas Operator'
  },
  {
    id: 'fpso-mooring',
    title: 'Deepwater FPSO Pre-Lay Mooring System Installation',
    category: 'ti',
    categoryLabel: 'Transport & Installation',
    location: 'South China Sea',
    year: '2023',
    image: '/assets/images/project-fpso.jpg',
    scope: 'Installation and proof load tensioning of 12 suction pile anchors and chain-wire-chain mooring legs for deepwater FPSO turret system.',
    highlights: [
      'Water depth: 420 meters using DP2 AHTS and Anchor Handling Tug fleet',
      'Positioning tolerance achieved within 1.5m using high-accuracy acoustic transponders',
      'Simultaneous subsea survey and ROV monitoring during anchor penetration'
    ],
    client: 'Offshore Floating Production Consortium'
  },
  {
    id: 'cable-lay-trenching',
    title: 'Subsea Composite Power Cable Lay & Trenching',
    category: 'subsea',
    categoryLabel: 'Subsea Construction',
    location: 'North Sea / Europe',
    year: '2023',
    image: '/assets/images/project-cable.jpg',
    scope: 'Offshore transport, lay, and post-lay burial trenching of 33kV inter-array power and fiber optic umbilical cable between offshore platform and subsea manifold.',
    highlights: [
      'Trenching burial depth: 1.5m to 2.0m below seabed in boulder-strewn clay',
      'Utilized high-performance mechanical jet-trenching ROV system',
      'Complete post-burial survey with multi-beam sonar and 3D terrain profile'
    ],
    client: 'Renewables & Offshore Infrastructure Group'
  }
];

export function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');

  // Filter interaction
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 250);
          }
        });
      });
    });
  }

  // Modal interaction
  if (modal) {
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project-id');
        const project = PROJECTS_DATA.find(p => p.id === projectId);
        if (project) {
          openProjectModal(modal, project);
        }
      });
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeProjectModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal(modal);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeProjectModal(modal);
      }
    });
  }
}

function openProjectModal(modal, project) {
  const titleEl = modal.querySelector('#modal-project-title');
  const categoryEl = modal.querySelector('#modal-project-category');
  const locationEl = modal.querySelector('#modal-project-location');
  const yearEl = modal.querySelector('#modal-project-year');
  const clientEl = modal.querySelector('#modal-project-client');
  const scopeEl = modal.querySelector('#modal-project-scope');
  const highlightsEl = modal.querySelector('#modal-project-highlights');
  const imgEl = modal.querySelector('#modal-project-image');

  if (titleEl) titleEl.textContent = project.title;
  if (categoryEl) categoryEl.textContent = project.categoryLabel;
  if (locationEl) locationEl.textContent = project.location;
  if (yearEl) yearEl.textContent = project.year;
  if (clientEl) clientEl.textContent = project.client;
  if (scopeEl) scopeEl.textContent = project.scope;
  if (imgEl) imgEl.src = project.image;

  if (highlightsEl) {
    highlightsEl.innerHTML = project.highlights.map(h => `
      <li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:8px;">
        <svg style="width:18px;height:18px;color:var(--orange-accent);flex-shrink:0;margin-top:3px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${h}</span>
      </li>
    `).join('');
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', initProjects);
