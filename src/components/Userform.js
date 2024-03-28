"use client";
import React, { useState } from 'react';
import EditableImage from '@/components/EditableImage';
import { useProfile } from './UseProfile';

export default function UserForm({user,onSave})
{
    const [userName,setUserName]=useState(user?.name || '');
    const [email,setEmail]=useState(user?.email || '');
    const [phone,setphone]=useState(user?.phone || '');
    const [streetAddress,setstreetAddress]=useState(user?.streetAddress || '');
    const [postalCode,setpostalCode]=useState(user?.postalCode || '');
    const [city,setcity]=useState(user?.city || '');
    const [country,setcountry]=useState(user?.country || '');
    const [image,setimage]=useState(user?.image || '');
    const [admin,setadmin]=useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    return(
        <form className='max-w-xl mx-auto mt-8' onSubmit={e=>onSave(e,{name:userName,image:image,streetAddress,phone,postalCode,city,country,admin})}>
            <div className='flex gap-4'>
                <div>
                    <div className='p-2 rounded-lg relative max-w-[140px]'>
                        <EditableImage link={image} setlink={setimage} label={"Change Avatar"}/>
                        {/* <button type='button' className='btn'>Change Avatar</button>     */}
                    </div>
                </div>
                <div className='grow'>
                    <label>First and Last Name</label>
                    <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='First and Last Name'/>

                    <label>Email</label>
                    <input type="email" disabled={true} value={email} placeholder='Email'/>

                    <label>Phone</label>
                    <input type='tel' value={phone} onChange={(e)=>setphone(e.target.value)} placeholder='Phone Number'/>

                    <label>Street Address</label>
                    <input type='text' value={streetAddress} onChange={(e)=>setstreetAddress(e.target.value)} placeholder='Street Address'/> 
                    <div className='flex justify-between'>
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
                    {loggedInUserData.admin && (
                        <div>
                            <label className='p-2 inline-flex items-center gap-2 mb-2' htmlFor="admincb">
                                <input id='admincb' checked={admin} onClick={e => setadmin(e.target.checked)} type="checkbox" className='mr-2'/>
                                Admin
                            </label>
                        </div>
                    )}
                    <button type='submit' className='btn submit'>Save</button>
                </div>
            </div>
        </form>
    );
}