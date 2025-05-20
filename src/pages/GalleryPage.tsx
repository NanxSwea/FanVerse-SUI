import React from 'react';

export const GalleryPage: React.FC = () => {
  // Placeholder for NFT gallery
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Your NFT Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <p className="text-center text-slate-400">NFT Gallery Coming Soon</p>
        </div>
      </div>
    </div>
  );
};