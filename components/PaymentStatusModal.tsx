import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { PaymentStatus } from '../types';
import { PaymentStatusState } from '../types';

interface PaymentStatusModalProps {
  status: PaymentStatus;
  onClose: () => void;
}

export const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ status, onClose }) => {
  if (status.state === PaymentStatusState.IDLE) {
    return null;
  }

  const renderIcon = () => {
    switch (status.state) {
      case PaymentStatusState.SUCCESS:
        return <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />;
      case PaymentStatusState.ERROR:
        return <XCircleIcon className="h-16 w-16 text-red-500 mx-auto" />;
      case PaymentStatusState.PENDING:
         return <SpinnerIcon className="h-16 w-16 text-violet-400 mx-auto" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl text-center p-8 m-4 max-w-sm w-full transform transition-all border border-white/10">
        <div className="mb-4">
          {renderIcon()}
        </div>
        <h3 className="text-2xl font-bold text-white" id="modal-title">{status.title}</h3>
        <div className="mt-2">
          <p className="text-sm text-slate-300">{status.message}</p>
          {status.transactionId && (
            <p className="text-xs text-slate-400 mt-2 font-mono">
              TXN_ID: {status.transactionId}
            </p>
          )}
        </div>
        {status.state !== PaymentStatusState.PENDING && (
            <div className="mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-lg px-4 py-3 bg-violet-600 text-base font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 transform hover:scale-105"
                >
                    Close
                </button>
            </div>
        )}
      </div>
    </div>
  );
};