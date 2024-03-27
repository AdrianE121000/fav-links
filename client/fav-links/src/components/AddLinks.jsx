import { useState } from 'react';
import { createLink } from '../lib/data';
import { Toaster, toast } from 'sonner';

export function AddLinks() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const user_id = localStorage.getItem('userID');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: title,
      url: url,
      description: description,
      user_id: Number(user_id),
    };

    const result = await createLink({ data });

    if (result) {
      setTitle('');
      setDescription('');
      setUrl('');

      toast.success('Link agregado correctamente');
    } else {
      toast.error('algo salio mal');
    }
  }
  return (
    <>
      <Toaster richColors />
      <div className='w-full max-w-md mx-auto mt-20'>
        <form
          onSubmit={handleSubmit}
          className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h1 className='text-center text-3xl font-bold'>Add Link</h1>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='title'>
              Title:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='title'
              type='text'
              required
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='url'>
              URL:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='url'
              type='url'
              required
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='description'>
              Description:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              placeholder='Description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline'
              type='submit'>
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
