import type { SentimentData } from '@/lib/api/types/sentiment';
import type { SentimentTrend } from '@/lib/api/types/analysis';

export function aggregateSentiment(data: SentimentData[]): SentimentTrend {
  if (data.length === 0) {
    return {
      average: 0.5,
      trend: 0,
      volume: 0,
      distribution: {
        positive: 0,
        neutral: 0,
        negative: 0,
      },
      timePoints: [],
    };
  }

  const totalVolume = data.reduce((sum, point) => sum + point.volume, 0);
  const weightedSum = data.reduce(
    (sum, point) => sum + point.sentiment * point.volume,
    0
  );
  const average = weightedSum / totalVolume;

  // Calculate trend (change over time)
  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];
  const trend = ((lastPoint.sentiment - firstPoint.sentiment) / firstPoint.sentiment) * 100;

  // Calculate sentiment distribution
  const distribution = data.reduce(
    (acc, point) => {
      if (point.sentiment >= 0.6) acc.positive += point.volume;
      else if (point.sentiment <= 0.4) acc.negative += point.volume;
      else acc.neutral += point.volume;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  // Normalize distribution to percentages
  const total = distribution.positive + distribution.neutral + distribution.negative;
  if (total > 0) {
    distribution.positive = distribution.positive / total;
    distribution.neutral = distribution.neutral / total;
    distribution.negative = distribution.negative / total;
  }

  // Create time series data
  const timePoints = data.map((point) => ({
    timestamp: point.timestamp,
    sentiment: point.sentiment,
    volume: point.volume,
  }));

  return {
    average,
    trend,
    volume: totalVolume,
    distribution,
    timePoints,
  };
}