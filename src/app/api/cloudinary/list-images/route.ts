import { NextResponse } from 'next/server';

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Crear la firma para la autenticación
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = require('crypto')
    .createHash('sha1')
    .update(`prefix=sampleGrowth/&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
        },
        body: JSON.stringify({
          expression: 'folder:sampleGrowth/*',
          max_results: 100,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.resources);
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
