import { TwitterApi, type TweetV2 } from 'twitter-api-v2';
import { TwitterRateLimiter } from '@/lib/api/utils/twitter/rate-limiter';
import { TwitterAuthError } from '@/lib/api/utils/twitter/errors';
import { TWITTER_API_CONFIG } from '@/lib/api/utils/twitter/constants';
import { TwitterMetrics } from '@/lib/api/types/twitter';

export class TwitterClient {
  private client: TwitterApi;
  private rateLimiter: TwitterRateLimiter;

  constructor() {
    const token = process.env.TWITTER_BEARER_TOKEN;
    if (!token) {
      throw new TwitterAuthError();
    }

    this.client = new TwitterApi(token);
    this.rateLimiter = new TwitterRateLimiter();
  }

  async getUserMetrics(handle: string): Promise<TwitterMetrics> {
    await this.rateLimiter.checkLimit('user');
    
    const user = await this.client.v2.userByUsername(handle, {
      'user.fields': ['public_metrics'],
    });

    return {
      followers: user.data.public_metrics?.followers_count ?? 0,
      engagement: 0,
      mentions: 0,
    };
  }

  async getRecentTweets(handle: string): Promise<TweetV2[]> {
    await this.rateLimiter.checkLimit('tweets');
    
    const response = await this.client.v2.userTimeline(handle, {
      max_results: TWITTER_API_CONFIG.maxResults,
      'tweet.fields': [...TWITTER_API_CONFIG.tweetFields],
    });

    return response.data.data;
  }

  async getRecentMentions(handle: string): Promise<TweetV2[]> {
    await this.rateLimiter.checkLimit('search');
    
    const response = await this.client.v2.search(`@${handle}`, {
      max_results: TWITTER_API_CONFIG.maxResults,
      'tweet.fields': [...TWITTER_API_CONFIG.tweetFields],
    });

    return response.data.data;
  }
}