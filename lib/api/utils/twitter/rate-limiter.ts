import { LRUCache } from 'lru-cache';
import { TWITTER_RATE_LIMITS } from './constants';
import { TwitterRateLimitError } from './errors';

export class TwitterRateLimiter {
  private limits: Record<string, LRUCache<string, number>>;

  constructor() {
    this.limits = Object.keys(TWITTER_RATE_LIMITS).reduce((acc, endpoint) => ({
      ...acc,
      [endpoint]: new LRUCache({
        max: 100,
        ttl: 15 * 60 * 1000, // 15 minutes
      }),
    }), {});
  }

  async checkLimit(endpoint: keyof typeof TWITTER_RATE_LIMITS) {
    const cache = this.limits[endpoint];
    const key = new Date().getMinutes().toString();
    const count = (cache.get(key) ?? 0) + 1;

    if (count > TWITTER_RATE_LIMITS[endpoint]) {
      throw new TwitterRateLimitError(endpoint);
    }

    cache.set(key, count);
  }
}