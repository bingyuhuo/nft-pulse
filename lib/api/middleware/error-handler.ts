import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Invalid request data', details: error.errors },
      { status: 400 }
    );
  }

  console.error('API Error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}