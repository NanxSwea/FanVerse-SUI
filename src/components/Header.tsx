import React, { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { Wallet, Network, Trophy, Image, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { truncateAddress } from '../utils/address';
import { usePythPrice } from '../hooks/usePythPrice';
import { useAchievements } from '../hooks/useAchievements';

export const Header: React.FC = () => {
  const { address, connected, connecting, chain } = useWallet();
  const suiPrice = usePythPrice('Crypto.SUI/USD');
  const { unlockAchievement } = useAchievements();
  const [priceChecks, setPriceChecks] = useState(0);

  useEffect(() => {
    if (suiPrice) {
      setPriceChecks(prev => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          unlockAchievement('pyth_oracle');
        }
        return newCount;
      });
    }
  }, [suiPrice, unlockAchievement]);

  return (
    <header className="w-full bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <Wallet className="h-6 w-6 text-indigo-400 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                FanVerse
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-slate-300 hover:text-indigo-400 transition-colors">
                <Home className="h-5 w-5" />
              </Link>
              <Link to="/gallery" className="text-slate-300 hover:text-indigo-400 transition-colors">
                <Image className="h-5 w-5" />
              </Link>
              <Link to="/leaderboard" className="text-slate-300 hover:text-indigo-400 transition-colors">
                <Trophy className="h-5 w-5" />
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {suiPrice && (
              <div className="hidden sm:flex items-center text-sm bg-indigo-900/50 rounded-full px-3 py-1 border border-indigo-700">
                <span className="text-indigo-200">SUI: ${suiPrice.toFixed(2)}</span>
              </div>
            )}
            
            {chain && (
              <div className="hidden sm:flex items-center text-sm bg-indigo-900/50 rounded-full px-3 py-1 border border-indigo-700">
                <Network className="h-4 w-4 text-indigo-400 mr-1.5" />
                <span className="text-indigo-200">{chain.name}</span>
              </div>
            )}
            
            {connected && address ? (
              <div className="flex items-center text-sm bg-emerald-900/30 text-emerald-300 rounded-full px-3 py-1 border border-emerald-700/50">
                <span className="hidden sm:inline mr-1.5">Connected:</span> 
                <span className="font-mono">{truncateAddress(address)}</span>
              </div>
            ) : connecting ? (
              <div className="flex items-center text-sm bg-amber-900/30 text-amber-300 rounded-full px-3 py-1 border border-amber-700/50">
                <div className="animate-pulse mr-1.5 h-2 w-2 rounded-full bg-amber-400"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center text-sm bg-gray-800/50 text-gray-400 rounded-full px-3 py-1 border border-gray-700">
                <span>Not connected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};