//import { parseJwt } from '../lib/utils';
import { useEffect, useState } from 'react';
import AppContext from './Context';
import { verifyUser } from '../lib/data';

export function AppProvider({ children }) {
  const token = localStorage.getItem('token');
  const [logged, setLogged] = useState();

  useEffect(() => {
    if (!token) {
      setLogged(false);
    } else {
      const log = verifyUser({ token });

      setLogged(log);
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ logged, setLogged }}>
      {children}
    </AppContext.Provider>
  );
}
