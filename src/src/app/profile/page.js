"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { resolve } from 'path';
import { rejects } from 'assert';
import Link from 'next/link';
import Tabs from '../../components/Tabs';

export default function ProfilePage()
{
    const session =useSession();
    const [userName,setUserName]=useState('');
    const [phone,setphone]=useState('');
    const [streetAddress,setstreetAddress]=useState('');
    const [postalCode,setpostalCode]=useState('');
    const [city,setcity]=useState('');
    const [country,setcountry]=useState('');
    const [isAdmin,setIsAdmin]=useState(false);
    const [file,setfile]=useState();
    const [image,setimage]=useState(false);
    const {status}=session;
    // https://lh3.googleusercontent.com/a/ACg8ocJpENG5DRhwfZ0WQIpTEj39EAyWyHirDASPG_fcLZ5C8w=s96-c
    const handleprofileinfoupdate=async (e)=>
    {
        e.preventDefault();
        
        const savingPromise = new Promise(async (resolve,reject)=>
        {
            const response=await axios.put('/api/profile',JSON.stringify({name:userName,image:image,streetAddress,phone,postalCode,city,country}),{
                headers:{'Content-Type':'application/json'},
            })
            const data=await response.data;
            if(data)
            {
                resolve();
            }
            else
            {
                reject();
            }
        })

        await toast.promise(
            savingPromise,
             {
               loading: 'Saving...',
               success: <b>Profile Saved!</b>,
               error: <b>Could not save.</b>,
             }
           );
    }

    const handlefilechange=async(e)=>
    {
        e.preventDefault();
        
        const file = e.target.files?.[0];
        const data = new FormData();
        data.set('file',file);

        const savedavatar = new Promise(async (resolve,reject)=>
        {
            try
            {
                const result = await fetch('/api/upload',{
                    method:'POST',
                    body:data
                })
                const link = await result.json();
                if(link)
                {
                    resolve();
                    setimage(link);
                }
                else
                {
                    reject();
                }
            }
            catch(error)
            {
                reject();
            }   
        })

        await toast.promise(
            savedavatar,
                {
                loading: 'Uploading...',
                success: <b>Uploaded Successfully!</b>,
                error: <b>Could not Upload.</b>,
                }
            );
    }

    useEffect(()=>
    {
        if(status === 'authenticated')
        {
            setUserName(session?.data?.user?.name);
            setimage(session?.data?.user?.image);
            fetch('/api/profile').then(response=>{
                response.json().then(data=>{
                    setphone(data.phone);
                    setstreetAddress(data.streetAddress);
                    setcity(data.city);
                    setcountry(data.country);
                    setpostalCode(data.postalCode);
                    setIsAdmin(data.admin);
                })
            });
        }
    },[session,status])

    if(status === 'loading')
    {
        return 'Loading...';
    }

    if(status === 'unauthenticated')
    {
        return redirect('/login');
    }

    return(
        <section className="mt-8">
            <Tabs isAdmin={isAdmin}/>
            <form className='max-w-xl mx-auto mt-8' onSubmit={handleprofileinfoupdate}>
                <div className='flex gap-4'>
                    <div>
                        <div className='p-2 rounded-lg relative max-w-[140px]'>
                            {image && (
                                <Image className='rounded-lg w-full h-full mb-2' src={image} alt={'avatar'} width={250} height={250}></Image>
                            )}
                            <label>
                                <input type="file" name='file' className='hidden' onChange={handlefilechange}/>
                                <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>Change Avatar</span>
                            </label>
                            {/* <button type='button' className='btn'>Change Avatar</button>     */}
                        </div>
                    </div>
                    <div className='grow'>
                        <label>First and Last Name</label>
                        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='First and Last Name'/>

                        <label>Email</label>
                        <input type="email" disabled={true} value={session?.data?.user?.email} placeholder='Email'/>

                        <label>Phone</label>
                        <input type='tel' value={phone} onChange={(e)=>setphone(e.target.value)} placeholder='Phone Number'/>

                        <label>Street Address</label>
                        <input type='text' value={streetAddress} onChange={(e)=>setstreetAddress(e.target.value)} placeholder='Street Address'/> 
                        <div className='flex gap-2'>
                            <div>
                                <label>Postal Code</label>
                                <input type='text' value={postalCode} onChange={(e)=>setpostalCode(e.target.value)} placeholder='Postal code'/> 
                            </div>
                            <div>
                                <label>City</label>
                                <input type='text' value={city} onChange={(e)=>setcity(e.target.value)} placeholder='City'/> 
                            </div>
                        </div>
                        <label>Country</label>
                        <input type='text' value={country} onChange={(e)=>setcountry(e.target.value)} placeholder='Country'/> 
                        <button type='submit' className='btn submit'>Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}