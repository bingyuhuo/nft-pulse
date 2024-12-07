import { Tweet } from 'twitter-api-v2';

export function calculateEngagementMetrics(tweets: Tweet[]) {
  const totalEngagement = tweets.reduce((sum, tweet) => {
    const metrics = tweet.public_metrics ?? {};
    return sum + (
      (metrics.retweet_count ?? 0) +
      (metrics.reply_count ?? 0) +
      (metrics.like_count ?? 0) +
      (metrics.quote_count ?? 0)
    );
  }, 0);

  return {
    engagement: tweets.length > 0 ? totalEngagement / tweets.length : 0,
    totalTweets: tweets.length,
  };
}