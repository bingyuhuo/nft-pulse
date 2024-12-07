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

export class TwitterRateLimitError extends TwitterError {
  constructor(endpoint: string) {
    super(
      `Rate limit exceeded for Twitter ${endpoint} endpoint`,
      'RATE_LIMIT_EXCEEDED',
      429
    );
  }
}

export class TwitterAuthError extends TwitterError {
  constructor() {
    super(
      'Invalid Twitter API credentials',
      'INVALID_CREDENTIALS',
      401
    );
  }
}