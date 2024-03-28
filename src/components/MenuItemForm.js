"use client";
import EditableImage from "@/components/EditableImage.js";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemsPriceProps.js";

export default function MenuItemForm({onsubmit,menuItem})
{
    const [image,setimage] =useState(menuItem?.image || "");
    const [name,setname] =useState(menuItem?.name || "");
    const [description,setdescription] =useState(menuItem?.description || "");
    const [baseprice,setbaseprice] =useState(menuItem?.basePrice || "");
    const [sizes,setSizes] = useState(menuItem?.sizes || []);
    const [ingredients,setIngredients] = useState(menuItem?.ingredients || []);
    const [category,setCategory] = useState(menuItem?.category || "");
    const [subcategory,setSubCategory] = useState(menuItem?.subCategory || "");
    const [ItemType,setItemType] = useState(menuItem?.itemType || "");
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                console.log("Menu Item= ");
                console.log(menuItem);
                setCategories(categories);
            })
        })
    },[])

    // function addSize()
    // {
    //     setSizes(oldSizes=>{
    //         return [...oldSizes,{name:'',price:''}];
    //     });
    // }

    // function editsize(e,index,prop)
    // {
    //     const newvalue = e.target.value;
    //     setSizes(prevSizes=>{
    //         const newSizes = [...prevSizes];
    //         newSizes[index][prop] = newvalue;
    //         return newSizes;
    //     });
    // }

    // function removeSize(index)
    // {
    //     setSizes(prev => prev.filter((v,i)=>i!==index))
    // }

    return(
        <form action="" className="mt-8 max-w-lg mx-auto" 
        onSubmit={(e)=>{onsubmit(e,{image,name,description,baseprice,sizes,ingredients,category,subCategory:subcategory,itemType:ItemType})}}
        >
            <div className="flex gap-4 items-start">
                <div className='p-2 rounded-lg relative max-w-[140px]'>
                    <EditableImage link={image} setlink={setimage} label={"Edit"}/>
                </div>
                <div className="grow">
                    <label htmlFor="">Item Name</label>
                    <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                    <label htmlFor="">Description</label>
                    <textarea type="text" rows={6} value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
                    <label htmlFor="">Category</label>
                    <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                        <option>Select Category</option>
                        {categories.map((data)=>(
                            <option key={data._id} value={data._id}>{data.name}</option>
                        ))}
                    </select>
                    <label htmlFor="">Sub Category</label>
                    <select value={subcategory} onChange={(e)=>setSubCategory(e.target.value)}>
                        <option>Select SubCategory</option>
                        {category!=="" && categories.filter((data)=>data._id === category)[0]?.subCategory.map((data)=>(
                            <option key={data._id} value={data._id}>{data.name}</option>
                        ))}
                    </select>
                    <label htmlFor="">Item Type</label>
                    <select value={ItemType} onChange={(e)=>setItemType(e.target.value)}>
                        <option>Select Type</option>
                        <option value={"Vegetarian"}>Vegetarian</option>
                        <option value={"Non-Vegetarian"}>Non-Vegetarian</option>
                    </select>
                    <label htmlFor="">Base Price</label>
                    <input type="text" value={baseprice} onChange={(e)=>{setbaseprice(e.target.value)}}/>
                    <MenuItemPriceProps props={sizes} setProps={setSizes} name="Sizes" addLabel="Add Item Size"/>
                    <MenuItemPriceProps props={ingredients} setProps={setIngredients} name="Extra ingredients" addLabel="Add Extra ingredients"/>
                    <button type="submit" className="btn submit">Save</button>
                </div>
            </div>
        </form>
    );
}