import { useContext, useEffect } from 'react';
import AppContext from '../context/Context';
import { useNavigate } from 'react-router-dom';

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
      <h1 className='text-center text-4xl text-violet-950'>Fav Links</h1>
    </>
  );
};

export default FavLinks;
