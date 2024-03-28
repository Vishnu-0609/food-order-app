"use client"
import EditableImage from "@/components/EditableImage.js";
import Tabs from "../../../components/Tabs.js";
import {useProfile} from "../../../components/UseProfile.js";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link.js";
import Left from "../../../components/Icons/Left.js";
import { redirect } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm.js";

export default function NewMenuItems()
{
    const {loading,data} = useProfile();
    const [redirectToItems,setRedirectToItems] =useState(false);

    if(loading)
    {
        return "Loading user info...";
    }

    if(!data.admin)
    {
        return "Not an Admin";
    }

    const handleformsubmit = async(e,data) =>
    {
        e.preventDefault();
        // console.log(data);
        const savingpromise = new Promise(async(resolve,reject)=>
        {
            const response = await fetch('/api/menu-items',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
            })
            if(response.ok)
            {
                resolve();
            }
            else
            {
                reject();
            }
        })

        await toast.promise(savingpromise,{
            loading:'Saving items Info...',
            success:'Saved!',
            error:'Error!'
        })

        setRedirectToItems(true);
    }

    if(redirectToItems)
    {
        return redirect('/menu-items');
    }

    return(
        <section className="mt-28 mb-8">
            <Tabs isAdmin={true}/>
            <div className="max-w-lg mx-auto mt-8">
                <Link href="/menu-items" className="button">
                    <Left/>
                    <span>Show all menu items</span>    
                </Link>
            </div>
            <MenuItemForm onsubmit={handleformsubmit} menuItem={null}/>
        </section>
    )
}