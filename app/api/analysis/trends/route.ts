import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { AnalysisService } from '@/lib/api/services/analysis.service';

export async function GET(request: NextRequest) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId') ?? undefined;
    const timeframe = searchParams.get('timeframe') || '24h';
    const trends = await AnalysisService.getTrendAnalysis(projectId, timeframe);
    return NextResponse.json(trends);
  } catch (error) {
    return handleError(error);
  }
}