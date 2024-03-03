import { parseJwt } from '../lib/utils';
import { useState } from 'react';
import AppContext from './Context';

export function AppProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user') ?? '');
  const [logged, setLogged] = useState(
    parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now()
  );

  return (
    <AppContext.Provider value={{ logged, setLogged, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
