import React, { useState, useEffect } from 'react';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { AlertTriangle, Wallet, PlugZap, Copy, CheckCircle } from 'lucide-react';
import { truncateAddress } from '../utils/address';

export const WalletSection: React.FC = () => {
  const { connected, connecting, address, error } = useWallet();
  const [isExtensionAvailable, setIsExtensionAvailable] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if any Sui wallet extension is available
    const checkExtension = () => {
      const hasWallet = typeof window !== 'undefined' && (
        // @ts-ignore - wallet properties might not be defined in types
        window.suiWallet ||
        window.sui ||
        window.martian ||
        window.suiet ||
        // Check for any property that includes 'sui' in its name
        Object.keys(window).some(key => 
          key.toLowerCase().includes('sui') && 
          typeof window[key as keyof Window] === 'object'
        )
      );
      setIsExtensionAvailable(!!hasWallet);
    };
    
    checkExtension();
    
    // Re-check when window is focused (in case user installs extension)
    window.addEventListener('focus', checkExtension);
    return () => window.removeEventListener('focus', checkExtension);
  }, []);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-md w-full bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg shadow-indigo-500/10 overflow-hidden transition-all duration-300">
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-600/20 flex items-center justify-center mb-4">
            <Wallet className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">Connect Your Sui Wallet</h1>
        <p className="text-slate-400 text-center mb-8">
          Securely connect to the Sui network via your wallet extension
        </p>
        
        {isExtensionAvailable === false && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-800 flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-300 mb-1">Wallet Extension Not Found</h3>
              <p className="text-red-200/70 text-sm">
                Please install the Sui Wallet extension to continue.
              </p>
              <a 
                href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-red-800/30 text-red-300 border border-red-700 hover:bg-red-800/50 transition-colors"
              >
                <PlugZap className="h-3 w-3 mr-1.5" />
                Install Extension
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-800">
            <h3 className="font-medium text-red-300 mb-1">Connection Error</h3>
            <p className="text-red-200/70 text-sm">{error.message}</p>
          </div>
        )}

        {connected && address ? (
          <div className="mb-8 space-y-4">
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400 mb-1.5">Connected Address</div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-indigo-300 text-sm truncate">
                  {address}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="ml-2 p-1.5 rounded-md hover:bg-slate-600/50 text-slate-400 hover:text-indigo-300 transition-colors"
                  title="Copy address"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <ConnectButton
              className="w-full !bg-rose-600 hover:!bg-rose-700 active:!bg-rose-800 !text-white !font-medium !rounded-lg !py-2.5 !px-4 !transition-colors"
              label="Disconnect Wallet"
            />
          </div>
        ) : (
          <div className="mb-8 flex justify-center">
            <ConnectButton
              className="!bg-indigo-600 hover:!bg-indigo-700 active:!bg-indigo-800 !text-white !font-medium !rounded-lg !py-2.5 !px-6 !transition-colors"
            />
          </div>
        )}
        
        {connecting && (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full mr-2"></div>
            <span className="text-indigo-300 text-sm">Connecting...</span>
          </div>
        )}
      </div>
    </div>
  );
};