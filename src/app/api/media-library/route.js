import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifySessionToken, SESSION_COOKIE_NAME } from '../../../lib/auth';
import { query } from '../../../lib/db';

export async function GET(request) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const mediaList = [];
    const publicDir = path.join(process.cwd(), 'public');

    // 1. Scan local static assets
    const folders = [
      { dir: path.join(publicDir, 'uploads'), prefix: '/uploads', label: 'Uploaded Files' },
      { dir: path.join(publicDir, 'assets', 'images'), prefix: '/assets/images', label: 'Theme Images' },
      { dir: path.join(publicDir, 'assets', 'img'), prefix: '/assets/img', label: 'Asset Icons & Photos' },
    ];

    const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);

    for (const folder of folders) {
      if (fs.existsSync(folder.dir)) {
        try {
          const files = fs.readdirSync(folder.dir);
          for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (imageExts.has(ext)) {
              const fullPath = path.join(folder.dir, file);
              const stats = fs.statSync(fullPath);
              mediaList.push({
                name: file,
                url: `${folder.prefix}/${file}`,
                folder: folder.label,
                size: stats.size,
                modifiedAt: stats.mtimeMs,
              });
            }
          }
        } catch (readErr) {
          console.warn(`Could not read directory ${folder.dir}:`, readErr.message);
        }
      }
    }

    // 2. Fetch media recorded in Neon Database (essential for Vercel/cloud uploads)
    try {
      const res = await query('SELECT * FROM media_items ORDER BY created_at DESC LIMIT 200;');
      if (res && res.rows) {
        const existingUrls = new Set(mediaList.map((m) => m.url));
        for (const row of res.rows) {
          if (!existingUrls.has(row.url)) {
            mediaList.push({
              name: row.name,
              url: row.url,
              folder: row.folder || 'Uploaded Files',
              size: row.size || 0,
              modifiedAt: new Date(row.created_at).getTime(),
            });
            existingUrls.add(row.url);
          }
        }
      }
    } catch (dbErr) {
      console.warn('DB media items fetch notice:', dbErr.message);
    }

    // Sort by modified date descending
    mediaList.sort((a, b) => b.modifiedAt - a.modifiedAt);

    return NextResponse.json({
      success: true,
      media: mediaList,
    });
  } catch (error) {
    console.error('Media library error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve media library.' },
      { status: 500 }
    );
  }
}
