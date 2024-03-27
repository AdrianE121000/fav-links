import { timeAgo } from '../lib/utils';
import { DeleteIcon, EditIcon } from './Icons';

export function Card({ userLinks, onDelete, onEdit }) {
  return (
    <>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {userLinks.map((link) => (
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
            <p>{timeAgo(link.created_at)}</p>
            <div className='mt-4 flex justify-between items-center gap-1'>
              <button
                onClick={() => onDelete(link.id)}
                className='flex items-center rounded bg-red-500 text-white text-lg px-1 py-1 hover:bg-red-900 hover:scale-110 transition duration-300 ease-in-out'>
                Eliminar
                <DeleteIcon />
              </button>
              <button
                onClick={() => onEdit(link.id)}
                className='flex items-center rounded bg-blue-500 text-white text-lg px-1 py-1 hover:bg-blue-900 hover:scale-110 transition duration-300 ease-in-out'>
                Editar
                <EditIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
