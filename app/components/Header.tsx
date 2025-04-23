'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import SideNav from './SideNav';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/?search=${e.target.value}`);
  };

  return (
    <div className='bg-gray-800 mb-4'>
      <div className='flex flex-col md:flex-row justify-between items-center py-4 px-6 gap-4 md:gap-0'>
        {/* Top Row with Logo and Toggle */}
        <div className='flex justify-between w-full md:w-auto items-center'>
          <Link href={'/'}><h1 className='text-2xl font-bold text-white'>Movie</h1></Link>
          <div onClick={() => setMenuOpen(!menuOpen)} className='md:hidden'>
            <button className='text-white cursor-pointer'>
              {
                menuOpen ?
                  <span className='bg-red-600 px-2'>X</span>
                  :
                  <Bars3Icon className='h-6 w-6' />
              }
            </button>
          </div>
        </div>

        {/* Navigation (hidden on mobile unless toggled) */}
        <div className="relative w-full" >
          {
            menuOpen && (
              <div className="absolute left-0 top-full z-50 bg-gray-800 shadow-lg">
                <SideNav setMenuOpen={setMenuOpen}/>
              </div>
            )
          }
        </div>


        {/* Search */}
        <div className='flex'>
          <input
            onChange={(e) => handleSubmit(e)}
            type="search"
            className='flex-grow md:flex-grow-0 rounded-s-md px-4 py-2 bg-white outline-0 text-black text-xs w-full md:w-auto'
            placeholder='Search movie name...'
          />
          <button className='bg-gray-600 text-xs py-2 px-4 rounded-e-md text-white cursor-pointer'
            type="submit">
            <MagnifyingGlassIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
