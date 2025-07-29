// File: /api/create-payment-order.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

/**
 * This is a Vercel Serverless Function that acts as a secure backend.
 * It creates a payment order with Cashfree by using secret credentials
 * stored as Environment Variables on Vercel.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('API Function: Received request.');

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Read credentials and API URL from Vercel Environment Variables.
  const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
  const CASHFREE_API_URL = process.env.CASHFREE_API_URL || 'https://sandbox.cashfree.com/pg/orders';


  // Ensure server is configured correctly
  if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
    console.error('API Function: Server configuration error - API keys are not set.');
    return res.status(500).json({ message: 'Server configuration error: API keys are not set.' });
  }

  try {
    // Vercel automatically parses the JSON body for us
    const { name, email, phone, amount } = req.body;
    console.log('API Function: Processing payment for:', { name, email, phone, amount });

    // Basic validation
    if (!name || !email || !phone || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input. All fields are required and amount must be positive.' });
    }
    
    // Prepare the order payload for Cashfree
    const orderId = `ORDER_${Date.now()}`;
    const requestData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        // IMPORTANT: Update this with your frontend's domain once deployed.
        return_url: `https://shad-indol.vercel.app/status?order_id={order_id}`,
      },
      order_note: 'Dental service payment'
    };

    console.log('API Function: Making request to Cashfree at', CASHFREE_API_URL);
    // Make the secure, server-to-server call to Cashfree using axios
    const response = await axios.post(
      CASHFREE_API_URL, 
      requestData, 
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': CASHFREE_APP_ID,
          'x-secret-key': CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01',
        },
      }
    );

    // Success! Send the session ID back to the frontend.
    console.log('API Function: Successfully created payment session.');
    res.status(200).json({ payment_session_id: response.data.payment_session_id });

  } catch (error) {
    console.error('API Function: Full error object:', error);
    
    // Forward the specific error from Cashfree if available
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Function: Error from Cashfree:', error.response.data);
      return res.status(error.response.status).json(error.response.data);
    }
    
    // Otherwise, send a generic internal server error
    res.status(500).json({ message: 'An internal error occurred while creating the payment session.' });
  }
}
