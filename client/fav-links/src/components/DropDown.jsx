import { useState } from 'react';
import { IconDropDown } from './Icons';
import { Link } from 'react-router-dom';

const GROUPS = [
  {
    id: 1,
    name: 'socia media',
    groupId: 1,
    linksIds: [25, 35, 24, 26],
  },
];

export function DropDown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
            className='origin-center absolute w-32 items-center mt-1 rounded-md shadow-lg bg-neutral-950 focus:outline-none'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'>
            <div
              className='py-1'
              role='none'>
              {GROUPS.map((group) => (
                <Link
                  onClick={() => setIsOpen(false)}
                  to={`/group/${group.groupId}`}
                  key={group.id}
                  className='block px-4 py-1 text-sm rounded-xl text-white font-bold hover:scale-125 transition duration-500 ease-out'>
                  {group.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
