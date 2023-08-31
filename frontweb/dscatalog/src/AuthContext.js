import { createContext } from 'react';

export const AuthContext = createContext({
  authContextData: {
    authenticated: false,
  },
  setAuthContextData: () => null,
});
