"use client";
import Tabs from "@/components/Tabs";
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/Userform";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditUserPage()
{
    const {id} = useParams();
    const [user,setuser] = useState();

    useEffect(()=>
    {
        fetch('/api/users?_id='+id,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        }).then((res)=>{
            res.json().then((data)=>
            {
                setuser(data);
            })
        })
    },[]);

    const handleuserprofileinfoupdate = async(e,data) =>
    {
        e.preventDefault();
        
        const savingPromise = new Promise(async (resolve,reject)=>
        {
            const response=await axios.put('/api/users?id='+id,JSON.stringify(data),{
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

    const {loading,data} = useProfile();

    if(loading)
    {
        return "Loading User Info...";
    }

    if(!data.admin)
    {
        return "Not an Admin";
    }

    return(
        <section className="mt-28 mx-auto max-w-xl my-4">
            <Tabs isAdmin={true}/>
            <UserForm user={user} onSave={handleuserprofileinfoupdate}/>
        </section>
    );
}