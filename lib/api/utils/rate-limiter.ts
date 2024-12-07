import { LRUCache } from 'lru-cache';

export class TwitterRateLimiter {
  private limits: Record<string, LRUCache<string, number>>;

  constructor() {
    // Initialize rate limiters for different endpoints
    this.limits = {
      user: new LRUCache({
        max: 100,
        ttl: 15 * 60 * 1000, // 15 minutes
      }),
      tweets: new LRUCache({
        max: 100,
        ttl: 15 * 60 * 1000,
      }),
      search: new LRUCache({
        max: 100,
        ttl: 15 * 60 * 1000,
      }),
    };
  }

  async checkLimit(type: keyof typeof this.limits) {
    const cache = this.limits[type];
    const key = new Date().getMinutes().toString();
    const count = (cache.get(key) ?? 0) + 1;

    if (count > this.getMaxRequests(type)) {
      throw new Error(`Rate limit exceeded for ${type}`);
    }

    cache.set(key, count);
  }

  private getMaxRequests(type: string): number {
    // Twitter API rate limits per 15-minute window
    const limits: Record<string, number> = {
      user: 900,
      tweets: 1500,
      search: 450,
    };

    return limits[type] ?? 100;
  }
}