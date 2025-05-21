import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Award, Star } from 'lucide-react';

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  fandom: string;
  description: string;
  attributes: {
    name: string;
    value: string;
  }[];
}

const mockNFTs: NFT[] = [
  {
    id: '1',
    name: 'Captain\'s Trophy',
    image: 'https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=600',
    rarity: 'Legendary',
    fandom: 'Dhoni',
    description: "Commemorative NFT celebrating MS Dhoni's World Cup victory",
    attributes: [
      { name: 'Year', value: '2011' },
      { name: 'Tournament', value: 'World Cup' },
      { name: 'Edition', value: '1 of 100' }
    ]
  },
  {
    id: '2',
    name: 'Dynamite Moment',
    image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=600',
    rarity: 'Epic',
    fandom: 'BTS',
    description: 'Special edition BTS Dynamite performance NFT',
    attributes: [
      { name: 'Era', value: 'Dynamite' },
      { name: 'Type', value: 'Performance' },
      { name: 'Edition', value: '1 of 500' }
    ]
  },
  {
    id: '3',
    name: 'Golden Boot',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=600',
    rarity: 'Rare',
    fandom: 'Messi',
    description: 'Messi's record-breaking goal scoring achievement',
    attributes: [
      { name: 'Season', value: '2022/23' },
      { name: 'Goals', value: '35' },
      { name: 'Edition', value: '1 of 1000' }
    ]
  }
];

const rarityColors = {
  Common: 'from-slate-400 to-slate-500',
  Rare: 'from-blue-400 to-indigo-500',
  Epic: 'from-purple-400 to-pink-500',
  Legendary: 'from-yellow-400 to-orange-500'
};

export const GalleryPage: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Your NFT Collection
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-xl glass-card">
              <Image className="h-5 w-5 text-indigo-400" />
              <span className="text-white font-medium">{mockNFTs.length} NFTs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="relative h-64">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${rarityColors[nft.rarity]} text-white`}>
                    {nft.rarity}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{nft.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-indigo-400" />
                    <span className="text-sm text-slate-300">{nft.fandom} Collection</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">{nft.attributes[2].value}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NFT Detail Modal */}
        {selectedNFT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedNFT(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card rounded-3xl overflow-hidden max-w-2xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-96">
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedNFT.name}</h2>
                  <div className={`px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${rarityColors[selectedNFT.rarity]} text-white`}>
                    {selectedNFT.rarity}
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">{selectedNFT.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {selectedNFT.attributes.map((attr, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-xl p-4">
                      <div className="text-sm text-slate-400 mb-1">{attr.name}</div>
                      <div className="text-lg font-medium text-white">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};