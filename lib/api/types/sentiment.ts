export interface SentimentData {
  timestamp: Date;
  sentiment: number;
  volume: number;
}

export interface SentimentScore {
  score: number;
  positive: number;
  negative: number;
  neutral: number;
}