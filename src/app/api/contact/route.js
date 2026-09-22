import { NextResponse } from 'next/server';
import { saveInquiry } from '../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, service_interest } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const saved = await saveInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      company: company ? company.trim() : null,
      message: message.trim(),
      service_interest: service_interest ? service_interest.trim() : 'General Inquiry',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out to MTS OFFSHORE. Our team will review your inquiry and get in touch promptly.',
        inquiryId: saved.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process inquiry. Please try again or contact us directly at info@mtsoffshore.com.',
      },
      { status: 500 }
    );
  }
}
