import { z } from 'zod';

export const trackProjectSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  twitterHandle: z.string().optional(),
  redditCommunity: z.string().optional(),
  discordServer: z.string().optional(),
});

export type TrackProjectInput = z.infer<typeof trackProjectSchema>;