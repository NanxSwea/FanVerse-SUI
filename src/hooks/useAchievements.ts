import { useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  sponsor: 'pyth' | 'wormhole' | 'navi' | 'dogcoin' | 'clamshell' | 'hexadrop';
  points: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'pyth_oracle',
    title: 'Price Oracle Master',
    description: 'Check SUI price 5 times',
    sponsor: 'pyth',
    points: 100
  },
  {
    id: 'wormhole_bridge',
    title: 'Bridge Explorer',
    description: 'View cross-chain NFTs',
    sponsor: 'wormhole',
    points: 150
  },
  {
    id: 'navi_collector',
    title: 'NFT Collector',
    description: 'Collect 3 different NFTs',
    sponsor: 'navi',
    points: 200
  },
  {
    id: 'dogcoin_friend',
    title: 'Doge Friend',
    description: 'Complete dog-themed quiz',
    sponsor: 'dogcoin',
    points: 100
  },
  {
    id: 'clamshell_master',
    title: 'Shell Master',
    description: 'Perfect score on any quiz',
    sponsor: 'clamshell',
    points: 300
  },
  {
    id: 'hexadrop_expert',
    title: 'Drop Expert',
    description: 'Unlock 5 NFTs',
    sponsor: 'hexadrop',
    points: 250
  }
];

export const useAchievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [latestAchievement, setLatestAchievement] = useState<Achievement | null>(null);

  const unlockAchievement = useCallback((achievementId: string) => {
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (achievement && !unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements(prev => [...prev, achievementId]);
      setLatestAchievement(achievement);
      setTimeout(() => setLatestAchievement(null), 3000);
    }
  }, [unlockedAchievements]);

  const getAchievement = useCallback((achievementId: string) => {
    return ACHIEVEMENTS.find(a => a.id === achievementId);
  }, []);

  const clearLatestAchievement = useCallback(() => {
    setLatestAchievement(null);
  }, []);

  return {
    unlockedAchievements,
    latestAchievement,
    unlockAchievement,
    getAchievement,
    clearLatestAchievement,
    allAchievements: ACHIEVEMENTS
  };
};