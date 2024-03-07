import { useContext, useState } from 'react';
import { createUser } from '../lib/data';
import { parseJwt } from '../lib/utils';
import AppContext from '../context/Context';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const { setLogged } = useContext(AppContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

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
      alert('Las contraseñas no coinciden');
    }
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Crear cuenta</h2>
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
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mb-4'>
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
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='fullName'
            className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <input
            type='text'
            id='fullName'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div
          className={`${
            error ? 'block' : 'hidden'
          } text-red-600 mb-5 text-center`}>
          Ya el usuario esta en uso, por favor elija otro
        </div>
        <button
          type='submit'
          className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-300'>
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
