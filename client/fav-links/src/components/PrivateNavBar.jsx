import { Link, useNavigate } from 'react-router-dom';
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  MenuIcon,
  UserIcon,
} from './Icons';
import { useContext, useState } from 'react';
import AppContext from '../context/Context';
import { deleteUser } from '../lib/data';
import { DropDown } from './DropDown';

export function PrivateNavBar() {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { setLogged } = useContext(AppContext);

  const username = localStorage.getItem('user');
  const fullname = localStorage.getItem('fullname');
  const userID = localStorage.getItem('userID');

  const logOut = () => {
    localStorage.removeItem('token');
    setLogged(false);
    navigate('/');
  };

  async function deleteAcount() {
    await deleteUser(userID);

    localStorage.removeItem('token');
    setLogged(false);
    navigate('/');
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className='bg-neutral-800 p-4 flex items-center justify-between'>
        <div className='text-white font-bold text-lg md:ml-10'>Fav Links</div>
        <div
          className={`hidden sm:flex space-x-4 items-center gap-4 ${
            showMenu ? 'block' : 'hidden'
          }`}>
          <Link
            to='/home'
            className='text-white font-bold hover:text-gray-950 hover:scale-125 transition duration-500 ease-out'>
            Links
          </Link>
          <Link
            to='/add'
            className='text-white font-bold hover:text-gray-950 hover:scale-125 transition duration-500 ease-out'>
            Add Link
          </Link>
          <DropDown />
        </div>
        <div
          className={`hidden sm:flex space-x-4 items-center mr-10 ${
            showMenu ? 'block' : 'hidden'
          }`}>
          <button
            onClick={openModal}
            className='text-white font-bold hover:text-gray-950 focus:outline-none hover:scale-150 transition duration-500 ease-out'>
            <UserIcon />
          </button>
        </div>
        <div className='block sm:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white hover:text-gray-300 focus:outline-none'>
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {showMenu && (
        <div className='bg-neutral-800 p-4 text-white text-lg w-full flex flex-col justify-center items-center gap-2'>
          <div className='flex flex-col items-center justify-center '>
            <Link
              to='/home'
              onClick={toggleMenu}
              className='text-white font-bold hover:text-gray-950 hover:scale-125 transition duration-500 ease-out'>
              Links
            </Link>
            <Link
              to='/add'
              onClick={toggleMenu}
              className='text-white font-bold hover:text-gray-950 hover:scale-125 transition duration-500 ease-out'>
              Add Link
            </Link>
            <DropDown />
          </div>
          <div>
            <button
              onClick={openModal}
              className='text-white hover:text-gray-300 focus:outline-none'>
              <UserIcon />
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center text-white bg-opacity-50 z-50'>
          <div className='bg-neutral-800 p-4 rounded-md shadow-sm shadow-white'>
            <div className='flex flex-row gap-2'>
              <h2 className='text-lg font-bold'>User info</h2>
              <button
                className='hover:scale-150 transition duration-500 ease-in-out'
                onClick={() => {
                  navigate('/user');
                  setShowModal(false);
                }}>
                <EditIcon />
              </button>
            </div>
            <p>Name: {fullname}</p>
            <p>Username: {username}</p>
            <div className='flex flex-row gap-4 mt-3'>
              <button
                onClick={logOut}
                className='flex gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-red-700'>
                Logout
                <LockIcon
                  h={6}
                  w={6}
                />
              </button>
              <button
                onClick={deleteAcount}
                className='flex gap-2 bg-red-500 text-white px-4 py-2 rounded-md  hover:bg-red-800 hover:scale-110 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-red-700'>
                Delete account
                <DeleteIcon />
              </button>
            </div>
            <button
              onClick={closeModal}
              className='absolute top-1.5 right-2 p-2 text-neutral-600 hover:text-gray-950 focus:outline-none hover:scale-150 transition duration-500 ease-in-out'>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrivateNavBar;
