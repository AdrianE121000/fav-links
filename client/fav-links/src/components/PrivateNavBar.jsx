import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import { parseJwt } from '../lib/utils';

const PrivateNavBar = () => {
  const navigate = useNavigate();
  const { setLogged } = useContext(AppContext);

  const logOut = () => {
    localStorage.removeItem('token');
    setLogged(parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
    navigate('/');
  };
  return (
    <>
      <nav>
        <NavLink to='/home'>home</NavLink>
        <NavLink to='/links'>home</NavLink>
        <button onClick={logOut}>LogOut</button>
      </nav>
    </>
  );
};

export default PrivateNavBar;
