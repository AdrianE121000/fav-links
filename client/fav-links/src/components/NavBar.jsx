import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <nav className='bg-gray-800 text-white font-bold text-lg p-4 flex items-center justify-between'>
        <div className='md:ml-10 hover:text-gray-300'>
          <NavLink to='/'>Fav Links</NavLink>
        </div>
        <div className='flex gap-2'>
          <NavLink
            className='hover:text-gray-300'
            to='/signin'>
            Login
          </NavLink>
          <NavLink
            className='hover:text-gray-300'
            to='/signup'>
            Sign Up
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
