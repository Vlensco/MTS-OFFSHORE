const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://postgres:theovine@localhost:5432/mtsoffshore',
});

const PROJECTS = [
  {
    slug: 'pro2504-mpl',
    title: 'Subsea And Floating Flowline Installation',
    service: 'Project Management & Consultancy',
    category: 'subsea',
    year: '2026',
    location: 'Nigeria',
    client: 'Marine Platforms Limited for First E&P / NNPC',
    image: '/assets/images/proj_1.jpg',
    featured: true,
    scope:
      'MTS OFFSHORE provided Project Management & Consultancy (PMC) services to Marine Platforms Limited (Contractor) for the Engineering, Transport & Installation of Subsea Flowline Stability Anchors, Subsea Flowlines and Floating Hoses tied into a NOV Single Anchor Leg (SAL™) Mooring System and FPSO. MTS OFFSHORE provided comprehensive onshore and offshore project management from planning to completion.',
    details: JSON.stringify([
      'Subsea Stability Engineering Review',
      'Dive Subcontractor Selection & Oversight',
      'Installation Oversight for 2 Mooring Piles (84" & 60")',
      'SAL™ Mooring System Subsea Installation',
      'FPSO Tie-in, 1,700m Subsea Flowline & 24" Floating Offloading Flowlines',
    ]),
  },
  {
    slug: 'santos-kumul-marine-terminal-maintenance-2025',
    title: 'Kumul Marine Terminal Maintenance (2025)',
    service: 'Operations & Maintenance',
    category: 'spm',
    year: '2025',
    location: 'Papua New Guinea',
    client: 'Santos Ltd / Kumul Marine Terminal',
    image: '/assets/images/proj_2.jpeg',
    featured: true,
    scope:
      'Turnkey offshore campaign for periodic maintenance, hose string inspection, and mooring telemetry calibration at the Kumul Marine Terminal offshore CALM Buoy.',
    details: JSON.stringify([
      'Full underwater inspection of CALM buoy hull & skirt',
      'Telemetry system battery & solar array overhaul',
      'Mooring leg tension verification and ultrasonic thickness measurements',
      'Environmental monitoring and safety compliance under open swell conditions',
    ]),
  },
  {
    slug: 'santos-calm-buoy-inspection-maintenance-2024',
    title: 'Inspection and Maintenance of CALM Buoy (2024)',
    service: 'Single Point Mooring Systems',
    category: 'spm',
    year: '2024',
    location: 'Papua New Guinea',
    client: 'Santos Ltd',
    image: '/assets/images/proj_3.jpg',
    featured: true,
    scope:
      'Offshore surface and diving intervention campaign for preventative overhaul of CALM Buoy terminal, including subsea hose string changeout and swivel maintenance.',
    details: JSON.stringify([
      'Changeout of floating offloading hoses and subsea Chinese lantern configuration',
      'Product swivel pressure testing and seal replacement',
      'Anode potential measurement and sacrificial anode replacement',
      '100% incident-free execution under IMCA standards',
    ]),
  },
  {
    slug: 'santos-platform-maintenance-2024',
    title: 'Platform Maintenance (2024)',
    service: 'Asset Integrity Management',
    category: 'maintenance',
    year: '2024',
    location: 'Papua New Guinea',
    client: 'Offshore Operator',
    image: '/assets/images/proj_4.jpg',
    featured: true,
    scope:
      'Offshore platform brownfield modification, topsides structural steel replacement, and critical node non-destructive testing (NDT).',
    details: JSON.stringify([
      'Rope access structural node inspection',
      'Pressurized welding habitat operations',
      'Piping spool fabrication, testing, and offshore bolt-up',
      'Blast and high-durability marine epoxy coating application',
    ]),
  },
  {
    slug: 'santos-platform-maintenance-scope-2',
    title: 'Platform Maintenance (2023)',
    service: 'Asset Integrity Management',
    category: 'maintenance',
    year: '2023',
    location: 'Papua New Guinea',
    client: 'Santos Ltd',
    image: '/assets/images/proj_5.png',
    featured: false,
    scope:
      'Phase 2 topsides structural rejuvenation and crane boom recertification campaign for offshore production complex.',
    details: JSON.stringify([
      'Offshore pedestal crane structural inspection and load testing',
      'Helideck netting replacement and friction test certification',
      'Underdeck scaffolding and environmental containment systems',
    ]),
  },
];

async function seed() {
  console.log('Connecting to PostgreSQL database mtsoffshore...');
  const client = await pool.connect();

  try {
    const schemaPath = path.join(__dirname, '../lib/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying database schema...');
    await client.query(schemaSql);
    console.log('Schema applied successfully.');

    console.log('Seeding projects...');
    for (const proj of PROJECTS) {
      await client.query(
        `
        INSERT INTO projects (slug, title, client, year, location, service, scope, details, image, featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          client = EXCLUDED.client,
          year = EXCLUDED.year,
          location = EXCLUDED.location,
          service = EXCLUDED.service,
          scope = EXCLUDED.scope,
          details = EXCLUDED.details,
          image = EXCLUDED.image,
          featured = EXCLUDED.featured;
        `,
        [
          proj.slug,
          proj.title,
          proj.client,
          proj.year,
          proj.location,
          proj.service,
          proj.scope,
          proj.details,
          proj.image,
          proj.featured,
        ]
      );
      console.log(` - Upserted project: ${proj.slug}`);
    }

    const { rows } = await client.query('SELECT count(*) FROM projects;');
    console.log(`Total projects in database: ${rows[0].count}`);

    console.log('Database initialization & seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
