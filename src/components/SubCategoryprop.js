"use client"
import { useEffect, useState } from "react";
import Trash from "../components/Icons/Trash.js";
import Plus from "../components/Icons/Plus.js";
import Togglebtn from "../components/Icons/Togglebtn.js";
import ToggleUP from "../components/Icons/ToggleUP.js";

export default function SubCategoryProps({name,addLabel,props,setProps})
{
    const [isOpen,setIsOpen] = useState(false);

    function addSize()
    {
        setProps(oldSizes=>{
            return [...oldSizes,{name:'',description:''}];
        });
    }

    function editsize(e,index,prop)
    {
        const newvalue = e.target.value;
        setProps(prevSizes=>{
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newvalue;
            return newSizes;
        });
    }

    function removeSize(index)
    {
        setProps(prev => prev.filter((v,i)=>i!==index))
    }

    return(
        <div className={`bg-gray-200 p-2 rounded-md mb-2`}>
            <div className="flex gap-1 justify-between">
                <div>
                    <h3 className="text-gray-700 flex gap-1 w-50">
                        <span>{name}</span>
                        <span>({props.length})</span>
                    </h3>
                </div>
                <div className="grow">
                    <button type="button" onClick={()=>setIsOpen(!isOpen)} className="text-xs bg-transparent border-0 w-full flex justify-end">{isOpen ? <ToggleUP/> : <Togglebtn/>}</button>
                </div>
            </div>
            <div className={isOpen ? "block" : "hidden"}>
                {props?.length > 0 && props.map((subcategory,index)=>(
                    <div key={index}>
                        <div>
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder="Name" value={subcategory.name} onChange={e=>{editsize(e,index,'name')}}/>
                        </div> 
                        <div>
                            <label htmlFor="">Description</label>
                            <textarea placeholder="Description" value={subcategory.description} onChange={e=>editsize(e,index,'description')} cols="30" rows="3"></textarea>
                        </div>
                        <div>
                            <button onClick={()=>removeSize(index)} type="button" className="border-0 bg-primary text-white py-2 px-4 rounded-lg mb-8">Delete</button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={addSize} className="bg-white button items-center"><Plus/><span>{addLabel}</span></button>
            </div>
        </div>
    )
}