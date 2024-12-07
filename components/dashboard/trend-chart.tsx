'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

interface TrendChartProps {
  data: Array<{
    timestamp: string;
    value: number;
  }>;
  isLoading?: boolean;
}

export function TrendChart({ data, isLoading }: TrendChartProps) {
  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-gray-800 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-[300px] bg-gray-800 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            stroke="#9CA3AF"
            fontSize={12}
            label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            label={{ value: 'Heat Score', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelFormatter={(label) => `Time: ${label}`}
            formatter={(value) => [`Score: ${Number(value).toFixed(2)}`, 'Heat Score']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}