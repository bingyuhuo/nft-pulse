'use client';

import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { cn } from '@/lib/utils';

interface SentimentDisplayProps {
  sentiment: {
    score: number;
    positive: number;
    neutral: number;
    negative: number;
  };
  isLoading?: boolean;
}

export function SentimentDisplay({ sentiment, isLoading }: SentimentDisplayProps) {
  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center bg-gray-800 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  const getSentimentColor = (score: number) => {
    if (score >= 0.6) return 'bg-green-500';
    if (score >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Market Sentiment</h3>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          getSentimentColor(sentiment.score)
        )}>
          Score: {(sentiment.score * 100).toFixed(1)}%
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Positive</span>
            <span>{(sentiment.positive * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${sentiment.positive * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Neutral</span>
            <span>{(sentiment.neutral * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${sentiment.neutral * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Negative</span>
            <span>{(sentiment.negative * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${sentiment.negative * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}