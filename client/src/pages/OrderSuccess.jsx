import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import { orderApi } from '../api/order.api';
import { paymentApi } from '../api/payment.api';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Get all orders and find the one we need
        const ordersResponse = await orderApi.getAll();
        const orders = ordersResponse?.data || ordersResponse || [];
        const orderData = Array.isArray(orders) 
          ? orders.find(o => o.id === parseInt(orderId))
          : null;
        
        if (orderData) {
          setOrder(orderData);
        } else {
          // If order not found, create a minimal order object
          setOrder({ id: orderId, total_amount: 0, status: 'pending' });
        }

        // Try to get payment info
        try {
          const paymentsResponse = await paymentApi.getAll();
          const payments = paymentsResponse?.data || paymentsResponse || [];
          const orderPayment = Array.isArray(payments)
            ? payments.find(p => p.order_id === parseInt(orderId))
            : null;
          if (orderPayment) {
            setPayment(orderPayment);
          }
        } catch (err) {
          console.error('Payment fetch error:', err);
        }
      } catch (error) {
        console.error('Order fetch error:', error);
        // Set minimal order data even on error
        setOrder({ id: orderId, total_amount: 0, status: 'pending' });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We'll start preparing it right away.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Order ID:</span>
              </div>
              <span className="text-lg font-bold text-red-600">#{order.id}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-gray-800">
                  ₹{parseFloat(order.total_amount || 0).toFixed(2)}
                </span>
              </div>

              {payment && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold text-gray-800 capitalize">
                      {payment.payment_method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`font-semibold ${
                      payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Order Status:</span>
                <span className={`font-semibold capitalize ${
                  order.status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.status || 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => navigate('/catalog')}
              className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              <Package className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

