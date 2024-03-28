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
import { resolve } from "path";
import DeleteModel from "@/components/DeleteModel.js";

export default function EditMenuItemPage()
{
    const {id} = useParams();
    const {loading,data} = useProfile();
    const [redirectToItems,setRedirectToItems] =useState(false);
    const [menuItem,setmenuItem] = useState([]);
    // const [image,setimage] =useState("");
    // const [name,setname] =useState("");
    // const [description,setdescription] =useState("");
    // const [baseprice,setbaseprice] =useState("");

    useEffect(()=>
    {
        getMenuItems();
    },[])

    function getMenuItems()
    {
        fetch('/api/menu-items').then((res)=>
        {
            res.json().then((items)=>{
                const item = items.find((i)=> i._id == id);
                setmenuItem(item);
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

        const savingpromise = new Promise(async(resolve,reject)=>
        {
            const response = await fetch('/api/menu-items',{
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

        setRedirectToItems(true);
    }

    const deleteMenuItems = async(id) =>
    {
        const deletionPromise = new Promise(async(resolve,reject)=>
        {
            const response = await fetch('/api/menu-items?_id='+id,{
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
            <MenuItemForm onsubmit={handleformsubmit} menuItem={menuItem}/>
            <div className="max-w-lg mx-auto mt-2">
                <div className="max-w-md ml-auto pl-24 max-w-96">
                    <DeleteModel label={'Delete this menu items'} onDelete={()=>{deleteMenuItems(id)}} className={'button'}/>
                    {/* <button type="button" onClick={()=>{deleteMenuItems()}} className="button">Delete this menu items</button> */}
                </div>
            </div>
        </section>
    )
}