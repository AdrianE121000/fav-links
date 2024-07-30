import { useParams } from 'react-router-dom';

export function Groups() {
  const { groupId } = useParams();

  return (
    <>
      <div className='flex items-center justify-center'>
        <h1 className='text-white'>Este es el grupo: {groupId}</h1>
      </div>
    </>
  );
}
