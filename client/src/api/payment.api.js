import api from '../lib/axios';

export const paymentApi = {
  getAll: () => api.get('/payments'),
  create: (data) => api.post('/payments', data),
  // Note: getById, update, delete, getByOrder not available in backend
};

