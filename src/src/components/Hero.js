import React from 'react'
import Image from 'next/image'
import Right from './Icons/Right'

function Hero() {
  return (
    <section className='hero mt-4'>
      <div className='py-12'>
        <h1 className='text-4xl font-semibold'>
          Everything<br/>
          is better<br/>
          with a&nbsp;
          <span className='text-primary'>Pizza</span></h1>
        <p className='my-4 text-gray-500'>Pizza is the missing pieces that makes every day complete, a simple yet delicious joy in life</p>
        <div className='flex gap-4 text-sm'>
          <button className='bg-primary flex uppercase gap-4 text-white px-8 py-2 rounded-full text-sm items-center'>Order Now<Right/></button>
          <button className='flex gap-2 py-2 text-gray-600 font-semibold'>Learn More<Right/></button>
        </div>
      </div> 
      <div className='relative'>
        <Image className='w-100' src={'/pizzamain.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}></Image>
      </div>
    </section>
  )
}

export default Hero
