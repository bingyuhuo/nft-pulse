import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, rateLimiter } from '@/lib/api/middleware/auth';
import { handleError } from '@/lib/api/middleware/error-handler';
import { ProjectService } from '@/lib/api/services/project.service';

export async function GET(request: NextRequest) {
  const authResponse = await validateApiKey(request);
  if (authResponse) return authResponse;

  const rateResponse = await rateLimiter(request);
  if (rateResponse) return rateResponse;

  try {
    const projects = await ProjectService.getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return handleError(error);
  }
}