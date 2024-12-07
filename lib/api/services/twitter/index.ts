import { TwitterClient } from '@/lib/api/clients/twitter/client';
import { SentimentAnalyzer } from '@/lib/api/utils/sentiment/analyzer';
import { calculateEngagementMetrics } from '@/lib/api/utils/twitter/metrics';
import { TwitterMetricsService } from './metrics.service';
import { TwitterSentimentService } from './sentiment.service';
import { TwitterData } from '@/lib/api/types/twitter';

export class TwitterService {
  private static client = new TwitterClient();
  private static analyzer = new SentimentAnalyzer();

  static async collectProjectData(
    projectId: string,
    twitterHandle: string
  ): Promise<TwitterData> {
    // Collect Twitter metrics
    const metrics = await this.client.getUserMetrics(twitterHandle);
    
    // Collect tweets and mentions
    const [tweets, mentions] = await Promise.all([
      this.client.getRecentTweets(twitterHandle),
      this.client.getRecentMentions(twitterHandle),
    ]);

    // Calculate engagement metrics
    const engagementMetrics = calculateEngagementMetrics(tweets);
    const updatedMetrics = {
      ...metrics,
      engagement: engagementMetrics.engagement,
      mentions: mentions.length,
    };

    // Analyze sentiment
    const allText = [...tweets, ...mentions]
      .map(tweet => tweet.text)
      .join(' ');
    const sentiment = this.analyzer.analyzeSentiment(allText);

    // Store data
    await Promise.all([
      TwitterMetricsService.storeMetrics(projectId, updatedMetrics),
      TwitterSentimentService.storeSentimentData(
        projectId,
        sentiment,
        tweets.length + mentions.length
      ),
    ]);

    return {
      metrics: updatedMetrics,
      sentiment: sentiment.score,
    };
  }
}

export * from './metrics.service';
export * from './sentiment.service';