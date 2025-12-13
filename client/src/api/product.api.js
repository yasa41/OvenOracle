import api from '../lib/axios';

export const productApi = {
  getAll: () => api.get('/products'),
  // Note: getById not available in backend - filter client-side
  // create, update, delete not used in frontend
};

