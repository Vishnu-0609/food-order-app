import React, { useContext, useState } from 'react'
import Rupee from '../Icons/Rupee'
import { CartContext } from '../AppContext';
import toast from 'react-hot-toast';
import ChevronRight from '../Icons/Cheron-rigth';
import Link from 'next/link';

function MenuItems(menuItems) {
  const {image,name,description,basePrice,sizes,ingredients,_id} = menuItems;

  return (
    <>
      {/* {showPopUp && (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg'>

          </div>
        </div>
      )} */}
      <div className='bg-[#f8f4ec] p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25'>
        <div className='text-center'>
            <img className='max-h-auto max-h-36 block mx-auto' src={image} alt="pizza" />
        </div>
        <h4 className='font-semibold text-xl my-3'>{name}</h4>
        <p className='text-gray-500 text-sm line-clamp-2'>{description}</p>
        <Link href={`/Items/${_id}`} type='button' className='text-primary font-black font-mono rounded-full px-8 py-2 mt-4 flex mx-auto justify-center hover:underline'><span>VIEW MENU ITEM</span><ChevronRight/></Link>
      </div>
    </>
  )
}

export default MenuItems
