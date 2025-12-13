import { useState } from 'react';
import { orderApi } from '../api/order.api';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderApi.create(orderData);
      // Backend returns { success: true, data: {...} }
      return response?.data || response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id) => {
    try {
      setLoading(true);
      setError(null);
      // Backend doesn't have getById, so get all and filter
      const response = await orderApi.getAll();
      const orders = response?.data || response || [];
      const order = Array.isArray(orders)
        ? orders.find(o => o.id === parseInt(id))
        : null;
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      return order;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, getOrder, loading, error };
};

