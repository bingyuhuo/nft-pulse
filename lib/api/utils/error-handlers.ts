export class TwitterError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'TwitterError';
  }
}

export function handleTwitterError(error: unknown): TwitterError {
  if (error instanceof TwitterError) {
    return error;
  }

  const message = error instanceof Error ? error.message : 'Unknown error';
  
  if (message.includes('Rate limit exceeded')) {
    return new TwitterError(
      'Twitter API rate limit exceeded',
      'RATE_LIMIT_EXCEEDED',
      429
    );
  }

  if (message.includes('Invalid token')) {
    return new TwitterError(
      'Invalid Twitter API credentials',
      'INVALID_CREDENTIALS',
      401
    );
  }

  return new TwitterError(
    'Twitter API error',
    'INTERNAL_ERROR',
    500
  );
}