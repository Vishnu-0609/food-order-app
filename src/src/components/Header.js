"use client";
import React from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

function Header() {
  const session = useSession();
  let userName = session.data?.user.name || session.data?.user.email; 
  const status = session.status;

  if(userName?.includes(' '))
  {
    userName = userName.split(' ')[0];
  }
  return (
    <>
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-8 text-gray-700 font-semibold">
              <Link className="text-red-500 font-semibold text-2xl" href={'/'}>
              ST PIZZA
              </Link>
              <Link href={'/'}>Home</Link>
              <Link href={''}>Menu</Link>
              <Link href={''}>About</Link>
              <Link href={''}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-700 font-semibold'>
              {status === 'authenticated' && (
                <>
                  <Link href={'/profile'} className='whitespace-nowrap'>
                    Hello,{" "+userName}
                  </Link>
                  <button onClick={()=>signOut()} className="bg-primary text-white px-6 rounded-full py-2">Logout</button>  
                </>
              )}

              {status !== 'authenticated' && (
                <>
                  <Link href={'/login'} className="bg-primary text-white px-6 rounded-full py-2">Login</Link>
                  <Link href={'/register'} className="bg-primary text-white px-6 rounded-full py-2">Register</Link>
                </> 
              )}
            </nav>
        </header>
    </>
  )
}

export default Header
