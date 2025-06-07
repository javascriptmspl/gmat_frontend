// src/pages/PaymentSuccess.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      fetch(`http://38.242.230.126:5476/orders/confirm-payment/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log('✅ Payment confirmed:', data);
        })
        .catch(err => {
          console.error('❌ Payment confirmation failed:', err);
        });
    }
  }, [location]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for subscribing! 🎉</p>
    </div>
  );
};

export default PaymentSuccess;
