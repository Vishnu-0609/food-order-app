"use client"
import EditableImage from "@/components/EditableImage.js";
import Tabs from "../../../components/Tabs.js";
import {useProfile} from "../../../components/UseProfile.js";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link.js";
import Left from "../../../components/Icons/Left.js";
import { redirect } from "next/navigation";
import CategoryForm from "@/components/CategoryForm.js";

export default function NewCategory()
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
            const response = await fetch('/api/categories',{
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
        return redirect('/categories');
    }

    return(
        <section className="mt-28 mb-8">
            <Tabs isAdmin={true}/>
            <div className="max-w-2xl mx-auto mt-8">
                <Link href="/categories" className="button">
                    <Left/>
                    <span>Show all Category</span>    
                </Link>
            </div>
            <CategoryForm onsubmit={handleformsubmit} categoryInfo={null}/>
        </section>
    )
}