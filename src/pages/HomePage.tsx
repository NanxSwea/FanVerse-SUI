import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';

export const HomePage: React.FC = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (connected) {
      navigate('/fandom');
    }
  }, [connected, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Welcome to <span className="text-indigo-400">FanVerse</span>
      </h1>
      <p className="text-lg text-slate-300 mb-8 max-w-2xl">
        Join the ultimate Web3 fan community. Connect your wallet to start collecting
        exclusive NFTs and participate in fan challenges.
      </p>
      <ConnectButton
        className="!bg-indigo-600 hover:!bg-indigo-700 active:!bg-indigo-800 !text-white !font-medium !rounded-lg !py-3 !px-8 !text-lg !transition-colors"
      />
    </div>
  );
};