import { prisma } from '@/lib/prisma';
import { LRUCache } from 'lru-cache';
import { aggregateSentiment } from '@/lib/api/utils/analysis/sentiment';
import type { SentimentTrend } from '@/lib/api/types/analysis';

export class SentimentAnalysisService {
  private static cache = new LRUCache<string, SentimentTrend>({
    max: 100,
    ttl: 5 * 60 * 1000, // 5 minutes
  });

  static async getProjectSentimentTrend(
    projectId: string,
    timeframe: string = '24h'
  ): Promise<SentimentTrend> {
    const cacheKey = `sentiment-${projectId}-${timeframe}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const sentimentData = await prisma.sentimentData.findMany({
      where: {
        projectId,
        timestamp: {
          gte: this.getTimeframeDate(timeframe),
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    const trend = aggregateSentiment(sentimentData);
    this.cache.set(cacheKey, trend);
    return trend;
  }

  private static getTimeframeDate(timeframe: string): Date {
    const now = new Date();
    switch (timeframe) {
      case '24h':
        return new Date(now.setHours(now.getHours() - 24));
      case '7d':
        return new Date(now.setDate(now.getDate() - 7));
      case '30d':
        return new Date(now.setDate(now.getDate() - 30));
      default:
        return new Date(now.setHours(now.getHours() - 24));
    }
  }
}