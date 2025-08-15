'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Users,
  Star,
  TrendingUp,
  Zap,
  Crown,
  Medal,
  Target,
  Flame
} from 'lucide-react';
import Navigation from './components/Navigation';

interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  eventsHosted: number;
  eventsAttended: number;
  rating: number;
  badge: string;
  trend: 'up' | 'down' | 'stable';
}

const mockRankings: RankingUser[] = [
  {
    id: '1',
    name: 'Neo Matrix',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    points: 15420,
    eventsHosted: 28,
    eventsAttended: 156,
    rating: 4.9,
    badge: 'Cyber Legend',
    trend: 'up'
  },
  {
    id: '2',
    name: 'Trinity Code',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    points: 14890,
    eventsHosted: 24,
    eventsAttended: 142,
    rating: 4.8,
    badge: 'Digital Master',
    trend: 'up'
  },
  {
    id: '3',
    name: 'Morpheus Prime',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    points: 13750,
    eventsHosted: 31,
    eventsAttended: 98,
    rating: 4.7,
    badge: 'Event Architect',
    trend: 'stable'
  },
  {
    id: '4',
    name: 'Agent Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    points: 12340,
    eventsHosted: 19,
    eventsAttended: 134,
    rating: 4.6,
    badge: 'Network Node',
    trend: 'down'
  },
  {
    id: '5',
    name: 'Cipher Ghost',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    points: 11890,
    eventsHosted: 22,
    eventsAttended: 87,
    rating: 4.5,
    badge: 'Data Phantom',
    trend: 'up'
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Move useEffect inside the component function
  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      fetch('/api/AWSSDK')
        .then(res => res.json())
        .then(data => console.log('X-Ray check:', data))
        .catch(err => console.error('API call failed:', err));
    }
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-[#FCEE09]" />;
      case 2: return <Medal className="w-6 h-6 text-[#B0B0B0]" />;
      case 3: return <div className="w-6 h-6 rounded-full bg-[#CD7F32] flex items-center justify-center text-white text-xs font-bold">3</div>;
      default: return <Target className="w-5 h-5 text-[#FF0080]" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <div className="w-4 h-4 text-[#8AFF00]">↗</div>;
      case 'down': return <div className="w-4 h-4 text-[#FF0080]">↘</div>;
      default: return <Zap className="w-4 h-4 text-[#00FFFF]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] circuit-pattern">
      <Navigation />

      <main className="container mx-auto px-4 py-8 bottom-nav-safe">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-['Orbitron'] font-bold mb-4">
            <span className="neon-text glitch-text" data-text="CYBER">CYBERJAYA</span>
            <span className="neon-text-cyan ml-4">RANKINGS</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg max-w-2xl">
            Track the most influential event creators and attendees in the digital realm.
            Climb the leaderboard and earn your place among the cyber elite.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="holographic-card cyberpunk-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#B0B0B0] text-sm">Total Events</p>
                  <p className="text-2xl font-bold neon-text">2,847</p>
                </div>
                <Calendar className="w-8 h-8 text-[#FF0080]" />
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card cyberpunk-glow-cyan">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#B0B0B0] text-sm">Active Users</p>
                  <p className="text-2xl font-bold neon-text-cyan">18,492</p>
                </div>
                <Users className="w-8 h-8 text-[#00FFFF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card cyberpunk-glow-green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#B0B0B0] text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold neon-text-green">4.7</p>
                </div>
                <Star className="w-8 h-8 text-[#8AFF00]" />
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#B0B0B0] text-sm">Growth</p>
                  <p className="text-2xl font-bold text-[#FCEE09]">+24%</p>
                </div>
                <Flame className="w-8 h-8 text-[#FCEE09]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-6">
          {(['week', 'month', 'year'] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod(period)}
              className={`cyberpunk-border ${selectedPeriod === period
                ? 'bg-[#FF0080] text-white cyberpunk-glow'
                : 'bg-transparent text-[#B0B0B0] hover:text-white'
                }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>

        {/* Rankings List */}
        <div className="space-y-4">
          {mockRankings.map((user, index) => (
            <Card key={user.id} className="holographic-card cyberpunk-border hover:cyberpunk-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1B1B1B] border border-[#FF0080]">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-16 h-16 border-2 border-[#00FFFF]">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#1B1B1B] text-[#00FFFF]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-['Orbitron'] font-semibold text-white">
                          {user.name}
                        </h3>
                        <Badge className="bg-[#FF0080] text-white border-0">
                          {user.badge}
                        </Badge>
                        {getTrendIcon(user.trend)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-[#B0B0B0]">Points</p>
                          <p className="font-semibold neon-text">{user.points.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0]">Events Hosted</p>
                          <p className="font-semibold text-[#8AFF00]">{user.eventsHosted}</p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0]">Events Attended</p>
                          <p className="font-semibold text-[#00FFFF]">{user.eventsAttended}</p>
                        </div>
                        <div>
                          <p className="text-[#B0B0B0]">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-[#FCEE09] fill-current" />
                            <p className="font-semibold text-[#FCEE09]">{user.rating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="hidden md:block w-32">
                    <p className="text-xs text-[#B0B0B0] mb-2">Progress to Next Level</p>
                    <Progress
                      value={(user.points % 1000) / 10}
                      className="h-2 bg-[#1B1B1B]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button className="cyberpunk-border bg-transparent text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0F0F0F] cyberpunk-glow-cyan">
            Load More Rankings
          </Button>
        </div>
      </main>
    </div>
  );
}