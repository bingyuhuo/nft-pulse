import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { SentimentAnalysisService } from '@/lib/api/services/analysis/sentiment.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    
    const sentiment = await SentimentAnalysisService.getProjectSentimentTrend(
      params.projectId,
      timeframe
    );
    
    return NextResponse.json(sentiment);
  } catch (error) {
    return handleError(error);
  }
}