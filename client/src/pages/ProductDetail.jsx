import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = !product.is_available || (product.stock_quantity || 0) === 0;
  const maxQuantity = Math.min(product.stock_quantity || 0, 10);

  const handleAddToCart = () => {
    if (!isOutOfStock && quantity > 0) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-red-600 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.Category && (
                <span className="text-sm text-gray-500 mb-2 block">
                  {product.Category.name}
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <p className="text-3xl font-bold text-red-600 mb-6">
                ₹{parseFloat(product.price || 0).toFixed(2)}
              </p>

              {product.description && (
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Stock: <span className="font-semibold">{product.stock_quantity || 0}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Status:{' '}
                  <span className={`font-semibold ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Out of Stock' : 'Available'}
                  </span>
                </p>
              </div>

              {!isOutOfStock && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={maxQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(maxQuantity, Math.max(1, val)));
                      }}
                      className="w-20 text-center border border-gray-300 rounded-lg py-2"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition ${
                  isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

