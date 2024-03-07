export function Card({ links, onDelete, onEdit }) {
  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {links.length === 0 ? (
        <h1>no hay links</h1>
      ) : (
        links.map((link) => (
          <div
            key={link.id}
            className='bg-gray-900 text-white shadow-md rounded-lg p-4 m-4'>
            <a
              href={link.url}
              target='_blank'
              className='text-lg font-bold hover:text-blue-700'>
              {link.title}
            </a>
            <p className='text-gray-600'>{link.description}</p>
            <div className='mt-4 flex justify-between items-center'>
              <div>
                <button
                  onClick={() => onDelete(link.id)}
                  className='rounded bg-red-500 text-white px-2 py-1 mr-2'>
                  Eliminar
                </button>
                <button
                  onClick={() => onEdit(link.id)}
                  className='rounded bg-blue-500 text-white px-2 py-1'>
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
