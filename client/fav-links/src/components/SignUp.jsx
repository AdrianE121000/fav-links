import { useContext, useState } from 'react';
import { createUser } from '../lib/data';
import AppContext from '../context/Context';
import { useNavigate, NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import { LockIcon, OpenIcon } from './Icons';
import { Toaster, toast } from 'sonner';

export function SignUp() {
  const { setLogged } = useContext(AppContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);
  const [noMatch, setNoMatch] = useState(false);
  const [showPass, setShowPass] = useState(false);

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
      } else if (result?.error !== undefined) {
        toast.error(result.error[0].message);
      } else {
        localStorage.setItem('token', result.token);

        const { newUser } = result;

        localStorage.setItem('user', newUser[0].username);
        localStorage.setItem('userID', newUser[0].id);
        localStorage.setItem('fullname', newUser[0].fullname);

        setLogged(true);

        navigate('/home');
      }
    } else {
      setNoMatch(true);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <NavBar />
      <Toaster
        richColors
        theme='dark'
      />
      <div className='max-w-md mx-auto p-6 bg-gray-800 text-white shadow-md rounded-md mt-20'>
        <h2 className='text-2xl font-bold mb-4'>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium '>
              Username:
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 bg-gray-600 block w-full px-3 py-2 border rounded-md shadow-sm leading-tight focus:outline-none focus:shadow-outline sm:text-sm'
            />
          </div>
          {error && (
            <div className={`text-sm text-red-700 ml-1 mb-2`}>
              The user is already taken, please choose another one
            </div>
          )}
          <div className='mb-4 relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium '>
              Password:
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 bg-gray-600 block w-full px-3 py-2 border rounded-md shadow-sm leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
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
          <div className='mb-1 relative'>
            <label
              htmlFor='repeatPassword'
              className='block text-sm font-medium '>
              Repeat Password:
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              id='repeatPassword'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={`mt-1 bg-gray-600 block w-full px-3 py-2 border rounded-md shadow-sm leading-tight focus:outline-none focus:shadow-outline sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
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
          {noMatch && (
            <div className={`text-sm text-red-700 ml-1 mb-2`}>
              Passwords don&apos;t match
            </div>
          )}
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium mt-3'>
              Full Name:
            </label>
            <input
              type='text'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='mt-1 bg-gray-600 block w-full px-3 py-2 border rounded-md shadow-sm leading-tight focus:outline-none focus:shadow-outline sm:text-sm'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:scale-105 transition-all duration-500 ease-in-out'>
            Create an account
          </button>
        </form>
      </div>
      <div className='text-center text-white mt-2'>
        <NavLink to='/signin'>
          Already have an account?{' '}
          <span className='text-blue-500 hover:underline'>Login</span>
        </NavLink>
      </div>
    </>
  );
}
