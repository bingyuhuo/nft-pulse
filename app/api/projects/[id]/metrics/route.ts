import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { ProjectService } from '@/lib/api/services/project.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const metrics = await ProjectService.getProjectMetrics(params.id);

    if (!metrics) {
      return NextResponse.json(
        { error: 'Metrics not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(metrics);
  } catch (error) {
    return handleError(error);
  }
}