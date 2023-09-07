import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export const getTokenData = () => {
  try {
    return jwtDecode(getAuthData().access_token);
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = () => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles) => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenData.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }

  return false;
};
