import api from './axios';



export const getDashboard = async () => {
  const res = await api.get('/dashboard');

  return res.data;
};

// 😎 Top Performers
export const getTopPerformers = async () => {
  const res = await api.get('/dashboard/top-performers');

  return res.data;
};
