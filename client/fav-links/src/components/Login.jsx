import { useContext, useState } from 'react';
import AppContext from '../context/Context';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from '../lib/data';
import NavBar from './NavBar';
import { LockIcon, OpenIcon } from './Icons';

export function Login() {
  const { setLogged } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      password: password,
    };

    const result = await loginUser(username, data);

    if (result?.message) {
      setErr(true);
    }
    if (result.token) {
      localStorage.setItem('token', result.token);

      const { username } = result.user;
      const { id } = result.user;
      const { fullname } = result.user;

      localStorage.setItem('user', username);
      localStorage.setItem('fullname', fullname);
      localStorage.setItem('userID', id);

      setLogged(true);

      navigate('/home');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <NavBar />
      <div className='w-full max-w-xs sm:max-w-md mx-auto mt-20'>
        <form
          onSubmit={handleSubmit}
          className='bg-neutral-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-2xl font-bold mb-4'>Login</h2>
          <div className='mb-4'>
            <label
              className='block  text-sm font-bold mb-2'
              htmlFor='username'>
              UserName:
            </label>
            <input
              className='shadow bg-neutral-600 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              required
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-6 relative'>
            <label
              className='block  text-sm font-bold mb-2'
              htmlFor='password'>
              Password:
            </label>
            <input
              className='shadow bg-neutral-600 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              required
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className='cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 top-7 hover:scale-110 transition duration-500 ease-in-out'
              onClick={togglePasswordVisibility}>
              {showPass ? (
                <LockIcon
                  h={5}
                  w={5}
                />
              ) : (
                <OpenIcon />
              )}
            </div>
          </div>
          <div
            className={`${
              err ? 'block' : 'hidden'
            } text-red-600 mb-5 text-center`}>
            incorrect username or password, please verify them
          </div>
          <div className='flex items-center justify-between '>
            <button
              className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700'
              type='submit'>
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className='text-center text-white mt-2'>
        <NavLink to='/signup'>
          You don&apos;t have an account yet ?{' '}
          <span className='text-blue-500 hover:underline'>SignUp</span>
        </NavLink>
      </div>
    </>
  );
}
