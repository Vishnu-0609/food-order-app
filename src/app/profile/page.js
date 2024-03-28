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
import EditableImage from '@/components/EditableImage';
import UserForm from '@/components/Userform';

export default function ProfilePage()
{
    const session =useSession();
    const [user,setuser] = useState(null);
    const [isAdmin,setIsAdmin]=useState(false);
    const [profileFetched,setProfileFetched]=useState(false);
    const {status}=session;

    // https://lh3.googleusercontent.com/a/ACg8ocJpENG5DRhwfZ0WQIpTEj39EAyWyHirDASPG_fcLZ5C8w=s96-c

    const handleprofileinfoupdate=async(e,data)=>
    {
        e.preventDefault();
        
        const savingPromise = new Promise(async (resolve,reject)=>
        {
            const response=await axios.put('/api/profile',JSON.stringify(data),{
                headers:{'Content-Type':'application/json'},
            })
            const responsedata=await response.data;

            if(responsedata)
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

    useEffect(()=>
    {
        if(status === 'authenticated')
        {
            fetch('/api/profile').then(response=>{
                response.json().then(data=>{
                    setuser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    },[session,status])

    if(status === 'loading' || !profileFetched)
    {
        return 'Loading...';
    }

    if(status === 'unauthenticated')
    {
        return redirect('/login');
    }

    return(
        <section className="mt-28 mb-8">
            <Tabs isAdmin={isAdmin}/>
            <UserForm user={user} onSave={handleprofileinfoupdate}/>
        </section>
    );
}