import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PaymentModal } from './components/PaymentModal';
import { Footer } from './components/Footer';
import type { Service } from './types';
import { DENTAL_SERVICES } from './constants';

const App: React.FC = () => {
  const [selectedServiceForPayment, setSelectedServiceForPayment] = useState<Service | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  const handleOpenPaymentModal = (service: Service | null) => {
    setSelectedServiceForPayment(service);
    setIsPaymentModalOpen(true);
  };
  
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    // Optional: Reset service after a short delay to allow for closing animation
    setTimeout(() => setSelectedServiceForPayment(null), 300);
  };

  const handleScrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header onServicesClick={handleScrollToServices} onPayNowClick={() => handleOpenPaymentModal(null)} />
      <main className="flex-grow">
        <Hero onPayNowClick={() => handleOpenPaymentModal(null)} />
        <div ref={servicesSectionRef}>
          <ServicesSection services={DENTAL_SERVICES} onSelectService={handleOpenPaymentModal} />
        </div>
      </main>
      <Footer />
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        initialService={selectedServiceForPayment}
      />
    </div>
  );
};

export default App;
