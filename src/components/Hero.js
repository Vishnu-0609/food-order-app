import React from 'react'
import Image from 'next/image'
import Right from './Icons/Right'

function Hero() {
  return (
    <section className='relative ps-10 e mt-4 max-h-100 background-image flex flex-wrap bg-[#f4f3e9]'>
      <div className='py-12 p-4 text-start'>
        <div className='mt-10 flex items-center'>
          <div className='h-1 w-12 bg-[#f4f3e9] mr-4'></div>
          <div className="text-white text-xl">
            <p>Genius you can taste</p>
          </div>
          <div className='h-1 w-12 bg-[#f4f3e9] ml-4'></div>
        </div>
        <h1 className='font-serif font-black text-white text-6xl py-6'>
          Everything<br/>
          is better<br/>
          with a&nbsp;
          <span className='text-primary'>Pizza</span></h1>
        <p className='my-4 text-gray-300 text-lg pb-2 leading-6'>Pizza is the missing pieces that<br/>makes every day complete, a simple yet delicious joy in life</p>
        <div className='flex gap-4 text-sm'>
          <button className='bg-[#f4f3e9] flex uppercase gap-4 text-primary px-8 py-2 rounded-full text-2xl items-center font-[1000]'>Order Now<Right/></button>
        </div>
      </div> 
      <div className='relative flex align-bottom justify-center overflow-hidden'>
        <div className='flex flex-row items-end'>
          <Image src={'/pizza-guy.png'} height={50} width={230} objectFit={'contain'} alt={'pizza'}></Image>
        </div>
        <div className=''>
        {/* height={500} width={600} */}
          <Image className='slow-spin' src={'/Jalapeno pizza.webp'} height={700} width={700} objectFit={'contain'} alt={'pizza'}></Image>
        </div>
      </div>  
    </section>
  )
}

export default Hero
