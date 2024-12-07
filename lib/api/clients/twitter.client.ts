import { TwitterApi } from 'twitter-api-v2';
import { TwitterRateLimiter } from '@/lib/api/utils/rate-limiter';
import { TwitterMetrics } from '@/lib/api/types/twitter';

export class TwitterClient {
  private client: TwitterApi;
  private rateLimiter: TwitterRateLimiter;

  constructor() {
    this.client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
    this.rateLimiter = new TwitterRateLimiter();
  }

  async getUserMetrics(handle: string): Promise<TwitterMetrics> {
    await this.rateLimiter.checkLimit('user');
    
    const user = await this.client.v2.userByUsername(handle, {
      'user.fields': ['public_metrics'],
    });

    return {
      followers: user.data.public_metrics?.followers_count ?? 0,
      engagement: 0, // Calculate from recent tweets
      mentions: 0, // Calculate from mentions search
    };
  }

  async getRecentTweets(handle: string) {
    await this.rateLimiter.checkLimit('tweets');
    
    return this.client.v2.userTimeline(handle, {
      max_results: 100,
      'tweet.fields': ['public_metrics', 'created_at'],
    });
  }

  async getRecentMentions(handle: string) {
    await this.rateLimiter.checkLimit('search');
    
    return this.client.v2.search(`@${handle}`, {
      max_results: 100,
      'tweet.fields': ['public_metrics', 'created_at'],
    });
  }
}