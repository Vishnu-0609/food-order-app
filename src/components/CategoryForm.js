"use client";
import EditableImage from "@/components/EditableImage.js";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "./MenuItemsPriceProps.js";
import SubCategoryProps from "./SubCategoryprop.js";

export default function CategoryForm({onsubmit,categoryInfo})
{
    const [image,setimage] =useState(categoryInfo?.image || "");
    const [name,setname] =useState(categoryInfo?.name || "");
    const [description,setdescription] =useState(categoryInfo?.description || "");
    const [subCategory,setSubCategory] =useState(categoryInfo?.subCategory || "");
    const [category,setCategory] = useState(categoryInfo?.category || "");

    return(
        <form action="" className="mt-8 max-w-2xl mx-auto" 
        onSubmit={(e)=>{onsubmit(e,{image,name,description,subCategory})}}
        >
            <div className="flex gap-4 items-start">
                <div className='p-2 rounded-lg relative max-w-[140px]'>
                    <EditableImage link={image} setlink={setimage} label={"Edit"}/>
                </div>
                <div className="grow">
                    <label htmlFor="">Category Name</label>
                    <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                    <label htmlFor="">Description</label>
                    <textarea type="text" rows={6} value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
                    <SubCategoryProps props={subCategory} setProps={setSubCategory} name="SubCategories" addLabel="Add Sub Categories"/>
                    {/* <MenuItemPriceProps props={sizes} setProps={setSizes} name="Sizes" addLabel="Add Item Size"/>
                    <MenuItemPriceProps props={ingredients} setProps={setIngredients} name="Extra ingredients" addLabel="Add Extra ingredients"/> */}
                    <button type="submit" className="btn submit">Save</button>
                </div>
            </div>
        </form>
    );
}