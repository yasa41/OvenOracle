import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePayments } from '../hooks/usePayments';
import { orderApi } from '../api/order.api';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { createPayment, loading } = usePayments();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateCard = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (formData.cvv.length < 3) newErrors.cvv = 'CVV must be 3 digits';
    return newErrors;
  };

  const validateUPI = () => {
    const newErrors = {};
    if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
    else if (!formData.upiId.includes('@')) newErrors.upiId = 'Invalid UPI ID format';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (paymentMethod === 'card') {
      validationErrors = validateCard();
    } else if (paymentMethod === 'upi') {
      validationErrors = validateUPI();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Get all orders and find the one we need
      const ordersResponse = await orderApi.getAll();
      const orders = ordersResponse?.data || ordersResponse || [];
      const order = Array.isArray(orders)
        ? orders.find(o => o.id === parseInt(orderId))
        : null;
      
      if (!order) {
        throw new Error('Order not found');
      }
      
      const amount = parseFloat(order.total_amount || 0);

      // Create payment record
      const paymentData = {
        order_id: parseInt(orderId),
        payment_method: paymentMethod,
        amount: amount,
        status: 'paid',
      };

      await createPayment(paymentData);

      // Note: Order status update not available in backend API
      // Payment status is tracked separately in Payment model

      navigate(`/order-success?orderId=${orderId}`);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Order</h2>
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
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Payment</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Payment Method</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg transition ${
                  paymentMethod === 'card'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                <span className="text-sm font-semibold">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 border-2 rounded-lg transition ${
                  paymentMethod === 'upi'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Wallet className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                <span className="text-sm font-semibold">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border-2 rounded-lg transition ${
                  paymentMethod === 'cash'
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Banknote className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                <span className="text-sm font-semibold">Cash</span>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.cardName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        const formatted = value.length >= 2
                          ? `${value.slice(0, 2)}/${value.slice(2)}`
                          : value;
                        setFormData((prev) => ({ ...prev, expiryDate: formatted }));
                      }}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                        setFormData((prev) => ({ ...prev, cvv: value }));
                      }}
                      placeholder="123"
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.cvv ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  UPI ID *
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="yourname@paytm"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.upiId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.upiId && (
                  <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
                )}
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Banknote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  Payment will be collected on delivery
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : paymentMethod === 'cash' ? 'Confirm Order' : 'Pay Now'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            This is a demo payment interface. No real transactions will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;

