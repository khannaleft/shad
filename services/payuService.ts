// src/services/payuService.ts

import { PaymentOrderRequest, PayUOrderResponse } from '../types/types';

export const createPayUOrder = async (
  paymentDetails: PaymentOrderRequest
): Promise<PayUOrderResponse> => {
  const response = await fetch('/api/create-payment-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentDetails),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create PayU order');
  }

  return await response.json();
};
