import { timeAgo } from '../lib/utils';
import { DeleteIcon, EditIcon } from './Icons';

export function Card({ userLinks, onDelete, onEdit }) {
  const sortedLinks = userLinks.sort((a, b) => b.id - a.id);

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {sortedLinks.map((link) => (
          <div
            key={link.id}
            className='bg-gray-800 text-white rounded-lg p-4 m-4 shadow-sm shadow-white'>
            <a
              href={link.url}
              target='_blank'
              className='text-lg font-bold hover:text-blue-700 line-clamp-3 duration-500 ease-in-out'>
              {link.title}
            </a>
            <p className='text-gray-300 line-clamp-1'>{link.description}</p>
            <p>{timeAgo(link.created_at)}</p>
            <div className='mt-4 flex justify-between items-center gap-1'>
              <button
                onClick={() => onDelete(link.id)}
                className='flex gap-2 items-center font-semibold rounded bg-red-500 text-white text-lg px-2 py-1 hover:bg-red-900 hover:scale-110 transition duration-500 ease-in-out'>
                Delete
                <DeleteIcon />
              </button>
              <button
                onClick={() => onEdit(link.id)}
                className='flex gap-2 items-center font-semibold rounded bg-blue-500 text-white text-lg px-2 py-1 hover:bg-blue-900 hover:scale-110 transition duration-500 ease-in-out'>
                Edit
                <EditIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
