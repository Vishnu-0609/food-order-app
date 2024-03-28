"use client"
import React,{useEffect, useState} from 'react'
import Image from 'next/image'
import MenuItems from './Menu/MenuItems'
import SectionHeaders from './SectionHeaders'
import Link from 'next/link'

function HomeMenu() {
    const [bestSellers,setBestSellers] = useState([]);
    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(menuItems=>{
                let bestSeller = menuItems.filter((item)=>item.itemType === "Non-Vegetarian").slice(-3);
                setBestSellers(bestSeller);
            })
        })
    },[])

  return (
    <section>
        <section className='w-full h-full bg-white py-4 text-center'>
          <div>
            <h1 className='xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-primary font-black pt-10'>MORE OFFERS, DEALS, AND DELIGHTS</h1>
          </div>
          <div>
            <h1 className='xl:text-2xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-black font-black pt-5 tracking-tight'>Discover our current deals and coupons for your favorites at Cicis Pizza.</h1>
          </div>
          <div className='w-full flex-col justify-center align-middle my-8'>
            <div className='flex justify-center'>
              <img className='rounded-2xl' src="pizza-buffet.webp" alt="" />
            </div>
            <div className='mt-8'>
              <SectionHeaders mainHeader={"Non Vegetarian Items"} subHeader={"Check Out Non Vegetarian"}/>
            </div>
            <div className='grid grid-cols-3 gap-4 mt-8 px-4'>
                {bestSellers.length > 0 && bestSellers.map((menuItem)=>(
                    <MenuItems key={menuItem._id} name={menuItem.name} image={menuItem.image} description={menuItem.description} basePrice={menuItem.basePrice}/>
                ))}
            </div>
          </div>
          <div>
            <Link href={"/NonVeg"} className='bg-primary uppercase gap-4 text-white px-14 py-3 rounded-full text-xl items-center font-[1000] font-serif'>CHECK OUT NON-VEG</Link>
          </div>
        </section>
    </section>
  )
}

export default HomeMenu
