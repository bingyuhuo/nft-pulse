import Link from 'next/link';
import { ArrowRight,BarChart2, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* 顶部导航 */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">NFT Pulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/docs" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Documentation
              </Link>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero部分 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            NFT Market Analysis Platform
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Real-time NFT project analysis based on social media data to help you capture market trends
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* 特性展示 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/dashboard#rankings" className="block group">
            <Card className="h-full transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="h-6 w-6 text-purple-500 mr-2" />
                  Real-time Heat Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Track NFT projects' popularity on social media to discover potential opportunities
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard#sentiment" className="block group">
            <Card className="h-full transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-6 w-6 text-purple-500 mr-2" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Analyze community sentiment to gain market insights
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard#predictions" className="block group">
            <Card className="h-full transition-all duration-300 hover:bg-gray-800/70 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-purple-500 mr-2" />
                  Trend Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Predict project trends based on historical data and AI models
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300">
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}