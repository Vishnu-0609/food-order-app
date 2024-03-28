"use client"
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import MenuItems from './Menu/MenuItems'
import SectionHeaders from './SectionHeaders'
import Link from "next/link";
import ChevronRight from './Icons/Cheron-rigth'

function HeroLabel()
{
  return (
    <section className='relative'>
        <div className='absolute top-11 w-full px-10 lg:top-20 md:top-14'>
          <div className='xl:h-80 lg:h-52 md:h-44 sm:h-40 h-16'>
            <h1 className='text-primary lg:text-6xl xl:text-6xl md:text-5xl sm:text-3xl text-2xl font-black font-sans tracking-tight leading-tight'>PIZZA</h1>
            <Link href="/menu/PIZZAS" className="text-xl font-black font-sans tracking-tight leading-tight flex  items-center">VIEW PIZZAS<ChevronRight/></Link>
          </div>
          <div className='flex flex-col items-end xl:h-80 lg:h-52 md:h-40 sm:h-36 h-28'>
            <div className='flex flex-col items-start'>
              <h1 className='text-white lg:text-6xl xl:text-6xl md:text-5xl sm:text-3xl text-2xl font-black font-sans tracking-tight leading-tight uppercase'>Chicken<br/> Wings</h1>
              <Link href="/menu/CHICKEN-WINGS" className="text-xl text-white px-2 sm:w-52 w-28 font-black font-sans tracking-tight leading-tight flex uppercase items-center">VIEW Chicken Wings<ChevronRight/></Link>
            </div>
          </div>
          <div className='xl:h-96 lg:h-72 md:h-44 sm:h-40 h-36'>
            <div className='flex flex-col items-start'>
              <h1 className='text-white lg:text-6xl xl:text-6xl md:text-5xl sm:text-3xl text-2xl font-black font-sans tracking-tight leading-tight uppercase'>SALADS • PASTA •<br/> SIDES</h1>
              <Link href="/menu/SALADS-PASTA-SIDES" className="text-xl text-white px-2 font-black font-sans tracking-tight leading-tight flex uppercase items-center">VIEW SIDES<ChevronRight/></Link>
            </div>
          </div>
          <div className='flex flex-col items-end lg:h-72 xl:h-96 md:h-56 sm:h-60 h-48'>
            <div className='flex flex-col items-start'>
              <h1 className='text-primary lg:text-6xl xl:text-6xl md:text-5xl sm:text-3xl text-2xl font-black font-sans tracking-tight leading-tight uppercase'>DESSERTS</h1>
              <Link href="/menu/DESSERTS" className="text-xl px-2 font-black font-sans tracking-tight leading-tight flex uppercase items-center">VIEW DESSERTS<ChevronRight/></Link>
            </div>
          </div>
          <div className='lg:mt-20'>
            <div className='flex flex-col items-start'>
              <h1 className='text-white lg:text-6xl xl:text-6xl md:text-5xl sm:text-3xl text-2xl font-black font-sans tracking-tight leading-tight uppercase'>VALUE PACKS</h1>
              <Link href="/" className="text-xl text-white px-2 font-black font-sans tracking-tight leading-tight flex uppercase items-center">VIEW VALUE PACKS<ChevronRight/></Link>
            </div>
          </div>
        </div>
        <img className='w-full' src="/image.png" alt="Hero_Image" />
        <section className='w-full h-full bg-[#da291c] py-4 text-center'>
          <div>
            <h1 className='xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-10'>COME ONE, COME ALL TO CICIS PIZZA TODAY</h1>
          </div>
          <div>
            <p className='xl:text-2xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-5 tracking-tight'>Come to Cicis for the all-you-can eat experience or order now to bring the deliciousness home.</p>
          </div>
          <div className='my-12'>
              <button className='bg-white uppercase gap-4 text-primary px-14 py-3 rounded-full text-xl items-center font-[1000] font-serif'>VIEW CART</button>
          </div>
        </section>
    </section>
  )
}

export default HeroLabel
