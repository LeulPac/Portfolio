import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to add JWT Token & Visitor ID
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }
    config.headers['x-visitor-id'] = visitorId;

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
