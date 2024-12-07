export class TwitterDataProcessor {
  processTwitterData(tweets: any[], mentions: any[]) {
    const allText = [...tweets, ...mentions]
      .map(tweet => tweet.text)
      .join(' ');

    const engagement = this.calculateEngagement(tweets);
    
    return {
      text: allText,
      metrics: {
        engagement,
        totalTweets: tweets.length,
        totalMentions: mentions.length,
      },
    };
  }

  private calculateEngagement(tweets: any[]) {
    const totalEngagement = tweets.reduce((sum, tweet) => {
      const metrics = tweet.public_metrics ?? {};
      return sum + (
        (metrics.retweet_count ?? 0) +
        (metrics.reply_count ?? 0) +
        (metrics.like_count ?? 0) +
        (metrics.quote_count ?? 0)
      );
    }, 0);

    return tweets.length > 0 ? totalEngagement / tweets.length : 0;
  }
}