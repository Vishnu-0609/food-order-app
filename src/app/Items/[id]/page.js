"use client";
import { useParams } from "next/navigation"
import React,{ useEffect, useState , useContext } from "react";
import Link from "next/link";
import ChevronRight from "@/components/Icons/Cheron-rigth";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSession } from 'next-auth/react';

export default function ItemPage()
{
    const session = useSession();
    const status = session.status;

    const {id} = useParams();
    const [Menuitems,setMenuitems] = useState([]);
    const [CurrentMenuItems,setCurrentMenuItems] = useState([]);
    const [ExtraItems,setExtraItems] = useState([]);
    const {addToCart,cartProducts} = useContext(CartContext);
    const [selectedSize,setSelectedSize] = useState(null);
    const [selectedExtras,setSelectedExtras] = useState([]);

    const [visible, setVisible] = useState(false)

    function handleAddToCartButton()
    {
        console.log(status);

        if(status === "unauthenticated")
        {
            window.location.href = "http://localhost:3000/login";
        }
        else
        {
            if(visible)
            {
                console.log("hii");
                addToCart(CurrentMenuItems,selectedSize,selectedExtras);
                setSelectedSize(CurrentMenuItems.sizes[0]);
                setSelectedExtras([]);
                toast.success("Added to cart!");
                setVisible(false);
                return;
            }

            if(CurrentMenuItems?.sizes?.length === 0 && CurrentMenuItems?.ingredients?.length ===0)
            {
                addToCart(CurrentMenuItems);
                toast.success("Added to cart!");
            }
            else
            {
                setVisible(true);
            }
        }
    }

    function handleExtra(e,data)
    {
        const checked = e.target.checked;

        if(checked)
        {
            setSelectedExtras(prevExtras => [...prevExtras,data]);
        }
        else
        {
            setSelectedExtras(prevExtras => prevExtras.filter(e=>e.name !== data.name));
        }
    }

    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items=>{
                console.log(items);
                setMenuitems(items);
                setCurrentMenuItems(items.filter((item)=>item._id === id)[0]);
                setSelectedSize(items.filter((item)=>item._id === id)[0].sizes[0]);
                setExtraItems(items.slice(-10));
            })
        })
    },[])

    let selectedPrice = CurrentMenuItems?.basePrice;

    if(selectedSize)
    {
        selectedPrice += selectedSize.price;
    }

    if(selectedExtras?.length > 0)
    {
        for(const extra of selectedExtras)
        {
            selectedPrice += extra.price;
        }
    }


    return(
        <>
            <div id="modal" className={visible ? `flex items-center justify-center w-screen fixed top-0 bg-black bg-opacity-60 z-50 h-screen px-8` : `hidden`}>
                <div className="relative overflow-y-scroll bg-white max-w-xl w-full" style={{maxHeight:'calc(100vh - 150px)'}}> 
                    <div className="p-3 flex items-center justify-between border-b sticky top-0 bg-white border-b-gray-300">
                        <h3 className="font-semibold text-xl">Add To Cart</h3>
                        <span onClick={()=>setVisible(false)} className="modal-close cursor-pointer text-3xl">×</span>
                    </div>
                    <div className="p-3 border-b-gray-300 ">
                        <div className="flex justify-center">
                            <Image src={CurrentMenuItems.image} alt={CurrentMenuItems.image} width={300} height={200}/>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-center mb-2">{CurrentMenuItems.name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{CurrentMenuItems.description}</p>
                            {CurrentMenuItems?.sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pick Your Size</h3>
                                    {CurrentMenuItems?.sizes.map((size)=>
                                    (
                                        <label key={size._id} htmlFor="size" className="flex gap-2 items-center p-4 border rounded-md mb-1">
                                            <input onClick={()=>setSelectedSize(size)} checked={selectedSize?.name === size?.name} type="radio" name="size" />{size.name}&nbsp;&nbsp;{CurrentMenuItems.basePrice+size.price}/-
                                        </label>
                                    ))}
                                </div>
                            )}
                            {CurrentMenuItems?.ingredients?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any Extras? </h3>
                                    {CurrentMenuItems?.ingredients.map((ingredient)=>
                                    (
                                        <label htmlFor="" key={ingredient._id} className="flex gap-2 items-center p-4 border rounded-md mb-1">
                                            <input onClick={(e)=>handleExtra(e,ingredient)} type="checkbox" />{ingredient.name}&nbsp;&nbsp;+{ingredient.price}/-
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-3 flex items-center justify-start sticky bottom-0 border-t bg-white">
                        <div>
                            <button onClick={handleAddToCartButton} className="text-sm text-white bg-primary rounded-md px-4 py-2 mr-4">ADD TO CART {selectedPrice}/-</button>
                            <button onClick={()=>setVisible(false)} className="modal-close text-sm text-gray-400 border rounded-md px-4 py-2">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <section className="mt-16 item-image xl:px-12 lg:px-12 md:px-12 sm:px-36 px-24 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-0 gap-0">
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col justify-center items-start">
                            <h1 className="xl:text-5xl lg:text-5xl md:text-3xl sm:text-2xl text-xl font-sans text-white font-black xl:py-8 lg:py-8 md:py-8 sm:py-0 py-0 ">{CurrentMenuItems?.name}</h1>
                            <p className="xl:text-xl lg:text-xl md:text-lg sm:text-md text-md text-white font-semibold underline xl:py-2 lg:py-2 md:py-2 sm:py-1 py-1">Nutritional Information</p>
                            <p className="xl:text-xl lg:text-xl md:text-lg sm:text-md text-md text-white w-full">{CurrentMenuItems?.description}</p>
                        </div>
                        <div className="xl:py-8 lg:py-8 md:py-8 sm:py-2 py-2">
                            <button onClick={handleAddToCartButton} className="xl:px-14 xl:py-3 lg:px-14 lg:py-3 md:px-10 md:py-2 sm:px-10 sm:py-2 px-10 py-2 bg-black uppercase xl:gap-4 lg:gap-4 md:gap-1 sm:gap-1 gap-1 text-white rounded-full xl:text-lg lg:text-lg md:text-md sm:text-md text-md items-center font-[1000]">ADD TO CART</button>
                        </div>
                    </div>
                    <div className="xl:col-start-2 lg:col-start-2 md:col-start-2 sm:row-start-1 row-start-1">
                        <img className="w-68" src={`${CurrentMenuItems?.image}`} alt="" />
                    </div>
                </section>
                <div className="my-12 xl:px-24 lg:px-24 md:px-14 sm:px-4 px-2">
                    <div className="">
                        <h1 className="text-black xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-extrabold">ADD ON TO MAKE IT A MEAL</h1>
                    </div>
                    <div className="flex justify-center align-middle items-center">
                        <section className="slider mt-12 px-12 bg-white">
                            {ExtraItems?.length > 0 && ExtraItems?.map((Item)=>(
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
        </>
    )
}