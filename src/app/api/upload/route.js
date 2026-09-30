import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../lib/auth';
import { query } from '../../../lib/db';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in as an admin first.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No file was uploaded.' },
        { status: 400 }
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Please upload an image format (JPG, PNG, WEBP, SVG, GIF).' },
        { status: 400 }
      );
    }

    // Limit size to 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 10MB limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamped name
    const originalExt = path.extname(file.name) || '.jpg';
    const baseName = path.basename(file.name, originalExt).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${baseName}_${Date.now()}${originalExt}`;

    let publicUrl = '';

    // 1. If Vercel Blob Token exists (Production or configured locally)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`uploads/${uniqueFileName}`, file, {
          access: 'public',
        });
        publicUrl = blob.url;
      } catch (blobErr) {
        console.warn('Vercel Blob upload failed, falling back:', blobErr.message);
      }
    }

    // 2. Try local filesystem write (Works locally) if publicUrl is not set yet
    if (!publicUrl) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, uniqueFileName);
        fs.writeFileSync(filePath, buffer);
        publicUrl = `/uploads/${uniqueFileName}`;
      } catch (fsErr) {
        // 3. Fallback for serverless without blob token: Base64 Data URI
        console.warn('Filesystem write not permitted, using Base64 Data URI fallback:', fsErr.message);
        const mime = file.type || 'image/jpeg';
        publicUrl = `data:${mime};base64,${buffer.toString('base64')}`;
      }
    }

    // 4. Save record to Neon PostgreSQL media_items table
    try {
      await query(
        `INSERT INTO media_items (name, url, size, mime_type, folder, created_at)
         VALUES ($1, $2, $3, $4, 'Uploaded Files', NOW());`,
        [uniqueFileName, publicUrl, file.size, file.type || 'image/jpeg']
      );
    } catch (dbErr) {
      console.warn('Could not record media_item to database:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size,
    });
  } catch (error) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image file: ' + error.message },
      { status: 500 }
    );
  }
}
