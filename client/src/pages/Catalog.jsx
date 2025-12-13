import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts(
    selectedCategory ? parseInt(selectedCategory) : null
  );

  const handleCategoryChange = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Our Catalog
        </h1>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !selectedCategory
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
            {categoriesLoading ? (
              <div className="text-gray-500">Loading categories...</div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === String(category.id)
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading products...</div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;

