import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = !product.is_available || (product.stock_quantity || 0) === 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-red-600 transition">
            {product.name}
          </h3>
          {product.Category && (
            <p className="text-sm text-gray-500 mb-2">{product.Category.name}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600">
              ₹{parseFloat(product.price || 0).toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`p-2 rounded-full ${
                isOutOfStock
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } transition`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
          {product.stock_quantity !== undefined && (
            <p className="text-xs text-gray-500 mt-2">
              Stock: {product.stock_quantity}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

