"use client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import MenuItems from "@/components/Menu/MenuItems";
import Link from "next/link";
import ChevronRight from "@/components/Icons/Cheron-rigth";

export default function NonVegPage()
{
    const [Menuitems,setMenuitems] = useState([]);
    const [VegetarianItems,setVegetarianItems] = useState([]);
    const [NonVegetarianItems,setNonVegetarianItems] = useState([]);

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                setMenuitems(items);
                // console.log(items.filter((item)=>item.itemType === "Vegetarian"));
                // console.log(items.filter((item)=>item.itemType === "Non-Vegetarian"));
                setNonVegetarianItems(items.filter((item)=>item.itemType === "Non-Vegetarian"));
                setVegetarianItems(items.filter((item)=>item.itemType === "Vegetarian"));
            })
        })
    },[])
    

    return(
        <div>
            <section className="mt-16 menu-image flex justify-center items-center">
                <h1 className="xl:text-5xl lg:text-5xl md:text-3xl sm:text-2xl text-xl font-sans text-white font-black xl:py-8 lg:py-8 md:py-8 sm:py-0 py-0 ">Non Vegetarian Items</h1>
            </section>
            <div className='grid grid-cols-3 gap-4 mt-12 px-24'>
                {NonVegetarianItems.length > 0 && NonVegetarianItems.map((menuItem)=>(
                    <MenuItems key={menuItem._id} name={menuItem.name} image={menuItem.image} description={menuItem.description} basePrice={menuItem.basePrice}/>
                ))}
            </div>
            <div className="my-12 px-24">
                <div className="">
                    <h1 className="text-black xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-extrabold">Other Vegetarian Items</h1>
                </div>
                <div className="flex justify-center align-middle items-center">
                    <section className="slider mt-12 px-12 bg-white">
                        {VegetarianItems?.length > 0 && VegetarianItems?.map((Item)=>(
                            <div key={Item._id} className="flex flex-col slide items-center">
                                <figure className="slide__image-container">
                                    <img src={Item.image} width="300" height="300" alt=""/>
                                </figure>
                                <article className="slide__text">
                                    <h2 className="text-2xl font-extrabold">{Item.name}</h2>
                                    <Link href={`/Items/${Item._id}`} type='button' className='text-primary font-black font-mono rounded-full px-8 py-2 mt-4 flex mx-auto justify-center hover:underline'><span>VIEW MENU ITEM</span><ChevronRight/></Link>
                                </article>
                            </div>
                        ))}
                    </section>
                    <div className="text-primary">
                        <ChevronRight className="w-10 h-10"/>
                    </div>
                </div>
            </div>
        </div>
    )
}