import { fetchDevData } from '@/lib/github';
import { enrichDevStats } from '@/lib/engine/archetype';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  if (!username || !/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username)) {
    return NextResponse.json(
      { error: 'Invalid GitHub username' },
      { status: 400 }
    );
  }

  // Support passing a token via query string for client-side use
  const token = request.nextUrl.searchParams.get('token') ?? undefined;

  try {
    const rawData = await fetchDevData(username, token);
    const enriched = enrichDevStats({ ...rawData, username });

    const response = NextResponse.json(enriched);
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=604800'
    );
    return response;
  } catch (err: any) {
    const isNotFound = err?.message?.includes('not found');
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch GitHub data' },
      { status: isNotFound ? 404 : 502 }
    );
  }
}
