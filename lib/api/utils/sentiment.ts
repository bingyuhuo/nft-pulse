export class SentimentAnalyzer {
  private positiveWords = new Set([
    'bullish', 'moon', 'gem', 'profit', 'gain', 'up',
    'good', 'great', 'amazing', 'excellent', 'wonderful',
  ]);

  private negativeWords = new Set([
    'bearish', 'dump', 'scam', 'loss', 'down', 'bad',
    'terrible', 'awful', 'poor', 'worst', 'hate',
  ]);

  analyzeSentiment(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let positive = 0;
    let negative = 0;

    for (const word of words) {
      if (this.positiveWords.has(word)) positive++;
      if (this.negativeWords.has(word)) negative++;
    }

    const total = positive + negative;
    if (total === 0) return 0.5; // Neutral

    return positive / total;
  }
}