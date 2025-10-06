import axios from 'axios';
import { getToken, removeToken } from '../utils';

// Function to handle token removal and store reset
let isAlreadyFetchingAccessToken = false;
// Define a proper type for subscribers
type SubscriberCallback = () => void;
let subscribers: SubscriberCallback[] = [];

// Backend API base URL - matching server structure
const baseURL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/v1`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Browser sets it
  }

  config.headers['X-Request-ID'] = `${config.method}-${config.url}-${Date.now()}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for network connectivity issues first
    const isNetworkError = !error.response && (error.code === 'NETWORK_ERROR' || error.message === 'Network Error');
    const isTimeoutError = error.code === 'ECONNABORTED' || error.message.includes('timeout');
    const isConnectionRefused = error.code === 'ERR_NETWORK' || error.message.includes('ERR_NETWORK');

    if (isNetworkError || isTimeoutError || isConnectionRefused) {
      console.warn('Network/connectivity issue in api interceptor:', error);
      // Let the useAxios interceptor handle the redirect - just pass through
      return Promise.reject(error);
    }

    // If the error is due to an invalid/expired token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Only handle the token error once to prevent infinite loops
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;

        // Clear the token
        removeToken();

        // Set auth state in localStorage to trigger logout
        localStorage.setItem('teachers-auth', 'logged_out');

        // Reset the flag after a delay
        setTimeout(() => {
          isAlreadyFetchingAccessToken = false;
          subscribers = [];

          // Redirect to login page
          window.location.href = '/auth/login';
        }, 1000);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
