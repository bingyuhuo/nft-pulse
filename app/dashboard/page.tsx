import { TrendChart } from '@/components/dashboard/trend-chart';
import { HeatRankingTable } from '@/components/dashboard/heat-ranking-table';
import { SentimentDisplay } from '@/components/dashboard/sentiment-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { BarChart2, Activity, TrendingUp } from 'lucide-react';

const mockTrendData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  value: Math.random() * 100,
}));

const mockProjects = Array.from({ length: 10 }, (_, i) => ({
  id: `project-${i}`,
  name: `Project ${i + 1}`,
  symbol: `PRJ${i + 1}`,
  heatScore: Math.random() * 100,
  change24h: (Math.random() - 0.5) * 20,
}));

const mockSentiment = {
  score: 0.75,
  positive: 0.65,
  neutral: 0.25,
  negative: 0.10,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Market Overview</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div id="predictions" className="scroll-mt-16 col-span-2 h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Market Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart data={mockTrendData} />
            </CardContent>
          </Card>
        </div>

        <div id="sentiment" className="scroll-mt-16 h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentDisplay sentiment={mockSentiment} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div id="rankings" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>NFT Project Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <HeatRankingTable projects={mockProjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}