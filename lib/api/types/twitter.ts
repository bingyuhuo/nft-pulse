export interface TwitterMetrics {
  followers: number;
  engagement: number;
  mentions: number;
}

export interface TwitterData {
  metrics: TwitterMetrics;
  sentiment: number;
}