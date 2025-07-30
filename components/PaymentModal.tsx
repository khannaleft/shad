import React, { useState, useEffect, useCallback } from 'react';
import { DENTAL_SERVICES } from '../constants';
import type { Service, PatientDetails, PaymentStatus } from '../types';
import { PaymentStatusState } from '../types';
import { createPayuOrder } from '../services/payuService';
import { PaymentStatusModal } from './PaymentStatusModal';

declare global {
  interface Window {
    bolt: any;
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

  useEffect(() => {
    const scriptId = 'bolt-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js';
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
    if (!isLoading) onClose();
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
    setPaymentStatus({
      state: PaymentStatusState.PENDING,
      title: 'Redirecting to PayU',
      message: 'Please wait while we initiate the secure payment...'
    });

    try {
      const payload = {
        amount: amount.toString(),
        firstname: patientDetails.name,
        email: patientDetails.email,
        phone: patientDetails.phone,
        productinfo: 'Dental Service',
      };

      const data = await createPayuOrder(payload);

      const bolt = window.bolt;

      bolt.launch({
        key: data.key,
        txnid: data.txnid,
        amount: data.amount,
        firstname: data.firstname,
        email: data.email,
        phone: data.phone,
        productinfo: data.productinfo,
        surl: data.surl,
        furl: data.furl,
        hash: data.hash,
      }, {
        responseHandler: function (response: any) {
          setIsLoading(false);
          if (response.response.status === 'success') {
            setPaymentStatus({
              state: PaymentStatusState.SUCCESS,
              title: 'Payment Successful!',
              message: `Transaction ID: ${response.response.txnid}`,
              transactionId: response.response.txnid,
            });
          } else {
            setPaymentStatus({
              state: PaymentStatusState.ERROR,
              title: 'Payment Failed',
              message: response.response.error_Message || 'Payment was unsuccessful.',
            });
          }
        },
        catchException: function (e: any) {
          console.error('Bolt Exception:', e);
          setIsLoading(false);
          setPaymentStatus({
            state: PaymentStatusState.ERROR,
            title: 'Payment Error',
            message: 'Payment could not be completed. Please try again.'
          });
        }
      });

    } catch (error) {
      console.error("Payment Error:", error);
      setIsLoading(false);
      setPaymentStatus({
        state: PaymentStatusState.ERROR,
        title: 'Payment Error',
        message: 'Unable to initialize payment. Please try again.'
      });
    }
  };

  const closeStatusModal = useCallback(() => {
    const isSuccess = paymentStatus.state === PaymentStatusState.SUCCESS;
    setPaymentStatus({ state: PaymentStatusState.IDLE, title: '', message: '' });
    if (isSuccess) onClose();
  }, [paymentStatus.state, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <PaymentStatusModal status={paymentStatus} onClose={closeStatusModal} />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-40 transition-opacity"
        onClick={closeMainModal}>
        <div className="relative bg-slate-800/20 backdrop-blur-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl m-4 max-w-2xl w-full transform transition-all border border-white/10"
          onClick={e => e.stopPropagation()}>
          <button onClick={closeMainModal}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            aria-label="Close payment form">
            <CloseIcon className="h-6 w-6" />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Online Payment</h2>
              <p className="mt-4 text-lg text-slate-300">
                Complete the form below to pay for your service securely.
              </p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Input fields */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                <input type="text" name="name" required value={patientDetails.name} onChange={handleInputChange}
                  className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input type="email" name="email" required value={patientDetails.email} onChange={handleInputChange}
                  className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={patientDetails.phone} onChange={handleInputChange}
                  className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Select Service</label>
                <select name="service" value={selectedServiceId} onChange={handleServiceChange}
                  className="transition-colors block w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-lg">
                  <option value="">-- Choose a service --</option>
                  {DENTAL_SERVICES.map(s => (
                    <option key={s.id} value={s.id}>
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
                <label className="block text-sm font-medium text-slate-300 mb-1">Enter Custom Amount (₹)</label>
                <input type="text" name="customAmount" placeholder="e.g., 5000"
                  value={customAmount} onChange={handleCustomAmountChange}
                  className="transition-colors block w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white" />
              </div>

              <div className="text-center bg-slate-900/50 border border-slate-700 text-white p-4 rounded-xl">
                <p className="font-bold text-lg">Total Amount to Pay</p>
                <p className="font-black text-4xl mt-1 tracking-tight">₹{amount.toLocaleString('en-IN')}</p>
              </div>

              <div>
                <button type="submit" disabled={isLoading}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-violet-600 hover:bg-violet-500 disabled:bg-slate-500">
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
