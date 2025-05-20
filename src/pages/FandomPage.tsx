import React from 'react';
import { useNavigate } from 'react-router-dom';

const fandoms = [
  {
    id: 'dhoni',
    name: 'MS Dhoni',
    emoji: '🏏',
    color: 'bg-blue-500',
    description: 'Captain Cool of Indian Cricket'
  },
  {
    id: 'bts',
    name: 'BTS',
    emoji: '🎤',
    color: 'bg-purple-500',
    description: 'Global K-pop Sensation'
  },
  {
    id: 'messi',
    name: 'Messi',
    emoji: '⚽',
    color: 'bg-sky-500',
    description: 'Football Legend'
  },
  {
    id: 'taylor',
    name: 'Taylor Swift',
    emoji: '🎶',
    color: 'bg-red-500',
    description: 'Pop Music Icon'
  },
  {
    id: 'naruto',
    name: 'Naruto',
    emoji: '🍥',
    color: 'bg-orange-500',
    description: 'Ninja Way'
  }
];

export const FandomPage: React.FC = () => {
  const navigate = useNavigate();

  const selectFandom = (fandomId: string) => {
    // TODO: Mint NFT badge
    navigate(`/quiz/${fandomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Choose Your Fandom</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fandoms.map((fandom) => (
          <button
            key={fandom.id}
            onClick={() => selectFandom(fandom.id)}
            className={`${fandom.color} hover:opacity-90 transition-all duration-300 rounded-xl p-6 text-white shadow-lg transform hover:scale-105`}
          >
            <div className="text-4xl mb-3">{fandom.emoji}</div>
            <h3 className="text-xl font-bold mb-2">{fandom.name}</h3>
            <p className="text-sm opacity-90">{fandom.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};