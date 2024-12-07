import { NextRequest, NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

const rateLimit = new LRUCache({
  max: 500,
  ttl: 60_000, // 1 minute
});

export async function validateApiKey(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({ error: 'API key is required' }),
      { status: 401 }
    );
  }

  // In production, validate against stored API keys
  if (apiKey !== process.env.API_KEY) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid API key' }),
      { status: 401 }
    );
  }
}

export async function rateLimiter(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const tokenCount = rateLimit.get(ip) as number || 0;

  if (tokenCount > 10) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429 }
    );
  }

  rateLimit.set(ip, tokenCount + 1);
}