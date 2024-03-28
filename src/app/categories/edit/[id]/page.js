"use client"
import EditableImage from "@/components/EditableImage.js";
import Tabs from "../../../../components/Tabs.js";
import {useProfile} from "../../../../components/UseProfile.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link.js";
import Left from "../../../../components/Icons/Left.js";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm.js";
import DeleteModel from "@/components/DeleteModel.js";
import CategoryForm from "@/components/CategoryForm.js";

export default function EditCategory()
{
    const {id} = useParams();
    const {loading,data} = useProfile();
    const [redirectToCategory,setRedirectToCategory] =useState(false);
    const [category,setCategory] = useState([]);

    useEffect(()=>
    {
        getCategories();
    },[])

    function getCategories()
    {
        fetch('/api/categories').then((res)=>
        {
            res.json().then((categories)=>{
                const item = categories.find((i)=> i._id == id);
                setCategory(item);
            })
        })
    }

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
        const data1 = {...data,_id:id};
        console.log(data1);

        const savingpromise = new Promise(async(resolve,reject)=>
        {
            const response = await fetch('/api/categories',{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data1),
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

        setRedirectToCategory(true);
    }

    const deleteMenuItems = async(id) =>
    {
        const deletionPromise = new Promise(async(resolve,reject)=>
        {
            const response = await fetch('/api/categories?_id='+id,{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},
            })
            if(response.ok)
            {
                resolve();
            }
            else
            {
                reject();
            }
        });

        await toast.promise(deletionPromise,{
            loading:'Deleting...',
            success:'Deleted Successfully!',
            error:'something went wrong!'
        })
        setRedirectToCategory(true);
    }

    if(redirectToCategory)
    {
        return redirect('/categories');
    }

    return(
        <section className="mt-28 mb-8">
            <Tabs isAdmin={true}/>
            <div className="max-w-2xl mx-auto mt-8">
                <Link href="/categories" className="button">
                    <Left/>
                    <span>Show all Categories</span>    
                </Link>
            </div>
            <CategoryForm onsubmit={handleformsubmit} categoryInfo={category}/>
            <div className="max-w-2xl mx-auto mt-2">
                <div className="max-w-xl ml-auto pl-16">
                    <DeleteModel label={'Delete this menu items'} onDelete={()=>{deleteMenuItems(id)}} className={'button'}/>
                </div>
            </div>
        </section>
    )
}