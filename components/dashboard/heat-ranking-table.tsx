'use client';

import { cn } from "@/lib/utils";
import { LoadingSpinner } from '@/components/shared/loading-spinner';

interface Project {
  id: string;
  name: string;
  symbol: string;
  heatScore: number;
  change24h: number;
}

interface HeatRankingTableProps {
  projects: Project[];
  isLoading?: boolean;
}

export function HeatRankingTable({ projects, isLoading }: HeatRankingTableProps) {
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-800 rounded-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Symbol
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Heat Score
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              24h Change
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {project.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {project.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-white">
                {project.heatScore.toFixed(2)}
              </td>
              <td className={cn(
                "px-6 py-4 whitespace-nowrap text-sm text-right",
                project.change24h >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {project.change24h >= 0 ? "+" : ""}{project.change24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}