import { useState } from 'react';
import { editUser } from '../lib/data';
import { Toaster, toast } from 'sonner';

export function EditUser() {
  const [username, setUsername] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [fullName, setFullName] = useState();
  const [noMatch, setNoMatch] = useState(false);

  const userId = localStorage.getItem('userID');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {};

    if (username) data.username = username;
    if (newPassword) data.password = newPassword;
    if (fullName) data.fullname = fullName;

    if (newPassword !== repeatPassword) {
      setNoMatch(true);
    }

    const result = await editUser({ data, userId });

    if (result.message === 'User Already Exist') {
      toast.error('User Already Exist, try another');
    } else {
      toast.success('User edited');
    }
  }

  return (
    <>
      <Toaster
        richColors
        theme='dark'
      />
      <div className='max-w-md mx-auto p-6 bg-gray-300 shadow-md rounded-md mt-20'>
        <h2 className='text-2xl font-bold mb-4'>Edit account</h2>
        <em>Just fill in the fields you want to change</em>
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
              htmlFor='newPassword'
              className='block text-sm font-medium text-gray-700'>
              New Password
            </label>
            <input
              type='password'
              id='newPassword'
              placeholder='********'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                noMatch ? 'border-red-700' : ''
              }`}
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
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-300'>
            Acept
          </button>
        </form>
      </div>
    </>
  );
}
