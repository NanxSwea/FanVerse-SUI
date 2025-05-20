import React from 'react';
import { GithubIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-800/30 border-t border-slate-700/50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-400 mb-3 sm:mb-0">
            © {new Date().getFullYear()} Sui Wallet Connect • Built with React & Suiet Wallet Kit
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/suiet/wallet-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://docs.sui.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Sui Docs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};