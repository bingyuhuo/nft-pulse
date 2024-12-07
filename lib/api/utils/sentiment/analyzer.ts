import { SentimentScore } from '@/lib/api/types/sentiment';
import { SENTIMENT_WORDS } from './words';

export class SentimentAnalyzer {
  analyzeSentiment(text: string): SentimentScore {
    const words = text.toLowerCase().split(/\s+/);
    let positive = 0;
    let negative = 0;
    let neutral = 0;

    for (const word of words) {
      if (SENTIMENT_WORDS.positive.has(word)) positive++;
      else if (SENTIMENT_WORDS.negative.has(word)) negative++;
      else neutral++;
    }

    const total = positive + negative + neutral;
    if (total === 0) {
      return {
        score: 0.5,
        positive: 0,
        negative: 0,
        neutral: 1,
      };
    }

    return {
      score: positive / (positive + negative) || 0.5,
      positive: positive / total,
      negative: negative / total,
      neutral: neutral / total,
    };
  }
}