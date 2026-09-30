import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../../lib/auth';
import { updateAdminPassword } from '../../../../lib/contentStore';

export async function GET(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
    },
  });
}

export async function POST(request) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized: Please log in first.' },
      { status: 401 }
    );
  }

  try {
    const { newPassword } = await request.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const success = await updateAdminPassword(session.username, newPassword);
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update password in storage.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin password updated successfully.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to update password: ' + err.message },
      { status: 500 }
    );
  }
}
