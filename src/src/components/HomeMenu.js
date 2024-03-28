import React from 'react'
import Image from 'next/image'
import MenuItems from './Menu/MenuItems'
import SectionHeaders from './SectionHeaders'

function HomeMenu() {
  return (
    <section>
        <div className='absolute left-0 right-0 w-full justify-start'>
            <div className='absolute -left-10 -top-[300px] -z-10'>
                <Image src={'/broc11.png'} width={300} height={300} alt={'sallad'}/>
            </div>
            <div className='absolute -top-[168px] -right-10 -z-10 overflow-auto'>
                <Image src={'/broc22.png'} width={300} height={300} alt={'sallad'}/>
            </div>
        </div>
        <div className='text-center'>
            <SectionHeaders subHeader={'check out'} mainHeader={'Menu'}/>
        </div>
        <div className='grid grid-cols-3 gap-4 mt-8'>
            <MenuItems/>
            <MenuItems/>
            <MenuItems/>
            <MenuItems/>
            <MenuItems/>
            <MenuItems/>
        </div>
    </section>
  )
}

export default HomeMenu
