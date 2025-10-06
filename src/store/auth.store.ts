import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { AuthState } from '../types';
import { ENDPOINTS } from '../config/endpoints';
import { AUTH_COOKIE_NAME, getToken, removeToken, setCookie } from '../utils';

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,

      login: async (credentials) => {
        set({ error: null, isLoading: true });

        try {
          const response = await ENDPOINTS.auth.login(credentials);
          const { token, user } = response.data.data;

          setCookie(AUTH_COOKIE_NAME, token);
          set({
            user,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw err; // Let caller handle if needed
        }
      },

      register: async (credentials) => {
        set({ error: null, isLoading: true });
        try {
          const response = await ENDPOINTS.auth.register(credentials);
          const { user, token } = response.data.data;
          setCookie(AUTH_COOKIE_NAME, token);
          set({
            user,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
        } catch (err: any) {
          set({
            error: err?.response?.data?.message || 'Registration failed',
          });
          throw err;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          // Try to call logout endpoint if available
          // If token is invalid or expired, this will fail silently
          if (getToken()) {
            await ENDPOINTS.auth.logout().then(() => window.location.reload());
          }
          // Signal to other tabs that logout occurred
          localStorage.setItem('phonzone-auth', 'logged_out');

          // First remove the token to ensure cookie is cleared
          removeToken();

          // Clear persisted state in localStorage
          localStorage.removeItem(import.meta.env.VITE_STORAGE_NAME + '-auth');

          // Clear any other auth-related data
          sessionStorage.removeItem('user-session');

          // Then update the state
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
        } catch (error) {
          console.error('Logout process failed:', error);
          // Ensure state is reset even if something fails
          removeToken();
          localStorage.removeItem(import.meta.env.VITE_STORAGE_NAME + '-auth');
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
        }
      },

      fetchProfile: async () => {
        set({ isLoading: true });
        const token = getToken();
        if (!token) {
          // If no token is found, log the user out
          set({
            error: 'No token found',
            user: null,
            isAuthenticated: false, // Set to false to trigger logout
            isLoading: false,
          });

          return null;
        }

        try {
          const response = await ENDPOINTS.auth.me();
          const userData = response.data.data;
          set({
            user: userData,
            isAuthenticated: true,
            error: null,
            isLoading: false,
          });
          return userData;
        } catch (err: any) {
          // Check if it's an authentication error (401 or 403)
          const isAuthError = err?.response?.status === 401 || err?.response?.status === 403;

          set({
            error: err?.response?.data?.message || 'Failed to fetch profile',
            // Set isAuthenticated to false only for auth errors
            isAuthenticated: isAuthError ? false : undefined,
            // Clear user data for auth errors
            user: isAuthError ? null : undefined,
            isLoading: false,
          });

          // Show message for auth errors
          if (isAuthError) {
            removeToken();
          }

          return null;
        }
      },
    }),
    {
      name: import.meta.env.VITE_STORAGE_NAME + '-auth',
    }
  )
);
