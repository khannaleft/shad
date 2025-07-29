import React from 'react';

interface HeroProps {
  onPayNowClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPayNowClick }) => {
  return (
    <section className="bg-transparent relative overflow-hidden">
       <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-900/50 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/50 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center relative z-10">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
          Your Smile, Our Passion
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg lg:text-xl text-slate-300">
          Experience exceptional dental care in a modern, comfortable environment. Pay for your services online with ease.
        </p>
        <div className="mt-10">
          <button
            onClick={onPayNowClick}
            className="bg-violet-600 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-violet-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/20"
          >
            Pay Your Bill Now
          </button>
        </div>
      </div>
    </section>
  );
};
