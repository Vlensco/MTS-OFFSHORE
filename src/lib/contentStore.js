import fs from 'fs';
import path from 'path';
import { query } from './db.js';
import { INITIAL_CONTENT } from '../data/initialContent.js';
import { hashPassword, verifyPassword } from './auth.js';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'siteContent.json');

/**
 * Load site content from DB with seamless fallback to JSON file
 */
export async function getSiteContent() {
  try {
    const res = await query('SELECT data FROM site_content WHERE key = $1 LIMIT 1;', ['main']);
    if (res && res.rows && res.rows.length > 0 && res.rows[0].data) {
      return res.rows[0].data;
    }
  } catch (err) {
    console.warn('PostgreSQL site_content read failed, falling back to local JSON file:', err.message);
  }

  // Fallback to JSON file
  try {
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const fileData = fs.readFileSync(CONTENT_FILE_PATH, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (fileErr) {
    console.error('Error reading siteContent.json:', fileErr.message);
  }

  return INITIAL_CONTENT;
}

/**
 * Save site content to DB and write to JSON file
 */
export async function saveSiteContent(content) {
  let dbSuccess = false;

  try {
    await query(
      `
      INSERT INTO site_content (key, data, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (key) DO UPDATE
      SET data = EXCLUDED.data, updated_at = NOW();
      `,
      ['main', JSON.stringify(content)]
    );
    dbSuccess = true;
  } catch (err) {
    console.warn('PostgreSQL site_content write failed, saving to file only:', err.message);
  }

  // Always save to JSON file as cache & fallback
  try {
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf8');
  } catch (fileErr) {
    console.error('Error writing to siteContent.json:', fileErr.message);
  }

  return { success: true, dbSaved: dbSuccess };
}

/**
 * Authenticate admin against database or environment defaults
 */
export async function authenticateAdmin(username, password) {
  const defaultAdminUser = process.env.ADMIN_USERNAME || 'admin';
  const defaultAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

  // 1. Check PostgreSQL admin_users table
  try {
    const res = await query('SELECT * FROM admin_users WHERE username = $1 LIMIT 1;', [username]);
    if (res && res.rows && res.rows.length > 0) {
      const user = res.rows[0];
      const valid = verifyPassword(password, user.password_hash);
      if (valid) {
        return { username: user.username, role: user.role };
      }
      return null;
    }
  } catch (err) {
    console.warn('DB admin check error, checking fallback credentials:', err.message);
  }

  // 2. Default fallback credentials if no DB user found
  if (username === defaultAdminUser && password === defaultAdminPass) {
    // Optionally create user in DB for future logins
    try {
      const hashed = hashPassword(defaultAdminPass);
      await query(
        `
        INSERT INTO admin_users (username, password_hash, role)
        VALUES ($1, $2, 'admin')
        ON CONFLICT (username) DO NOTHING;
        `,
        [defaultAdminUser, hashed]
      );
    } catch {
      // Ignore conflict or connection error
    }

    return { username: defaultAdminUser, role: 'admin' };
  }

  return null;
}

/**
 * Update Admin Password
 */
export async function updateAdminPassword(username, newPassword) {
  const hashed = hashPassword(newPassword);
  try {
    await query(
      `
      INSERT INTO admin_users (username, password_hash, role, updated_at)
      VALUES ($1, $2, 'admin', NOW())
      ON CONFLICT (username) DO UPDATE
      SET password_hash = EXCLUDED.password_hash, updated_at = NOW();
      `,
      [username, hashed]
    );
    return true;
  } catch (err) {
    console.error('Failed to update admin password in DB:', err.message);
    return false;
  }
}
