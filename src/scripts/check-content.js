import { getPool } from '../lib/db.js';

async function check() {
  const pool = getPool();
  const res = await pool.query("SELECT data, updated_at FROM site_content WHERE key = 'main'");
  console.log('Updated at:', res.rows[0]?.updated_at);
  console.log('Home hero title:', res.rows[0]?.data?.home?.hero?.title);
  console.log('Home hero subtitle:', res.rows[0]?.data?.home?.hero?.subtitle);
  await pool.end();
}

check().catch(console.error);
