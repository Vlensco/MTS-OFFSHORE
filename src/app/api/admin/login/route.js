import { NextResponse } from 'next/server';
import { authenticateAdmin } from '../../../../lib/contentStore';
import { createSessionToken, SESSION_COOKIE_NAME } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const user = await authenticateAdmin(username.trim(), password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username or password. Please try again.' },
        { status: 401 }
      );
    }

    const token = createSessionToken(user.username, user.role);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful.',
        user: { username: user.username, role: user.role },
      },
      { status: 200 }
    );

    // Set HTTP-Only session cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin Login API Error:', error);
    return NextResponse.json(
      { error: 'Server error during authentication.' },
      { status: 500 }
    );
  }
}
