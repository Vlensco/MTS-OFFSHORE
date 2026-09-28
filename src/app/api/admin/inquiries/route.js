import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../../lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const res = await query('SELECT * FROM contact_inquiries ORDER BY created_at DESC LIMIT 100;');
    return NextResponse.json({
      success: true,
      inquiries: res ? res.rows : [],
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return NextResponse.json({ success: true, inquiries: [] });
  }
}
