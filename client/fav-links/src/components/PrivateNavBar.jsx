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
import { Toaster, toast } from 'sonner';

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
    const result = await deleteUser(userID);

    if (result?.message) {
      localStorage.removeItem('token');
      setLogged(false);
      navigate('/');
    } else {
      toast.error('Halgo salio mal');
    }
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
      <Toaster
        richColors
        theme='dark'
      />
      <nav className='bg-gray-800 p-4 flex items-center justify-between'>
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
        <div className='bg-gray-800 p-4 text-white text-lg w-full flex flex-col justify-center items-center gap-2'>
          <div className='flex flex-col items-center justify-center '>
            <Link
              to='/home'
              onClick={toggleMenu}
              className='text-white hover:text-gray-300'>
              Links
            </Link>
            <Link
              to='/add'
              onClick={toggleMenu}
              className='text-white hover:text-gray-300'>
              Add Link
            </Link>
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
          <div className='bg-gray-800 p-4 rounded-md shadow-lg'>
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
                className='flex gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-800 hover:scale-110 transition duration-500 ease-in-out'>
                Logout
                <LockIcon
                  h={6}
                  w={6}
                />
              </button>
              <button
                onClick={deleteAcount}
                className='flex gap-2 bg-red-500 text-white px-4 py-2 rounded-md  hover:bg-red-800 hover:scale-110 transition duration-500 ease-in-out'>
                Delete account
                <DeleteIcon />
              </button>
            </div>
            <button
              onClick={closeModal}
              className='absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-950 focus:outline-none hover:scale-150 transition duration-500 ease-in-out'>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrivateNavBar;
