import { prisma } from '@/lib/prisma';

export class AnalysisService {
  static async getSentimentData(projectId?: string) {
    return prisma.sentimentData.findMany({
      where: {
        projectId: projectId ?? undefined,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: 100,
    });
  }

  static async getTrendAnalysis(projectId?: string, timeframe: string = '24h') {
    return prisma.trendAnalysis.findMany({
      where: {
        projectId: projectId ?? undefined,
        timeframe,
      },
      orderBy: {
        startDate: 'desc',
      },
      take: 100,
    });
  }
}