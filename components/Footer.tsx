import React from 'react';
import { ToothIcon } from './icons/ToothIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 text-slate-400 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center mb-6 md:mb-0">
            <ToothIcon className="h-16 w-auto" />
          </div>
          <div className="text-sm my-4 md:my-0">
            <p className="font-semibold text-slate-200">
              © {new Date().getFullYear()} Shade Dentistry. All rights reserved.
            </p>
            <a
              href="https://maps.app.goo.gl/x61MQeTvzKvdJYsy9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block hover:text-violet-400 transition-colors"
            >
                501 Sathyamoorthy Street, Nazarathpet, Chennai 600123
            </a>
          </div>
          <div className="flex space-x-5 mt-6 md:mt-0">
             <a href="#" className="hover:text-violet-400 hover:scale-110 transition-all duration-300">Facebook</a>
             <a href="#" className="hover:text-violet-400 hover:scale-110 transition-all duration-300">Twitter</a>
             <a href="#" className="hover:text-violet-400 hover:scale-110 transition-all duration-300">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};