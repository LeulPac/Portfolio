const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event('auth:logout'));
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload?.exp) return false;
    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

export const redirectToAdminLogin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const isLoginPage = window.location.pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage) {
    window.location.replace('/admin/login');
  }
};
