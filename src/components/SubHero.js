"use client"
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import MenuItems from './Menu/MenuItems'
import SectionHeaders from './SectionHeaders'
import Link from 'next/link';

function SubHero()
{
  return (
    <section className='flex flex-col items-center w-100 h-100 bg-gradient-to-t from-[#f4f3e9] to-white mt-12'>
        <div className='mt-10 flex items-center'>
          <div className='h-1 w-12 bg-primary mr-4'></div>
          <div className="text-primary text-xl">
            <p className='font-black text-primary tracking-tight font-sans'>ENDLESS PIZZABILITIES<sup className='text-sm'><small>TM</small></sup></p>
          </div>
          <div className='h-1 w-12 bg-primary ml-4'></div>
        </div>
        <div>
            <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-serif text-primary font-black py-10'>IF YOU CAN DREAM IT WE CAN MAKE IT</h1>
        </div>
        <div>
            <p className='xl:text-2xl lg:text-xl md:text-lg sm:text-md sm:p-4 text-center font-black'>On our menu, imagination takes center stage. Feast your eyes on our latest pizza, pasta, salad, and dessert innovations.</p>
        </div>
        <div className='mt-12 mb-12'>
            <Link href={'menu/PIZZAS'} className='bg-primary uppercase gap-4 text-white px-14 py-3 rounded-full text-lg items-center font-[1000] font-sans'>EXPLORE OUR FULL MENU</Link>
        </div>
    </section>
  )
}

export default SubHero
