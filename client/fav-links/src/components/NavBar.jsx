import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav>
        <NavLink to='/signin'>Login</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
      </nav>
    </>
  );
};

export default NavBar;
