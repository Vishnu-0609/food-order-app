"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

function RegisterPage() {
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [usercreated,setusercreated]=useState(false);
  const [creatinguser,setcreatinguser]=useState(false);
  const [error,seterror]=useState(false);

  const handleFormSubmit=async (e)=>
  {
    e.preventDefault();
    setcreatinguser(true);
    seterror(false);
    setusercreated(false);
    await axios.post('/api/register',JSON.stringify({email,password}),{
      headers:{'Content-Type':'application/json'},
    })
    .then(()=>
    {
      setusercreated(true);
    })
    .catch(()=>
    {
      seterror(true);
    })
    setcreatinguser(false);
  }

  // useState(async ()=>
  // {
  //   await axios.get('api/register',{
  //     headers:{'Content-Type':'application/json'},
  //   })
  //   .then((data)=>
  //   {
  //     console.log(data);
  //   })
  // },[])

  // useState(async ()=>
  // {
  //   await axios.post('../lau',{
  //     headers:{'Content-Type':'application/json'},
  //   })
  //   .then((data)=>
  //   {
  //     console.log(data);
  //   })
  // },[])

  return (
    <section className='mt-8'>
        <h1 className='text-center text-primary text-4xl mb-4'>Register</h1>
        {usercreated && (
          <div className='my-4 text-center'>
            User Created <br/>Now You Can{' '}<Link className='underline' href={"/login"}>Login &raquo;</Link> 
          </div>
        )}
        {error && (
          <div className='my-4 text-center'>
            An error has occured.<br/>
            Please try again later 
          </div>
        )}
        <form className='block max-w-xl mx-auto' onSubmit={handleFormSubmit}>
            <input type="email" placeholder='Email' value={email} disabled={creatinguser} onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" placeholder='password' value={password} disabled={creatinguser} onChange={(e)=>setpassword(e.target.value)}/>
            <button className='btn submit' disabled={creatinguser}>Register</button>
            <div className='my-4 text-center text-gray-500'>
                or login with provider
            </div>
            <button type='button' onClick={()=>signIn('google',{callbackUrl:'/'})} className='w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 flex gap-4 justify-center'>
              <Image src={'/google-logo.png'} alt={''} width={32} height={32} />
              <h4 className='py-1'>Login With Google</h4>
            </button>
            <div className='text-center my-4 text-gray-500 border-tpt-4'>
              Existing Account?{" "} <Link className='underline' href={'/login'}>Login Here &raquo;</Link>
            </div>
        </form>
    </section>
  )
}

export default RegisterPage
