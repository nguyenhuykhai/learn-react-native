import axios from 'axios';

const api = axios.create({
  baseURL: 'https://66755190a8d2b4d072ef8980.mockapi.io',
});
export const BASE_URL = 'https://66755190a8d2b4d072ef8980.mockapi.io';
export const getCategories = () => api.get('/Categories');
export const getOrchids = (categoryId) => api.get(`/Categories/${categoryId}/items`);
export const updateOrchid = (categoryId, orchidId, data) => api.put(`/Categories/${categoryId}/items/${orchidId}`, data);
