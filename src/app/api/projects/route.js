import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { PROJECTS as STATIC_PROJECTS } from '../../../data/projectsData';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../lib/auth';

export async function GET() {
  try {
    const res = await query('SELECT * FROM projects ORDER BY year DESC, id ASC;');
    if (res && res.rows && res.rows.length > 0) {
      return NextResponse.json({ success: true, projects: res.rows });
    }
  } catch (err) {
    console.warn('DB query failed for projects, returning static data:', err.message);
  }

  return NextResponse.json({ success: true, projects: STATIC_PROJECTS });
}

export async function POST(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, client, year, location, service, scope, details, image, featured } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required.' }, { status: 400 });
    }

    const queryText = `
      INSERT INTO projects (slug, title, client, year, location, service, scope, details, image, featured, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        client = EXCLUDED.client,
        year = EXCLUDED.year,
        location = EXCLUDED.location,
        service = EXCLUDED.service,
        scope = EXCLUDED.scope,
        details = EXCLUDED.details,
        image = EXCLUDED.image,
        featured = EXCLUDED.featured
      RETURNING *;
    `;

    const values = [
      slug.trim(),
      title.trim(),
      client || 'Client',
      year || new Date().getFullYear().toString(),
      location || 'Global',
      service || 'Project Management',
      scope || '',
      JSON.stringify(Array.isArray(details) ? details : []),
      image || '/assets/images/mts_hero_cinematic.jpg',
      Boolean(featured),
    ];

    const res = await query(queryText, values);

    return NextResponse.json({
      success: true,
      message: 'Project saved successfully.',
      project: res.rows[0],
    });
  } catch (err) {
    console.error('Error saving project:', err);
    return NextResponse.json({ error: 'Failed to save project: ' + err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required.' }, { status: 400 });
    }

    await query('DELETE FROM projects WHERE slug = $1;', [slug]);

    return NextResponse.json({ success: true, message: `Project ${slug} deleted successfully.` });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Failed to delete project: ' + err.message }, { status: 500 });
  }
}
