import { useContext, useState } from 'react';
import AppContext from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../lib/utils';
import { loginUser } from '../lib/data';

export function Login() {
  const { setLogged } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);

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

      setLogged(
        parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now()
      );

      navigate('/home');
    }
  }

  return (
    <div className='w-full max-w-xs mx-auto'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            UsenName
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            required
            type='username'
            placeholder='UsenName'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            required
            type='password'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={`${
            err ? 'block' : 'hidden'
          } text-red-600 mb-5 text-center`}>
          usuario o contraseña incorrectos, por favor verifiquelo
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
