import { Card } from './Card';
import { Toaster, toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { deleteLink, getLinks } from '../lib/data';
import { useNavigate } from 'react-router-dom';

import EditForm from './EditForm';
import { CloseIcon } from './Icons';

export function Home() {
  const userId = localStorage.getItem('userID');

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [linkToUpadte, setLinkToUpdate] = useState();
  const loading = useRef(true);

  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    async function getAllLinks() {
      loading.current = true;
      const links = await getLinks(userId);

      setUserLinks(links);
    }

    getAllLinks();
    loading.current = false;
  }, [userId, showModal]);

  async function onDelete(id) {
    await deleteLink({ id });
    const links = await getLinks(userId);

    setUserLinks(links);

    toast.success('Link deleted');
  }
  function onEdit(id) {
    setShowModal(true);
    setLinkToUpdate(id);
  }

  return (
    <>
      <Toaster
        richColors
        theme='dark'
      />
      {loading.current ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      ) : (
        userLinks.length === 0 && (
          <div className='flex justify-center flex-col items-center bg-gray-800 text-white mx-auto p-5 rounded mt-5 w-1/2'>
            <h1 className='mx-auto text-3xl font-bold'>There are no links</h1>
            <button
              className='bg-gray-600 p-2 y-4 mt-5 rounded-lg text-white hover:bg-gray-700 hover:scale-110 transition duration-300 ease-in-out'
              onClick={() => navigate('/add')}>
              Add link
            </button>
          </div>
        )
      )}
      <Card
        userLinks={userLinks}
        onEdit={onEdit}
        onDelete={onDelete}
      />
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
