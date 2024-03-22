import { useContext, useEffect } from 'react';
import AppContext from '../context/Context';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const FavLinks = () => {
  const { logged } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate('/home');
    }
  }, [navigate, logged]);

  return (
    <>
      <NavBar />
      <main className='w-screen h-screen'>
        <header
          className='text-white flex justify-center min-h-96 w-full h-full pt-0 bg-no-repeat bg-cover bg-center '
          style={{ backgroundImage: "url('/background.jpeg')" }}>
          <div className='container text-center my-auto'>
            <h1 className='mb-1 text-6xl p-0 m-0'>Favorite Links</h1>
            <h1 className='mb-5'>
              <em className='text-2xl'>Store your favorite links</em>
            </h1>
            <NavLink
              className='bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded'
              to='/signin'>
              {' '}
              Let&apos;s get Started
            </NavLink>
          </div>
        </header>
      </main>
    </>
  );
};

export default FavLinks;
