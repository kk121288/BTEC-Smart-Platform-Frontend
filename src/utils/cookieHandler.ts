import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_DAYS = 7;

export const setAuthToken = (token: string): void => {
  Cookies.set(AUTH_TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    secure: import.meta.env.PROD, // Only use secure flag in production
    sameSite: 'strict',
  });
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY);
};
