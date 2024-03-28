import React from 'react'

function MenuItems() {
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25'>
        <div className='text-center'>
            <img className='max-h-auto max-h-24 block mx-auto' src="/pizza1.png" alt="pizza" />
        </div>
        <h4 className='font-semibold text-xl my-3'>Pepperoni Pizza</h4>
        <p className='text-gray-500 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, culpa. Voluptates dolor dolores veniam.</p>
        <button className='bg-primary text-white rounded-full px-8 py-2 mt-4'>Add to cart $12</button>
    </div>
  )
}

export default MenuItems
