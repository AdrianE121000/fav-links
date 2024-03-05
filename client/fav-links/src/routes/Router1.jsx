import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login';
import { SignUp } from '../components/SignUp';
import { Router2 } from './Router2';
import FavLinks from '../components/FavLinks';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export default function Router1() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <PublicRoutes>
              <FavLinks />
            </PublicRoutes>
          }
        />
        <Route
          path='/signin'
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoutes>
              <SignUp />
            </PublicRoutes>
          }
        />
        <Route
          path='/*'
          element={
            <PrivateRoutes>
              <Router2 />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}
