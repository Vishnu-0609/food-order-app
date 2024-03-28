"use client"
import { useEffect, useState } from "react";
import Tabs from "../../components/Tabs.js";
import {useProfile} from "../../components/UseProfile.js";
import { resolve } from "path";
import { rejects } from "assert";
import toast from "react-hot-toast";
import Editbtn from "../../components/Icons/Editbtn.js";
import Trash from "../../components/Icons/Trash.js";
import DeleteModel from "@/components/DeleteModel.js";
import Link from "next/link.js";
import Right from "@/components/Icons/Right.js";
import Left from "@/components/Icons/Left.js";
import Image from "next/image.js";

export default function CategoriesPage()
{
    const {loading:profileLoading,data:profileData} = useProfile();
    const [newCategory,setNewCategory] = useState("");
    const [categories,setCategories] = useState([]);
    const [editedCategory,setEditedCategory] = useState(null);

    useEffect(()=>
    {
        fetchcategories();
    },[]);

    function fetchcategories()
    {
        fetch('/api/categories').then((res)=>
        {
            res.json().then((data)=>
            {
                setCategories(data);
            })
        })
    }

    if(profileLoading)
    {
        return "Loading User info...";
    }

    if(!profileData.admin)
    {
        return "Not an Admin";
    }

    const handleNewCategory =async(e) =>
    {
        e.preventDefault();
        const creationPromise = new Promise(async(resolve,reject)=>
        {
            const data = {name:newCategory};
            if(editedCategory)
            {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories',{
                method:editedCategory? 'PUT' : 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
            });
            setNewCategory("");
            fetchcategories();
            setEditedCategory(null);
            if(response.ok)
            {
                resolve();
            }
            else
            {
                reject();
            }
        });
        await toast.promise(creationPromise,{
            loading:editedCategory?'Updating Category':'Creating New Category...',
            success:editedCategory?'Category Updated!':'Category Created!',
            error:'Something went wrong!'
        })
    }

    const handledeletecategory = async(id) =>
    {
        const deletionPromise = new Promise(async(resolve,reject)=>{
            const response = await fetch('/api/categories',{
                method:'DELETE',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({'_id':id}),
            });

            if(response.ok)
            {
                resolve();
            }
            else
            {
                reject();
            }
        });
        fetchcategories();
        await toast.promise(deletionPromise,{
            loading:'Deleting...',
            success:'Deleted Successfully!',
            error:'Something went wrong!'
        })
    }

    return(
        <section className="mt-28 max-w-lg mx-auto mb-8">
            <Tabs isAdmin={true}/>
            <div className="mt-8">
                <Link className="button" href={'/categories/new'}><span>Create New Category</span><Right/></Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit Category: </h2>
                <div className="grid grid-cols-3 gap-2">
                    {categories?.length > 0 && categories.map((category)=>(
                        <Link key={category._id} href={'/categories/edit/'+category._id} 
                            className="bg-gray-300 rounded-lg p-4"
                        >
                            <div className="relative">
                                <Image className="rounded-md" src={category.image} alt={''} width={200} height={200}/>
                            </div>
                            <div className="text-center">
                            {category.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
        // <section className="mt-8 max-w-xl mx-auto">
        //     <Tabs isAdmin={true}/>
        //     <form className="mt-8" onSubmit={handleNewCategory}>
        //         <div className="flex gap-2 items-end">
        //             <div className="grow">
        //                 <label>
        //                     {editedCategory ? 'Update Category' : 'New Category Name' }
        //                     {editedCategory && (
        //                         <> : <b>{editedCategory.name}</b></>
        //                     )}
        //                 </label>
        //                 <input type="text" value={newCategory} onChange={(e)=>{setNewCategory(e.target.value)}}/>
        //             </div>
        //             <div className="pb-2 flex gap-2">
        //                 <button type="submit" className="btn submit border border-primary">
        //                     {editedCategory ? 'Update' : 'Create'}
        //                 </button>
        //                 <button type="button" onClick={()=>{setEditedCategory(false);setNewCategory("")}} className="button">Cancel</button>
        //             </div>
        //         </div>
        //     </form>
        //     <div>
        //         <h2 className="mt-8 text-sm text-gray-500">Existing Categories: </h2>
        //         {categories?.map((category)=>(
        //             <div key={category._id} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-2 justify-between">
        //                 <div className="grow">{category.name}</div>
        //                 <div className="flex gap-2">
        //                     <button type="button" onClick={()=>{setEditedCategory(category);setNewCategory(category.name)}} className="bg-transparent text-blue-600"><Editbtn/></button>
        //                     {/* <button type="button" onClick={()=>{handledeletecategory(category._id)}} className="bg-transparent text-primary"><Trash/></button> */}
        //                     <DeleteModel label={<Trash/>} onDelete={()=>{handledeletecategory(category._id)}} className={'bg-transparent text-primary'}/>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </section>
    )
}