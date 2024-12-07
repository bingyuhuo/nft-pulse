interface HeatScoreFactors {
  followers: number;
  engagement: number;
  mentions: number;
  sentiment: number;
}

export function calculateHeatScore({
  followers,
  engagement,
  mentions,
  sentiment,
}: HeatScoreFactors): number {
  // Normalize values to 0-1 range
  const normalizedFollowers = Math.min(followers / 1000000, 1); // Cap at 1M followers
  const normalizedEngagement = Math.min(engagement / 100, 1); // Cap at 100% engagement
  const normalizedMentions = Math.min(mentions / 1000, 1); // Cap at 1000 mentions

  // Weighted sum of factors
  const weights = {
    followers: 0.3,
    engagement: 0.3,
    mentions: 0.2,
    sentiment: 0.2,
  };

  const score =
    normalizedFollowers * weights.followers +
    normalizedEngagement * weights.engagement +
    normalizedMentions * weights.mentions +
    sentiment * weights.sentiment;

  // Scale to 0-100 range
  return score * 100;
}