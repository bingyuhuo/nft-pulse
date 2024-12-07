import { prisma } from '@/lib/prisma';
import { TwitterMetrics } from '@/lib/api/types/twitter';

export class TwitterMetricsService {
  static async storeMetrics(projectId: string, metrics: TwitterMetrics) {
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

  static async getProjectMetrics(projectId: string) {
    return prisma.socialMetrics.findUnique({
      where: { projectId },
      include: {
        project: true,
      },
    });
  }
}