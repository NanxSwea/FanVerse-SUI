import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Droplet, Bell as Shell, Dog } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  sponsor: 'pyth' | 'wormhole' | 'navi' | 'dogcoin' | 'clamshell' | 'hexadrop';
  points: number;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const sponsorIcons = {
  pyth: Trophy,
  wormhole: Award,
  navi: Shell,
  dogcoin: Dog,
  clamshell: Shell,
  hexadrop: Droplet,
};

export const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onClose }) => {
  if (!achievement) return null;

  const Icon = sponsorIcons[achievement.sponsor];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="glass-card rounded-2xl overflow-hidden shadow-xl shadow-purple-500/20 border border-purple-500/20">
          <div className="p-6 flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br
              ${achievement.sponsor === 'pyth' ? 'from-orange-500/20 to-red-500/20 text-orange-400' : ''}
              ${achievement.sponsor === 'wormhole' ? 'from-purple-500/20 to-pink-500/20 text-purple-400' : ''}
              ${achievement.sponsor === 'navi' ? 'from-blue-500/20 to-cyan-500/20 text-blue-400' : ''}
              ${achievement.sponsor === 'dogcoin' ? 'from-yellow-500/20 to-amber-500/20 text-yellow-400' : ''}
              ${achievement.sponsor === 'clamshell' ? 'from-teal-500/20 to-emerald-500/20 text-teal-400' : ''}
              ${achievement.sponsor === 'hexadrop' ? 'from-indigo-500/20 to-blue-500/20 text-indigo-400' : ''}
            `}>
              <Icon className="h-6 w-6" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-slate-300">
                {achievement.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                +{achievement.points}
              </div>
              <div className="text-xs text-slate-400">points</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};