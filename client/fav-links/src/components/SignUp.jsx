import { useContext, useState } from 'react';
import { createUser } from '../lib/data';
import { parseJwt } from '../lib/utils';
import AppContext from '../context/Context';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBar from './NavBar';

export function SignUp() {
  const { setLogged } = useContext(AppContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setNoMatch(false);
    if (password === repeatPassword) {
      setError(false);
      const data = {
        username: username,
        password: password,
        fullname: fullName,
      };

      const result = await createUser(data);

      if (result?.message !== undefined) {
        setError(true);
      } else {
        localStorage.setItem('token', result.token);

        const { newUser } = result;

        localStorage.setItem('user', newUser[0].username);
        localStorage.setItem('userID', newUser[0].id);
        localStorage.setItem('fullname', newUser[0].fullname);

        setLogged(
          parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now()
        );

        navigate('/home');
      }
    } else {
      setNoMatch(true);
    }
  }

  return (
    <>
      <NavBar />
      <div className='max-w-md mx-auto p-6 bg-gray-300 shadow-md rounded-md mt-20'>
        <h2 className='text-2xl font-bold mb-4'>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              id='username'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          {error && (
            <div className={`text-sm text-red-700 ml-1 mb-2`}>
              The user is already taken, please choose another one
            </div>
          )}
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
            />
          </div>
          <div className='mb-1'>
            <label
              htmlFor='repeatPassword'
              className='block text-sm font-medium text-gray-700'>
              Repeat Password
            </label>
            <input
              type='password'
              id='repeatPassword'
              placeholder='********'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
            />
          </div>
          {noMatch && (
            <div className={`text-sm text-red-700 ml-1 mb-2`}>
              Passwords don&apos;t match
            </div>
          )}
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              placeholder='full name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div
            className={`${
              error ? 'block' : 'hidden'
            } text-red-600 mb-5 text-center`}>
            The user is already taken, please choose another one
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-300'>
            Create an account
          </button>
        </form>
      </div>
      <div className='text-center mt-2'>
        <NavLink to='/signin'>
          Already have an account?{' '}
          <span className='text-blue-500 hover:underline'>Login</span>
        </NavLink>
      </div>
    </>
  );
}
