import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import { useWallet } from '@suiet/wallet-kit';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  score: number;
  avatar: string;
  badges: number;
  fandom: string;
  walletAddress: string;
}

export const LeaderboardPage: React.FC = () => {
  const { address } = useWallet();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);

  // Simulated function to get username from wallet address
  const getUsernameFromAddress = (addr: string) => {
    const names = ['CryptoFan', 'BlockchainGuru', 'NFTCollector', 'WebThree', 'CoinMaster'];
    return names[Math.floor(Math.random() * names.length)] + '_' + addr.substring(0, 4);
  };

  // Initialize leaderboard with connected wallet
  useEffect(() => {
    if (address) {
      const userEntry = {
        id: address,
        rank: 1,
        username: getUsernameFromAddress(address),
        score: Math.floor(Math.random() * 1000) + 1000, // Random initial score
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
        badges: Math.floor(Math.random() * 5) + 1,
        fandom: 'Connected User',
        walletAddress: address
      };

      // Generate other entries
      const otherEntries = Array.from({ length: 9 }, (_, i) => ({
        id: `wallet-${i}`,
        rank: i + 2,
        username: `Player${i + 1}`,
        score: Math.floor(Math.random() * 1000) + 500,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
        badges: Math.floor(Math.random() * 5) + 1,
        fandom: ['Dhoni', 'BTS', 'Messi', 'Taylor', 'Naruto'][Math.floor(Math.random() * 5)],
        walletAddress: `0x${Math.random().toString(16).substring(2, 10)}`
      }));

      const allEntries = [userEntry, ...otherEntries]
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

      setLeaderboard(allEntries);
    }
  }, [address]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 60));
      
      if (timeLeft === 0) {
        setLeaderboard(prev => 
          prev.map(entry => ({
            ...entry,
            score: entry.score + Math.floor(Math.random() * 50)
          }))
          .sort((a, b) => b.score - a.score)
          .map((entry, index) => ({ ...entry, rank: index + 1 }))
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
                  entry.walletAddress === address
                    ? 'bg-indigo-500/20 border border-indigo-500/40'
                    : index === 0
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
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-white">{entry.username}</h3>
                    {entry.walletAddress === address && (
                      <span className="ml-2 text-xs bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
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
}