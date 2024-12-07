import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { ProjectService } from '@/lib/api/services/project.service';
import { trackProjectSchema } from '@/lib/api/types/project';

export async function POST(request: NextRequest) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const json = await request.json();
    const data = trackProjectSchema.parse(json);
    const project = await ProjectService.trackProject(data);
    return NextResponse.json(project);
  } catch (error) {
    return handleError(error);
  }
}