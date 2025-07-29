import type { PatientDetails } from '../types';

/**
 * Creates a payment session by calling a secure backend endpoint.
 * This function sends patient and order details to your server, which then securely
 * communicates with the Cashfree API using your secret keys to generate a payment session.
 *
 * @param {PatientDetails} orderDetails - The details of the patient and the payment.
 * @returns {Promise<string>} A promise that resolves with the payment session ID from Cashfree.
 */
export const createPaymentSession = async (orderDetails: PatientDetails): Promise<string> => {
  console.log("Requesting payment session from backend for:", orderDetails);

  // This is the endpoint on YOUR backend server.
  // You must create this backend endpoint. It will receive the orderDetails,
  // then use your App ID (x-client-id) and Secret Key (x-secret-key) to call the Cashfree /orders API.
  const backendApiUrl = '/api/create-payment-order'; // <-- IMPORTANT: This should be your actual backend API endpoint.

  try {
    const response = await fetch(backendApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      // Try to parse error message from backend, otherwise use a generic one.
      const errorData = await response.json().catch(() => ({ message: 'Failed to create payment session. The server responded with an error.' }));
      throw new Error(errorData.message || `Server responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.payment_session_id) {
        throw new Error('Invalid response from server: payment_session_id not found.');
    }
    
    console.log("Received payment session ID from backend.");
    return data.payment_session_id;

  } catch (error) {
      console.error('Error creating payment session:', error);
      // Re-throw the error so it can be caught by the component and displayed to the user.
      throw error;
  }
};
