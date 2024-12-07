import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { HeatRankingService } from '@/lib/api/services/analysis/heat-ranking.service';

export async function GET(request: NextRequest) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const rankings = await HeatRankingService.getProjectHeatRankings();
    return NextResponse.json(rankings);
  } catch (error) {
    return handleError(error);
  }
}