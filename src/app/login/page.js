"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link';
import { signIn } from "next-auth/react"
import { signOut, useSession } from 'next-auth/react';

function LoginPage() {
    const session = useSession();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [loginprogress,setloginprogress]=useState(false);

    const handleFormSubmit=async (e)=>
    {
      e.preventDefault();
      console.log("hii");
      setloginprogress(true);
      
      // signIn('credentials',{email,password});
      await signIn('credentials',{email,password});

      setloginprogress(false);
      console.log(session);
    }

  return (
    <section className='mt-28 my-4'>
        <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
        <form className='block max-w-xl mx-auto' onSubmit={handleFormSubmit}>
            <input type="email" name='email' placeholder='Email' value={email} disabled={loginprogress} onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" name='password' placeholder='password' value={password} disabled={loginprogress} onChange={(e)=>setpassword(e.target.value)}/>
            <button type='submit' className='btn submit' disabled={loginprogress}>Login</button>
            <div className='my-4 text-center text-gray-500'>
                or login with provider
            </div>
            {/* type="button" */}
            <button type='button' onClick={()=>signIn('google',{callbackUrl:'/'})} className='w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 flex gap-4 justify-center'>
              <Image src={'/google-logo.png'} alt={''} width={32} height={32} />
              <h4 className='py-1'>Login With Google</h4>
            </button>
        </form>
    </section>
  )
}

export default LoginPage
