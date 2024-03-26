import { Link, useNavigate } from 'react-router-dom';
import { CloseIcon, MenuIcon, UserIcon } from './Icons';
import { useContext, useState } from 'react';
import AppContext from '../context/Context';
import { parseJwt } from '../lib/utils';
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
    setLogged(parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
    navigate('/');
  };

  async function deleteAcount() {
    const result = await deleteUser(userID);

    if (result?.message) {
      localStorage.removeItem('token');
      setLogged(
        parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now()
      );
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
      <Toaster richColors />
      <nav className='bg-gray-800 p-4 flex items-center justify-between'>
        <div className='text-white font-bold text-lg md:ml-10'>Fav Links</div>
        <div
          className={`hidden sm:flex space-x-4 items-center ${
            showMenu ? 'block' : 'hidden'
          }`}>
          <Link
            to='/home'
            className='text-white hover:text-gray-300'>
            Links
          </Link>
          <Link
            to='/add'
            className='text-white hover:text-gray-300'>
            Add Link
          </Link>
        </div>
        <div
          className={`hidden sm:flex space-x-4 items-center mr-10 ${
            showMenu ? 'block' : 'hidden'
          }`}>
          <button
            onClick={openModal}
            className='text-white hover:text-gray-300 focus:outline-none'>
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
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-4 rounded-md shadow-lg'>
            <h2 className='text-lg font-bold'>Información del Usuario</h2>
            <p>Nombre: {fullname}</p>
            <p>Username: {username}</p>
            <button
              onClick={() => {
                navigate('/user');
                setShowModal(false);
              }}
              className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
              Editar Información
            </button>
            <button
              onClick={logOut}
              className='bg-red-500 text-white px-4 py-2 rounded-md'>
              Cerrar Sesión
            </button>
            <button
              onClick={deleteAcount}
              className='bg-red-500 text-white px-4 py-2 rounded-md'>
              Borrar Cuenta
            </button>
            <button
              onClick={closeModal}
              className='absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 focus:outline-none'>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrivateNavBar;
