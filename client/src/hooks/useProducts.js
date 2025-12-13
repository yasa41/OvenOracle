import { useState, useEffect } from 'react';
import { productApi } from '../api/product.api';

export const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Backend doesn't have getByCategory, so get all and filter client-side
        const response = await productApi.getAll();
        let products = response?.data || response || [];
        
        // Filter by category if specified
        if (categoryId && Array.isArray(products)) {
          products = products.filter(p => p.category_id === parseInt(categoryId));
        }
        
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        // Backend doesn't have getById, so get all and filter
        const response = await productApi.getAll();
        const products = response?.data || response || [];
        const foundProduct = Array.isArray(products)
          ? products.find(p => p.id === parseInt(id))
          : null;
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

