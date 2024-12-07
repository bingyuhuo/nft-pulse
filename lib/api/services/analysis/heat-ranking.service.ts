import { prisma } from '@/lib/prisma';
import { LRUCache } from 'lru-cache';
import { calculateHeatScore } from '@/lib/api/utils/analysis/heat-score';
import type { HeatRanking } from '@/lib/api/types/analysis';
import type { NFTProject } from '@prisma/client';

export class HeatRankingService {
  private static cache = new LRUCache<string, HeatRanking[]>({
    max: 100,
    ttl: 5 * 60 * 1000, // 5 minutes
  });

  static async getProjectHeatRankings(): Promise<HeatRanking[]> {
    const cacheKey = 'heat-rankings';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    const projects = await prisma.nFTProject.findMany({
      include: {
        socialMetrics: true,
        sentimentData: {
          orderBy: { timestamp: 'desc' },
          take: 100,
        },
        trendAnalyses: {
          where: {
            timeframe: '24h',
          },
          orderBy: { endDate: 'desc' },
          take: 1,
        },
      },
    });

    const rankings = projects.map((project) => {
      const heatScore = calculateHeatScore({
        followers: project.socialMetrics?.twitterFollowers ?? 0,
        engagement: project.socialMetrics?.engagement24h ?? 0,
        mentions: project.socialMetrics?.mentionsCount ?? 0,
        sentiment: project.sentimentData[0]?.sentiment ?? 0.5,
      });

      const previousScore = project.trendAnalyses[0]?.trend ?? heatScore;
      const change24h = ((heatScore - previousScore) / previousScore) * 100;

      return {
        id: project.id,
        name: project.name,
        symbol: project.symbol,
        heatScore,
        change24h,
      };
    });

    const sortedRankings = rankings.sort((a: HeatRanking, b: HeatRanking) => b.heatScore - a.heatScore);
    this.cache.set(cacheKey, sortedRankings);
    return sortedRankings;
  }
}