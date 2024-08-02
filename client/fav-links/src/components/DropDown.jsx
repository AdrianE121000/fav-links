import { useEffect, useRef, useState } from 'react';
import { CloseIcon, IconDropDown } from './Icons';
import { Link } from 'react-router-dom';
import { createGroup, getGroups } from '../lib/data';
import { Toaster, toast } from 'sonner';

export function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [userGroups, setUserGroups] = useState([]);

  const loading = useRef(true);

  const user_id = localStorage.getItem('userID');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: name,
    };

    const result = await createGroup({ data, user_id });

    if (result?.error) {
      toast.error(result.error[0].message);
    } else {
      toast.success('Link agregado correctamente');
      setName('');
      setShowModal(false);
    }
  }

  useEffect(() => {
    async function getAllGroups() {
      loading.current = true;
      const groups = await getGroups(user_id);

      setUserGroups(groups);
    }

    getAllGroups();
    loading.current = false;
  }, [user_id, showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Toaster
        richColors
        theme='dark'
      />
      <div className='relative inline-block text-center'>
        <div>
          <span className='rounded-md shadow-sm'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='flex items-center text-white font-bold hover:text-gray-950 hover:scale-125 transition duration-500 ease-out'
              id='options-menu'
              aria-expanded='true'
              aria-haspopup='true'>
              Groups
              <IconDropDown />
            </button>
          </span>
        </div>

        {isOpen && (
          <div
            className='origin-center absolute w-[180px] items-center mt-1 rounded-md shadow-lg bg-neutral-950 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'>
            <div
              className='flex flex-col items-center justify-center py-1 text-sm'
              role='none'>
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsOpen(false);
                }}
                className='block px-4 py-1 text-sm rounded-xl text-white font-bold hover:scale-110 transition duration-500 ease-out'>
                Add new
              </button>
              <div className='w-[90%] mx-0 my-auto h-[2px] bg-white mb-2'></div>
              {loading.current ? (
                <div className='flex items-center justify-center h-screen'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
                </div>
              ) : (
                userGroups.map((group) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={`/group/${group.id}`}
                    key={group.id}
                    className='block line-clamp-1 max-w-[130px] p-1 text-sm rounded-xl text-white font-bold hover:scale-110 transition duration-500 ease-out'>
                    {group.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center text-white bg-opacity-50 z-50'>
          <div className='bg-neutral-800 p-4 rounded-md shadow-sm shadow-white'>
            <div className='flex flex-col items-center gap-2'>
              <h2 className='text-lg font-bold'>Add New Group</h2>
              <form
                onSubmit={handleSubmit}
                className='bg-neutral-800 text-white rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                  <label
                    className='block text-sm font-bold mb-2'
                    htmlFor='name'>
                    Name:
                  </label>
                  <input
                    className='shadow bg-neutral-600 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                    id='name'
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline hover:scale-105 transition duration-500 ease-in-out hover:shadow-lg hover:shadow-blue-700'
                    type='submit'>
                    Accept
                  </button>
                </div>
              </form>
            </div>
            <button
              onClick={closeModal}
              className='absolute top-1.5 right-2 p-2 text-neutral-600 hover:text-gray-950 focus:outline-none hover:scale-150 transition duration-500 ease-in-out'>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
