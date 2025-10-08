import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return new NextResponse('Missing path', { status: 400 });
    }

    // Extract headers for analytics
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    // Vercel provides geo-location headers. Fallback for local development.
    const geo = {
      country: request.headers.get('x-vercel-ip-country') || 'local',
      city: request.headers.get('x-vercel-ip-city') || 'local',
    };

    const client = await clientPromise;
    const db = client.db();

    const pageview = {
      path,
      timestamp: new Date(),
      userAgent,
      geo,
    };

    await db.collection('pageviews').insertOne(pageview);

    return new NextResponse(null, { status: 204 }); // 204 No Content for a successful beacon
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}