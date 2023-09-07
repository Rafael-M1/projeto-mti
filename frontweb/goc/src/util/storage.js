const tokenKey = 'authData';

export const saveAuthData = (obj) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str);
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
