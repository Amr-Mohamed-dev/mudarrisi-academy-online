import Cookies from 'js-cookie';



const AUTH_COOKIE_NAME = import.meta.env.VITE_AUTH_COOKIE_NAME || 'teachers_auth_token';
const AUTH_COOKIE_EXPIRES_DAYS = parseInt(import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || '7', 10);

/**
 * Get authentication token from cookies
 */
const getToken = () => Cookies.get(AUTH_COOKIE_NAME);

/**
 * Check if user is authenticated by verifying token existence
 */
const isAuthenticated = () => Boolean(Cookies.get(AUTH_COOKIE_NAME));

/**
 * Remove authentication token from cookies
 * Attempts multiple removal strategies to ensure the cookie is fully cleared
 * across different paths and domains
 */
const removeToken = () => {
  // Standard removal
  Cookies.remove(AUTH_COOKIE_NAME);

  // Remove with explicit path options
  Cookies.remove(AUTH_COOKIE_NAME, { path: '/' });

  // Remove with domain options (for cross-subdomain cookies)
  const domain = window.location.hostname;
  if (domain !== 'localhost' && domain !== '127.0.0.1') {
    // Try removing with domain
    Cookies.remove(AUTH_COOKIE_NAME, { domain });

    // Try removing with root domain for subdomains
    const rootDomain = domain.split('.').slice(-2).join('.');
    if (rootDomain !== domain) {
      Cookies.remove(AUTH_COOKIE_NAME, { domain: rootDomain });
    }
  }

  // Overwrite with empty value before expiring (extra security)
  Cookies.set(AUTH_COOKIE_NAME, '', { expires: new Date(0) });

};

/**
 * Set authentication token in cookies
 */
const setCookie = (key: string, value: string) =>
  Cookies.set(key, value, {
    expires: AUTH_COOKIE_EXPIRES_DAYS,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    path: '/',
  });
const token = getToken();

export {

  getToken,
  isAuthenticated,
  removeToken,
  setCookie,
  token,
  AUTH_COOKIE_NAME,

};
