"use client";
import SectionHeaders from "@/components/SectionHeaders";
import { useContext,useEffect,useState } from "react";
import {CartContext} from "../../components/AppContext.js";
import Image from "next/image.js";
import Trash from "@/components/Icons/Trash.js";
import {cartProductPrice} from "../../components/AppContext.js";
import AddressInputs from "@/components/AddressInput.js";
import { useProfile } from "@/components/UseProfile.js";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function CartPage()
{
    const {cartProducts,removeCartProduct,CartTotalPrice} = useContext(CartContext);

    const {data:profileData} = useProfile();
    console.log(profileData);
    console.log(profileData.phone);

    const [phone,setphone]=useState('');
    const [streetAddress,setstreetAddress]=useState('');
    const [postalCode,setpostalCode]=useState('');
    const [city,setcity]=useState('');
    const [country,setcountry]=useState('');

    useEffect(()=>{
        setphone(profileData?.phone);
        setstreetAddress(profileData?.streetAddress);
        setpostalCode(profileData?.postalCode);
        setcity(profileData?.city);
        setcountry(profileData?.country);
    },[profileData])

    function handleAddressChange(propName,value)
    {
        if(propName === 'city') setcity(value);
        if(propName === 'country') setcountry(value);
        if(propName === 'phone') setphone(value);
        if(propName === 'streetAddress') setstreetAddress(value);
        if(propName === 'postalCode') setpostalCode(value);
    }

    const handleformsubmit = (e) =>
    {
        e.preventDefault();
        console.log(phone);
        console.log(streetAddress);
        console.log(postalCode);
        console.log(city);
        console.log(country);
    }

    const session = useSession();
    const status = session.status;

    if(status === "unauthenticated")
    {
        return redirect('/login');
    }

    return(
        <section className="mt-16 p-12">
            <div className="text-center">
                <SectionHeaders mainHeader={"Cart"}/>
            </div>
            <div className="mt-4 grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No Items in Your Cart</div>
                    )}

                    {cartProducts?.length > 0 && cartProducts.map((item,index)=>(
                        
                        <div key={item[0]._id} className="flex gap-4 mb-2 border-b py-2 items-center">
                            <div className="w-1/3">
                                <Image src={item[0].image} alt={item[0].name} width={240} height={240}/>
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{item[0].name}</h3>
                                {item[1] && (
                                    <div className="text-sm text-gray-600">Size: <span>{item[1]?.name}</span></div>
                                )}
                                {item[2]?.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        {item[2].map((extra)=>(
                                            <div key={extra?._id}>{extra?.name+" : "}{extra?.price}/-</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold">
                                {cartProductPrice(item)}/-
                            </div>
                            <div className="ml-4">
                                <button type="button" onClick={()=>removeCartProduct(index)} className="text-primary"><Trash/></button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end pr-14 py-4">
                        <div className="text-lg font-semibold flex gap-4">
                            <span className="text-xl">SubTotal: </span>
                            <span>{CartTotalPrice()}/-</span>
                        </div>
                    </div>
                </div>
                <div className="gird grid-rows-2">
                    <div className="bg-gray-100 flex flex-col justify-center p-4 rounded-lg">
                        <h2 className="text-center text-xl font-black text-primary">CheckOut</h2>
                        <form action="">
                        <AddressInputs addressProps={{phone,streetAddress,postalCode,city,country}} setAddressProps={handleAddressChange}/>
                        <button onClick={(e)=>handleformsubmit(e)} className="btn submit mt-8">Pay {CartTotalPrice()} /-</button>  
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}