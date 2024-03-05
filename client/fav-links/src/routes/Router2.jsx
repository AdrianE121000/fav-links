import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { PrivateNavBar } from '../components/PrivateNavBar';
import AddLinks from '../components/AddLinks';

export function Router2() {
  return (
    <>
      <PrivateNavBar />
      <Routes>
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/add'
          element={<AddLinks />}
        />
      </Routes>
    </>
  );
}
