import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import PrivateNavBar from '../components/PrivateNavBar';

export function Router2() {
  return (
    <>
      <PrivateNavBar />
      <Routes>
        <Route
          path='/home'
          element={<Home />}
        />
      </Routes>
    </>
  );
}
