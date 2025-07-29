import React, { useState, useEffect, useCallback } from 'react';
import { DENTAL_SERVICES } from '../constants';
import type { Service, PatientDetails, PaymentStatus } from '../types';
import { PaymentStatusState } from '../types';
import { createPaymentSession } from '../services/cashfreeService';
import { PaymentStatusModal } from './PaymentStatusModal';

// This satisfies TypeScript for the Cashfree SDK loaded from the script tag.
declare global {
  interface Window {
    cashfree: any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: Service | null;
}

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
  

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialService }) => {
  const [patientDetails, setPatientDetails] = useState<Omit<PatientDetails, 'amount' | 'serviceId'>>({
    name: '',
    email: '',
    phone: '',
  });
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({ state: PaymentStatusState.IDLE, title: '', message: '' });

  const service = DENTAL_SERVICES.find(s => s.id === selectedServiceId);
  const amount = service ? service.price : (Number(customAmount) || 0);

  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
      setCustomAmount('');
    } else {
      setSelectedServiceId('');
    }
  }, [initialService, isOpen]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceId(e.target.value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
        setCustomAmount(value);
        setSelectedServiceId('');
    }
  };
  
  const closeMainModal = () => {
    if (!isLoading) {
      onClose();
    }
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || !patientDetails.name || !patientDetails.email || !patientDetails.phone) {
        setPaymentStatus({
            state: PaymentStatusState.ERROR,
            title: 'Validation Error',
            message: 'Please fill all fields and ensure the amount is greater than zero.'
        });
        return;
    }

    setIsLoading(true);
    setPaymentStatus({ state: PaymentStatusState.PENDING, title: 'Processing Payment', message: 'Initializing secure payment gateway...'});

    const orderDetails: PatientDetails = {
      ...patientDetails,
      serviceId: selectedServiceId,
      amount: amount,
    };
    
    try {
        const sessionId = await createPaymentSession(orderDetails);
        const cashfree = new window.cashfree(sessionId);

        cashfree.pay({
            mode: 'modal',
            onSuccess: (data: any) => {
                setIsLoading(false);
                setPaymentStatus({
                    state: PaymentStatusState.SUCCESS,
                    title: 'Payment Successful!',
                    message: `Your payment has been processed successfully.`,
                    transactionId: data.transaction.transactionId
                });
            },
            onFailure: (data: any) => {
                setIsLoading(false);
                setPaymentStatus({
                    state: PaymentStatusState.ERROR,
                    title: 'Payment Failed',
                    message: data.transaction.txMsg || 'The payment could not be completed. Please try again or contact support.'
                });
            },
        });
    } catch (error) {
        console.error("Payment initiation failed:", error); // Log the full error object
        setIsLoading(false);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
        setPaymentStatus({
            state: PaymentStatusState.ERROR,
            title: 'Payment Error',
            message: `Could not connect to the payment service. ${errorMessage} Please check the browser console (F12) for more details.`
        });
    }
  };
  
  const closeStatusModal = useCallback(() => {
    const isSuccess = paymentStatus.state === PaymentStatusState.SUCCESS;
    setPaymentStatus({ state: PaymentStatusState.IDLE, title: '', message: '' });
    if(isSuccess) {
        onClose();
    }
  }, [paymentStatus.state, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <PaymentStatusModal status={paymentStatus} onClose={closeStatusModal} />
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-40 transition-opacity" 
        aria-labelledby="payment-modal-title" role="dialog" aria-modal="true"
        onClick={closeMainModal}
      >
        <div 
          className="relative bg-slate-800/20 backdrop-blur-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl m-4 max-w-2xl w-full transform transition-all border border-white/10"
          onClick={e => e.stopPropagation()}
        >
           <button 
             onClick={closeMainModal} 
             className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
             aria-label="Close payment form"
           >
               <CloseIcon className="h-6 w-6"/>
           </button>
           
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 id="payment-modal-title" className="text-3xl font-extrabold text-white tracking-tight">Online Payment</h2>
              <p className="mt-4 text-lg text-slate-300">
                Complete the form below to pay for your service securely.
              </p>
            </div>
            <form onSubmit={handlePayment} className="space-y-6">
               <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                  <input type="text" name="name" id="name" required value={patientDetails.name} onChange={handleInputChange} className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input type="email" name="email" id="email" required value={patientDetails.email} onChange={handleInputChange} className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                  <input type="tel" name="phone" id="phone" required value={patientDetails.phone} onChange={handleInputChange} className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-1">Select Service</label>
                  <select id="service" name="service" value={selectedServiceId} onChange={handleServiceChange} className="transition-colors block w-full px-4 py-3 bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-lg text-white">
                    <option value="" className="bg-slate-900">-- Choose a service --</option>
                    {DENTAL_SERVICES.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900">
                            {s.name} - ₹{s.price.toLocaleString('en-IN')}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-600" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-slate-800 px-3 text-sm text-slate-400">OR</span>
                    </div>
                </div>

                <div>
                  <label htmlFor="customAmount" className="block text-sm font-medium text-slate-300 mb-1">Enter Custom Amount (₹)</label>
                  <input type="text" name="customAmount" id="customAmount" placeholder="e.g., 5000" value={customAmount} onChange={handleCustomAmountChange} className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-white" />
                </div>

                <div className="text-center bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl">
                    <p className="font-bold text-lg">Total Amount to Pay</p>
                    <p className="font-black text-4xl mt-1 tracking-tight">₹{amount.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <button type="submit" disabled={isLoading} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-violet-600 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
                    {isLoading ? 'Processing...' : 'Pay Securely'}
                  </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
