import { Pool } from 'pg';

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString:
        process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'theovine'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'mtsoffshore'}`,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  return p.query(text, params);
}

export async function saveInquiry({ name, email, phone, company, message, service_interest }) {
  const queryText = `
    INSERT INTO contact_inquiries (name, email, phone, company, message, service_interest, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING id, created_at;
  `;
  const values = [name, email, phone || null, company || null, message, service_interest || null];
  const res = await query(queryText, values);
  return res.rows[0];
}

export async function getAllProjects() {
  try {
    const res = await query('SELECT * FROM projects ORDER BY year DESC, id ASC;');
    return res.rows;
  } catch (err) {
    console.error('Database query failed for getAllProjects, falling back to static data:', err.message);
    return null;
  }
}

export async function getProjectBySlug(slug) {
  try {
    const res = await query('SELECT * FROM projects WHERE slug = $1 LIMIT 1;', [slug]);
    return res.rows[0] || null;
  } catch (err) {
    console.error(`Database query failed for getProjectBySlug(${slug}):`, err.message);
    return null;
  }
}
