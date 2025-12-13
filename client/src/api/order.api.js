import api from '../lib/axios';

export const orderApi = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  // Note: getById, update, delete not available in backend
};

