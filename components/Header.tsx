import React from 'react';
import { ToothIcon } from './icons/ToothIcon';

interface HeaderProps {
  onServicesClick: () => void;
  onPayNowClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onServicesClick, onPayNowClick }) => {
  return (
    <header className="bg-slate-900/40 backdrop-blur-lg sticky top-0 z-30 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <ToothIcon className="h-14 w-auto" />
          </div>
          <nav className="flex items-center space-x-6">
             <button onClick={onServicesClick} className="text-sm font-semibold text-slate-300 hover:text-violet-400 transition-colors duration-300">Services</button>
             <button onClick={onPayNowClick} className="text-sm font-semibold text-slate-300 hover:text-violet-400 transition-colors duration-300">Pay Online</button>
          </nav>
        </div>
      </div>
    </header>
  );
};
