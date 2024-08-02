import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { PrivateNavBar } from '../components/PrivateNavBar';
import { AddLinks } from '../components/AddLinks';
import { EditUser } from '../components/EditUser';
import { Groups } from '../components/Groups';

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
        <Route
          path='/user'
          element={<EditUser />}
        />
        <Route
          path='/group/:group_id'
          element={<Groups />}
        />
      </Routes>
    </>
  );
}
