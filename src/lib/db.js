import { Pool } from 'pg';

let pool;
let isInitialized = false;

export function getPool() {
  if (!pool) {
    const connStr =
      process.env.DATABASE_URL ||
      `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'theovine'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'mtsoffshore'}`;

    const isCloud = Boolean(
      connStr && !connStr.includes('localhost') && !connStr.includes('127.0.0.1')
    );

    if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
      return null;
    }

    try {
      pool = new Pool({
        connectionString: connStr,
        ssl: isCloud ? { rejectUnauthorized: false } : undefined,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
      });

      pool.on('error', (err) => {
        console.warn('PostgreSQL pool client notice:', err.message);
      });
    } catch (err) {
      console.warn('PostgreSQL pool creation skipped:', err.message);
      pool = null;
    }
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  if (!p) {
    throw new Error('Database connection not configured (Zero-DB mode active).');
  }
  return p.query(text, params);
}

// In-memory fallback for contact inquiries if DB is not available on Vercel
const fallbackInquiries = [];

export async function saveInquiry({ name, email, phone, company, message, service_interest }) {
  try {
    const queryText = `
      INSERT INTO contact_inquiries (name, email, phone, company, message, service_interest, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id, created_at;
    `;
    const values = [name, email, phone || null, company || null, message, service_interest || null];
    const res = await query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.warn('DB inquiry save unavailable, using fallback:', err.message);
    const mockInquiry = {
      id: 'inq-' + Date.now(),
      name,
      email,
      phone,
      company,
      message,
      service_interest,
      created_at: new Date().toISOString(),
    };
    fallbackInquiries.unshift(mockInquiry);
    return mockInquiry;
  }
}

export async function getAllInquiries() {
  try {
    const res = await query('SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 100;');
    return res.rows;
  } catch (err) {
    return fallbackInquiries;
  }
}

export async function getAllProjects() {
  try {
    const res = await query('SELECT * FROM projects ORDER BY year DESC, id ASC;');
    return res.rows;
  } catch (err) {
    console.warn('Database query failed for getAllProjects, falling back to static data:', err.message);
    return null;
  }
}

export async function getProjectBySlug(slug) {
  try {
    const res = await query('SELECT * FROM projects WHERE slug = $1 LIMIT 1;', [slug]);
    return res.rows[0] || null;
  } catch (err) {
    console.warn(`Database query failed for getProjectBySlug(${slug}):`, err.message);
    return null;
  }
}

