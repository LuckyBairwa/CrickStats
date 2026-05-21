// src/api/axios.ts 😎🔥

import axios from 'axios';
const BASE_URL = 'http://10.74.230.248:5000/api';

const api = axios.create({
  baseURL: BASE_URL,

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
