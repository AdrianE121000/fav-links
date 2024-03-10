import { useState } from 'react';
import { deleteLink } from '../lib/data';
import EditForm from './EditForm';
import { CloseIcon } from './Icons';

export function Card({ links }) {
  const [showModal, setShowModal] = useState(false);
  const [linkToUpadte, setLinkToUpdate] = useState();

  async function onDelete(id) {
    await deleteLink({ id });
  }
  function onEdit(id) {
    setShowModal(true);
    setLinkToUpdate(id);
  }

  return (
    <>
      {links.length === 0 && (
        <div className='flex justify-center items-center bg-gray-400 mx-auto p-5 rounded mt-5 w-1/2'>
          <h1 className='mx-auto text-3xl font-bold'>no hay links</h1>
        </div>
      )}
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {links.map((link) => (
          <div
            key={link.id}
            className='bg-gray-800 text-white shadow-md rounded-lg p-4 m-4 '>
            <a
              href={link.url}
              target='_blank'
              className='text-lg font-bold hover:text-blue-700 line-clamp-3'>
              {link.title}
            </a>
            <p className='text-gray-300 line-clamp-5'>{link.description}</p>
            <div className='mt-4 flex justify-between items-center'>
              <div>
                <button
                  onClick={() => onDelete(link.id)}
                  className='rounded bg-red-500 text-white px-2 py-1 mr-2 hover:bg-red-900'>
                  Eliminar
                </button>
                <button
                  onClick={() => onEdit(link.id)}
                  className='rounded bg-blue-500 text-white px-2 py-1 hover:bg-blue-900'>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-4 rounded-md shadow-lg'>
            <EditForm
              id={linkToUpadte}
              setShowModal={setShowModal}
            />
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 focus:outline-none'>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
