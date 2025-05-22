import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fandoms = [
  {
    id: 'dhoni',
    name: 'MS Dhoni',
    emoji: '🏏',
    color: 'from-blue-500/20 to-blue-600/20',
    description: 'Captain Cool of Indian Cricket',
    image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'bts',
    name: 'BTS',
    emoji: '🎤',
    color: 'from-purple-500/20 to-purple-600/20',
    description: 'Global K-pop Sensation',
    image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'messi',
    name: 'Messi',
    emoji: '⚽',
    color: 'from-sky-500/20 to-sky-600/20',
    description: 'Football Legend',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'taylor',
    name: 'Taylor Swift',
    emoji: '🎶',
    color: 'from-red-500/20 to-red-600/20',
    description: 'Pop Music Icon',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'naruto',
    name: 'Naruto',
    emoji: '🍥',
    color: 'from-orange-500/20 to-orange-600/20',
    description: 'Ninja Way',
    image: 'https://images.pexels.com/photos/6633920/pexels-photo-6633920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const FandomPage: React.FC = () => {
  const navigate = useNavigate();

  const selectFandom = (fandomId: string) => {
    navigate(`/quiz/${fandomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
      >
        Choose Your Fandom
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-slate-300 mb-12 max-w-2xl mx-auto"
      >
        Select your favorite fandom to collect unique NFTs and compete in challenges
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fandoms.map((fandom, index) => (
          <motion.div
            key={fandom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => selectFandom(fandom.id)}
              className="w-full group"
            >
              <div className={`glass-card nft-glow rounded-2xl overflow-hidden transition-all duration-500 transform group-hover:scale-[1.02] relative`}>
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${fandom.color} mix-blend-overlay`} />
                  <img 
                    src={fandom.image} 
                    alt={fandom.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{fandom.name}</h3>
                    <span className="text-2xl">{fandom.emoji}</span>
                  </div>
                  <p className="text-sm text-slate-300">{fandom.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Rare NFT Collection</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white">
                      Join Now
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};