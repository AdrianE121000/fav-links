import { useState } from 'react';
import { updateLink } from '../lib/data';

function EditForm({ id, setShowModal }) {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [description, setDescription] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {};

    if (title) data.title = title;
    if (url) data.url = url;
    if (description) data.description = description;

    const result = await updateLink({ data, id });

    if (result !== undefined) {
      setShowModal(false);

      return;
    } else {
      alert('ocurio un error');
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-center text-3xl font-bold'>Update Link</h1>
        <em>Just fill in the fields you want to change</em>
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='title'>
            Title:
          </label>
          <input
            className='bg-gray-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='url'>
            URL:
          </label>
          <input
            className='bg-gray-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            id='url'
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='description'>
            Description:
          </label>
          <textarea
            className='resize-none bg-gray-600 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Accept
          </button>
        </div>
      </form>
    </>
  );
}

export default EditForm;
