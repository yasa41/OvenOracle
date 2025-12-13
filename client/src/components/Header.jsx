import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-red-600">
            OvenOracle
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-red-600 transition">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-red-600 transition">
              Catalog
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <Link to="/cart" className="md:hidden relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

