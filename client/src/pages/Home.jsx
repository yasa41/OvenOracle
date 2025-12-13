import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();
  
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                We Make Your Celebration Delicious!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Freshly baked goods made with love and the finest ingredients. 
                From artisan breads to decadent cakes, we bring bakery perfection to your table.
              </p>
              <Link
                to="/catalog"
                className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Order Now
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop"
                  alt="Berry Pie"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop"
                  alt="Strawberry Cake"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Categories
          </h2>
          {categoriesLoading ? (
            <div className="text-center py-12">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          {productsLoading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No products available
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/catalog"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            We Guarantee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍰</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellent Taste</h3>
              <p className="text-gray-600 text-sm">
                Every bite is a delight with our premium recipes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Ingredients</h3>
              <p className="text-gray-600 text-sm">
                Only the finest, freshest ingredients in every product
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🍳</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Artisan Craftsmanship</h3>
              <p className="text-gray-600 text-sm">
                Handcrafted with care by skilled bakers
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Fresh products delivered quickly to your door
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

