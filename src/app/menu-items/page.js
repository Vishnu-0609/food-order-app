"use client"
import EditableImage from "@/components/EditableImage.js";
import Tabs from "../../components/Tabs.js";
import {useProfile} from "../../components/UseProfile.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link.js";
import Right from "@/components/Icons/Right.js";
import Image from 'next/image'

export default function MenuItemsPage()
{
    const {loading,data} = useProfile();
    const [menuItems,setMenuItems] = useState([]);

    useEffect(()=>
    {
        fetch('/api/menu-items').then((res)=>
        {
            res.json().then((menuitems)=>
            {
                setMenuItems(menuitems);
            })
        })
    },[])

    if(loading)
    {
        return "Loading user info...";
    }

    if(!data.admin)
    {
        return "Not an Admin";
    }

    
    console.log(menuItems);
    return(
        <section className="mt-28 max-w-lg mx-auto mb-8">
            <Tabs isAdmin={true}/>
            <div className="mt-8">
                <Link className="button" href={'/menu-items/new'}><span>Create New Items</span><Right/></Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map((item)=>(
                        <Link key={item._id} href={'/menu-items/edit/'+item._id} 
                            className="bg-gray-300 rounded-lg p-4"
                        >
                            <div className="relative">
                                <Image className="rounded-md" src={item.image} alt={''} width={200} height={200}/>
                            </div>
                            <div className="text-center">
                            {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}