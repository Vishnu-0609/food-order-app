"use client";
import React, { useContext, useState } from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from './AppContext';
import Cart from './Icons/Cart';

function Header() {
  const session = useSession();
  let userName = session.data?.user.name || session.data?.user.email; 
  const status = session.status;

  const [toggle,settoggle] = useState(false);

  const {cartProducts} = useContext(CartContext);

  if(userName?.includes(' '))
  {
    userName = userName.split(' ')[0];
  }

  const togglefunc = () =>
  {
    settoggle(!toggle);
  }

  return (
    <>
        <header className="header" id="header">
          <nav className="navbar container">
            <section className="navbar__left">
              <div className="burger" onClick={togglefunc} id="burger">
                <span className="burger-line"></span>
                <span className="burger-line"></span>
                <span className="burger-line"></span>
              </div>
              <Link className="text-red-500 font-semibold xl:text-3xl lg:text-3xl md:text-3xl text-lg" href={'/'}>
                ST PIZZA
              </Link>
            </section>
            <section className="navbar__center">
              <span className={toggle?'overlay is-active':'overlay'} onClick={togglefunc}></span>
              <div className={toggle?'menu is-active':'menu'} id="menu">
                <div className="menu__header">
                  <span className="menu__arrow"><i className="bx bx-chevron-left"></i></span>
                  <span className="menu__title"></span>
                </div>
                <ul className="menu__inner">
                  <li className="menu__item">
                    <Link href={'/'} className="menu__link">Home</Link>
                  </li>
                  <li className="menu__item">
                    <Link href={'/menu/PIZZAS'} className="menu__link">Menu</Link>
                  </li>
                  <li className="menu__item">
                    <Link href={'/About'} className="menu__link">About</Link>
                  </li>
                  <li className="menu__item">
                    <Link href={'/#contact'} className="menu__link">Contact</Link>
                  </li>
                  <li className="menu__item">

                    {status === 'authenticated' && (
                      <>
                        <Link href={'/profile'} className='whitespace-nowrap mr-4 ml-4 font-black'>
                          Hello,{" "+userName}
                        </Link>
                        <button onClick={()=>signOut({callbackUrl:'/'})} className="bg-primary text-white px-6 rounded-full py-2">Logout</button>  
                      </>
                    )}

                    {status !== 'authenticated' && (
                      <>
                        <div className="flex gap-2 my-4 mx-2">
                          <Link href={'/login'} className="bg-primary text-white px-6 rounded-full py-2">Login</Link>
                          <Link href={'/register'} className="bg-primary text-white px-6 rounded-full py-2">Register</Link>
                        </div>
                      </> 
                    )}
                  </li>
                </ul>
              </div>
            </section>
            <Link href={"/cart"} type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-red-800">
              <Cart/>
              <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{cartProducts?.length}</div>
            </Link>
          </nav>
      </header>
    </>
  )
}

export default Header

{/* <nav className="flex items-center gap-8 text-gray-700 font-semibold">
              <Link className="text-red-500 font-semibold xl:text-3xl lg:text-3xl md:text-3xl text-lg" href={'/'}>
              ST PIZZA
              </Link>
              <Link href={'/'}>Home</Link>
              <Link href={'/menu'}>Menu</Link>
              <Link href={'/#about'}>About</Link>
              <Link href={'/#contact'}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-700 font-semibold'>
              {status === 'authenticated' && (
                <>
                  <Link href={'/profile'} className='whitespace-nowrap'>
                    Hello,{" "+userName}
                  </Link>
                  <button onClick={()=>signOut({callbackUrl:'/'})} className="bg-primary text-white px-6 rounded-full py-2">Logout</button>  
                </>
              )}

              {status !== 'authenticated' && (
                <>
                  <Link href={'/login'} className="bg-primary text-white px-6 rounded-full py-2">Login</Link>
                  <Link href={'/register'} className="bg-primary text-white px-6 rounded-full py-2">Register</Link>
                </> 
              )}
              <Link href={'/cart'} className='btn submit'>Cart({cartProducts.length})</Link>
            </nav> */}