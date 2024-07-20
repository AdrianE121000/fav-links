import { useState } from 'react';
import { editUser } from '../lib/data';
import { Toaster, toast } from 'sonner';
import { LockIcon, OpenIcon } from './Icons';

export function EditUser() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [noMatch, setNoMatch] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const userId = localStorage.getItem('userID');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {};

    if (username) data.username = username;
    if (newPassword) data.password = newPassword;
    if (fullName) data.fullname = fullName;

    if (newPassword !== repeatPassword) {
      setNoMatch(true);

      return;
    }

    const result = await editUser({ data, userId });

    if (result.message === 'User Already Exist') {
      toast.error('Username Already Exist, try another');
    } else if (result?.error !== undefined) {
      toast.error(result.error[0].message);
    } else {
      toast.success('User edited');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Toaster
        richColors
        theme='dark'
      />
      <div className='max-w-md mx-auto p-6 bg-gray-800 text-white shadow-md rounded-md mt-20'>
        <h2 className='text-2xl font-bold mb-4'>Edit account</h2>
        <em>Just fill in the fields you want to change</em>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='bg-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div className='mb-4 relative'>
            <label
              htmlFor='newPassword'
              className='block text-sm font-medium '>
              New Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`bg-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
            />
            <div
              className='cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 top-7 hover:scale-110 transition duration-500 ease-in-out'
              onClick={togglePasswordVisibility}>
              {showPass ? (
                <LockIcon
                  w={5}
                  h={5}
                />
              ) : (
                <OpenIcon />
              )}
            </div>
          </div>
          <div className='mb-4 relative'>
            <label
              htmlFor='repeatPassword'
              className='block text-sm font-medium '>
              Repeat Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              id='repeatPassword'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={`bg-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
            />
            <div
              className='cursor-pointer absolute inset-y-0 right-0 flex items-center px-2 top-7 hover:scale-110 transition duration-500 ease-in-out'
              onClick={togglePasswordVisibility}>
              {showPass ? (
                <LockIcon
                  w={5}
                  h={5}
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
              className='block text-sm font-medium '>
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='bg-gray-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:scale-105 transition duration-500 ease-in-out'>
            Acept
          </button>
        </form>
      </div>
    </>
  );
}
