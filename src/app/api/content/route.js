import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '../../../lib/contentStore';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../lib/auth';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Failed to get content:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve site content.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Check admin authentication
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Access denied. Please sign in as an admin.' },
        { status: 401 }
      );
    }

    const newContent = await request.json();
    if (!newContent || typeof newContent !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content data format.' },
        { status: 400 }
      );
    }

    const result = await saveSiteContent(newContent);

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully and synchronized live!',
      dbSaved: result.dbSaved,
    });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json(
      { error: 'Failed to save content: ' + error.message },
      { status: 500 }
    );
  }
}
