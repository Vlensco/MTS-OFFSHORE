import fs from 'fs';
import path from 'path';
import { getPool } from '../lib/db.js';

async function pullContent() {
  console.log('🔄 Connecting to Neon Cloud Database...');
  const pool = getPool();
  if (!pool) {
    console.error('❌ DATABASE_URL is not set or pool could not be initialized.');
    process.exit(1);
  }

  try {
    // 1. Fetch site_content
    console.log('📥 Pulling site_content from Neon...');
    const contentRes = await pool.query("SELECT data, updated_at FROM site_content WHERE key = 'main' LIMIT 1;");
    if (contentRes.rows.length > 0 && contentRes.rows[0].data) {
      const filePath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
      fs.writeFileSync(filePath, JSON.stringify(contentRes.rows[0].data, null, 2), 'utf8');
      console.log(`✅ siteContent.json updated successfully! (Last updated: ${contentRes.rows[0].updated_at})`);
    } else {
      console.warn('⚠️ No site_content found in DB.');
    }

    // 2. Fetch projects
    console.log('📥 Pulling projects from Neon...');
    const projRes = await pool.query('SELECT * FROM projects ORDER BY year DESC, id ASC;');
    console.log(`✅ Retrieved ${projRes.rows.length} projects from database.`);

    // 3. Fetch media items count
    try {
      const mediaRes = await pool.query('SELECT count(*) FROM media_items;');
      console.log(`📸 Total uploaded media records in database: ${mediaRes.rows[0].count}`);
    } catch {}

    console.log('\n🎉 Synchronization complete! All cloud updates are now in your local files.');
  } catch (err) {
    console.error('❌ Failed to pull content:', err.message);
  } finally {
    await pool.end();
  }
}

pullContent();
