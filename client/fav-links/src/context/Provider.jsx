import AppContext from './Context';
import { useVerify } from '../hook/useVerify';

export function AppProvider({ children }) {
  const token = localStorage.getItem('token');

  const { logged, setLogged } = useVerify({ token });

  return (
    <AppContext.Provider value={{ logged, setLogged }}>
      {children}
    </AppContext.Provider>
  );
}
