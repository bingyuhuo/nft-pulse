import { prisma } from '@/lib/prisma';
import { SentimentScore } from '@/lib/api/types/sentiment';

export class TwitterSentimentService {
  static async storeSentimentData(
    projectId: string,
    sentiment: SentimentScore,
    volume: number
  ) {
    return prisma.sentimentData.create({
      data: {
        projectId,
        source: 'Twitter',
        sentiment: sentiment.score,
        volume,
        timestamp: new Date(),
      },
    });
  }

  static async getProjectSentiment(projectId: string) {
    return prisma.sentimentData.findMany({
      where: {
        projectId,
        source: 'Twitter',
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 100,
    });
  }
}