import { Card } from './Card';
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { deleteLink, getLinks } from '../lib/data';

import EditForm from './EditForm';
import { CloseIcon } from './Icons';

export function Home() {
  const userId = localStorage.getItem('userID');

  const [showModal, setShowModal] = useState(false);
  const [linkToUpadte, setLinkToUpdate] = useState();

  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    async function getAllLinks() {
      const links = await getLinks(userId);

      setUserLinks(links);
    }

    getAllLinks();
  }, [userId]);

  async function onDelete(id) {
    await deleteLink({ id });
    const links = await getLinks(userId);

    setUserLinks(links);

    toast.success('Link deleted');
  }
  function onEdit(id) {
    setShowModal(true);
    setLinkToUpdate(id);

    //toast.success('Link edited');
  }

  return (
    <>
      <Toaster richColors />
      {userLinks.length === 0 && (
        <div className='flex justify-center items-center bg-gray-400 mx-auto p-5 rounded mt-5 w-1/2'>
          <h1 className='mx-auto text-3xl font-bold'>no hay links</h1>
        </div>
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
