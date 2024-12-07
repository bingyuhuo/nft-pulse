import { prisma } from '@/lib/prisma';
import { TwitterClient } from '@/lib/api/clients/twitter.client';
import { SentimentAnalyzer } from '@/lib/api/utils/sentiment';
import { TwitterDataProcessor } from '@/lib/api/utils/twitter-processor';
import { TwitterMetrics } from '@/lib/api/types/twitter';
import { handleTwitterError } from '@/lib/api/utils/error-handlers';

export class TwitterService {
  private static client = new TwitterClient();
  private static processor = new TwitterDataProcessor();
  private static analyzer = new SentimentAnalyzer();

  static async collectProjectData(projectId: string, twitterHandle: string) {
    try {
      // Collect Twitter metrics
      const metrics = await this.client.getUserMetrics(twitterHandle);
      
      // Process and store metrics
      await this.storeMetrics(projectId, metrics);

      // Collect recent tweets and mentions
      const tweets = await this.client.getRecentTweets(twitterHandle);
      const mentions = await this.client.getRecentMentions(twitterHandle);

      // Process engagement and sentiment
      const processedData = this.processor.processTwitterData(tweets.data.data, mentions.data.data);
      const sentiment = this.analyzer.analyzeSentiment(processedData.text);

      // Store sentiment data
      await this.storeSentimentData(projectId, sentiment);

      return {
        metrics: processedData.metrics,
        sentiment,
      };
    } catch (error) {
      throw handleTwitterError(error);
    }
  }

  private static async storeMetrics(projectId: string, metrics: TwitterMetrics) {
    return prisma.socialMetrics.upsert({
      where: { projectId },
      create: {
        projectId,
        twitterFollowers: metrics.followers,
        engagement24h: metrics.engagement,
        mentionsCount: metrics.mentions,
      },
      update: {
        twitterFollowers: metrics.followers,
        engagement24h: metrics.engagement,
        mentionsCount: metrics.mentions,
      },
    });
  }

  private static async storeSentimentData(projectId: string, sentiment: number) {
    return prisma.sentimentData.create({
      data: {
        projectId,
        source: 'Twitter',
        sentiment,
        volume: 1,
        timestamp: new Date(),
      },
    });
  }
}