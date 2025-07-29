import React from 'react';
import type { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            We offer a comprehensive range of dental services to meet your needs.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.id} className="bg-slate-800/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-violet-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col group">
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700/50 mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                 <p className="mt-4 text-3xl font-black text-white">₹{service.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="p-6 pt-0">
                 <button 
                  onClick={() => onSelectService(service)}
                  className="w-full bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-violet-500 transition-all duration-300 transform group-hover:scale-105 shadow-md shadow-violet-900/50 group-hover:shadow-lg">
                  Select & Pay
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};