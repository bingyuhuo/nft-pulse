export interface HeatRanking {
  id: string;
  name: string;
  symbol: string;
  heatScore: number;
  change24h: number;
}

export interface SentimentTrend {
  average: number;
  trend: number;
  volume: number;
  distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  timePoints: Array<{
    timestamp: Date;
    sentiment: number;
    volume: number;
  }>;
}

export interface TrendPoint {
  timestamp: Date;
  value: number;
}

export type TimeFrame = '24h' | '7d' | '30d';