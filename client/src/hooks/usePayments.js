import { useState } from 'react';
import { paymentApi } from '../api/payment.api';

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await paymentApi.create(paymentData);
      // Backend returns { success: true, data: {...} }
      return response?.data || response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPayment, loading, error };
};

