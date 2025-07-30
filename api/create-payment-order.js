// File: /api/create-payment-order.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

/**
 * This function generates the hash required for initiating a PayU Bolt.js payment.
 * Ensure you’ve set the required env vars: PAYU_KEY, PAYU_SALT.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('PayU API: Request received');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const PAYU_KEY = process.env.PAYU_KEY;
  const PAYU_SALT = process.env.PAYU_SALT;

  if (!PAYU_KEY || !PAYU_SALT) {
    return res.status(500).json({ message: 'Server configuration error: PAYU_KEY or PAYU_SALT is missing.' });
  }

  try {
    const { amount, firstname, email, phone, productinfo } = req.body;

    if (!amount || !firstname || !email || !phone || !productinfo) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const txnid = `TXN${Date.now()}`;
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';
    const udf6 = '';
    const udf7 = '';
    const udf8 = '';
    const udf9 = '';
    const udf10 = '';

    // Construct hash string based on PayU's format
    const hashString = [
      PAYU_KEY,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
