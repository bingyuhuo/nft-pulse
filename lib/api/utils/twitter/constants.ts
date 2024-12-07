export const TWITTER_RATE_LIMITS = {
  user: 900,
  tweets: 1500,
  search: 450,
} as const;

export const TWITTER_API_CONFIG = {
  maxResults: 100,
  tweetFields: ['public_metrics', 'created_at', 'text'] as const,
} as const;