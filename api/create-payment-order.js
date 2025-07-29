const axios = require('axios');

module.exports = async (req, res) => {
  console.log('API Function: Received request.');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // 👇 Log the incoming request body
  console.log('Request Body:', req.body);

  const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
  const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
  const CASHFREE_API_URL = process.env.CASHFREE_API_URL || 'https://sandbox.cashfree.com/pg/orders';

  if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
    return res.status(500).json({ message: 'Server configuration error: API keys are not set.' });
  }

  try {
    const { name, email, phone, amount } = req.body;

    if (!name || !email || !phone || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

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
        return_url: `https://shad-indol.vercel.app/status?order_id={order_id}`,
      },
      order_note: 'Dental service payment',
    };

    const response = await axios.post(CASHFREE_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': CASHFREE_APP_ID,
        'x-secret-key': CASHFREE_SECRET_KEY,
        'x-api-version': '2022-09-01',
      },
    });

    res.status(200).json({ payment_session_id: response.data.payment_session_id });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
