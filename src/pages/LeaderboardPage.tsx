import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  score: number;
  avatar: string;
  badges: number;
  fandom: string;
}

// Simulated leaderboard data - replace with real data from your backend
const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    username: 'CricketMaster',
    score: 2500,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    badges: 5,
    fandom: 'Dhoni'
  },
  {
    id: '2',
    rank: 2,
    username: 'BTSArmy2023',
    score: 2350,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    badges: 4,
    fandom: 'BTS'
  },
  {
    id: '3',
    rank: 3,
    username: 'MessiGoat',
    score: 2200,
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
    badges: 4,
    fandom: 'Messi'
  },
  {
    id: '4',
    rank: 4,
    username: 'SwiftieForever',
    score: 2100,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    badges: 3,
    fandom: 'Taylor'
  },
  {
    id: '5',
    rank: 5,
    username: 'NarutoUzumaki',
    score: 2000,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    badges: 3,
    fandom: 'Naruto'
  }
];

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 60));
      
      if (timeLeft === 0) {
        // Simulate leaderboard update
        setLeaderboard(prev => 
          prev.map(entry => ({
            ...entry,
            score: entry.score + Math.floor(Math.random() * 50)
          })).sort((a, b) => b.score - a.score)
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            Global Leaderboard
          </h1>
          <div className="text-sm text-slate-400">
            Next update in: {timeLeft}s
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="p-6">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-4 rounded-xl mb-4 ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/20'
                    : index === 1
                    ? 'bg-gradient-to-r from-slate-400/20 to-slate-500/20 border border-slate-400/20'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-700/20 to-orange-800/20 border border-orange-700/20'
                    : 'bg-slate-800/20 border border-slate-700/20'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12">
                  {index === 0 ? (
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  ) : index === 1 ? (
                    <Medal className="h-6 w-6 text-slate-400" />
                  ) : index === 2 ? (
                    <Medal className="h-6 w-6 text-orange-700" />
                  ) : (
                    <div className="text-xl font-bold text-slate-500">{entry.rank}</div>
                  )}
                </div>

                <div className="relative w-12 h-12 rounded-full overflow-hidden mx-4">
                  <img
                    src={entry.avatar}
                    alt={entry.username}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{entry.username}</h3>
                  <div className="flex items-center text-sm">
                    <span className="text-slate-400 mr-2">{entry.fandom} Fan</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-yellow-400">{entry.badges}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};