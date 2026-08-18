import axios from 'axios';

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/$/, '');

const baseURL = rawApiUrl
  ? (rawApiUrl.endsWith('/api/v1') ? rawApiUrl : `${rawApiUrl}/api/v1`)
  : '/api/v1';

if (import.meta.env.PROD && !rawApiUrl) {
  console.error('VITE_API_URL is not set. The Vercel frontend cannot reach the Render backend.');
}

const api = axios.create({
  baseURL,
  timeout: 60000,
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
