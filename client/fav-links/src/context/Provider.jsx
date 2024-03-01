import AppContext from './Context';

export function AppProvider({ children }) {
  const tokenJWT = false;

  return (
    <AppContext.Provider value={{ tokenJWT }}>{children}</AppContext.Provider>
  );
}
