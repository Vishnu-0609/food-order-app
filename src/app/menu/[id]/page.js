"use client";
import { useEffect, useState } from "react";
import SectionHeaders from "@/components/SectionHeaders";
import MenuItems from "@/components/Menu/MenuItems";
import Link from "next/link";
import { useParams, usePathname } from 'next/navigation';

export default function MenuPage()
{   
    const [categories,setCategories] = useState([]);
    let categoryId = "";
    const [currentCategoryId,setcurrentCategoryId] = useState([]);
    const [menuItems,setMenuItems] = useState([]);
    const [currentMenuItems,setcurrentMenuItems] = useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const [subMenu,setsubMenu] = useState(false);

    const [label,setlabel] = useState("");
    const [desc,setdesc] = useState("");

    let currentCategory = [];

    const path = usePathname();
    let currentPath = "";
    
    if(path.includes('/menu/SALADS-PASTA-SIDES'))
    {
        currentPath="SALADS • PASTA • SIDES";
    }
    else
    {
        currentPath = path.substring(6,path.length).replace('-'," ");
    }

    useEffect(()=>
    {
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
                setlabel((categories.filter((category)=>category.name===currentPath))[0].name);
                setdesc((categories.filter((category)=>category.name===currentPath))[0].description);
                currentCategory = (categories.filter((category)=>category.name===currentPath))[0]
                categoryId = (categories.filter((category)=>category.name===currentPath))[0]._id;
                setcurrentCategoryId(categories.filter((category)=>category.name === currentPath)[0]._id);
            })
        });

        if(categoryId!=null)
        {
            fetch('/api/menu-items').then(res=>{
                res.json().then(items=>{
                    setMenuItems(items);
                    if(currentCategory?.subCategory?.length)
                    {
                        setcurrentMenuItems(items.filter((item)=>item.category===categoryId).slice(-3));
                        setSubCategory(currentCategory?.subCategory);
                        setsubMenu(true);
                    }
                    else
                    {
                        setcurrentMenuItems(items.filter((item)=>item.category===categoryId));
                    }
                })
            })
        }
    },[])

    const changeMenuItems = (e,id) =>
    {
        console.log(e.target);
        let parent = e.target.parentNode;
        let children = parent.children;

        for (var i = 0; i < children.length; i++) {
            if(!children[i].classList.contains('bg-[#e02c1c]'))
            {
                children[i].classList.add('bg-[#e02c1c]');
            }
            children[i].classList.remove("bg-[#692c27]");
        }
        e.target.classList.remove('bg-[#e02c1c]');
        e.target.classList.add('bg-[#692c27]');

        setlabel((subCategory.filter((category)=>category._id===id))[0].name);
        setdesc((subCategory.filter((category)=>category._id===id))[0].description);
        setcurrentMenuItems(menuItems.filter((item)=>item.category === currentCategoryId && item.subCategory === id));
        
    }

    return(
        <section className="mt-16">
            <div className="bg-[#383434] text-white font-black xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm flex justify-center">
                <Link className={path.includes('/menu/PIZZAS')?'active1 py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 underline':'py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 hover:bg-black hover:underline'} href={'/menu/PIZZAS'}>PIZZAS</Link>
                <Link className={path.includes('/menu/SALADS-PASTA-SIDES')?'active1 py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 underline':'py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 hover:bg-black hover:underline'} href={'/menu/SALADS-PASTA-SIDES'}>SALADS • PASTA • SIDES</Link>
                <Link className={path.includes('/menu/DESSERTS')?'active1 py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 underline':'py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 hover:bg-black hover:underline'} href={'/menu/DESSERTS'}>DESSERTS</Link>
                <Link className={path.includes('/menu/CHICKEN-WINGS')?'active1 py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 underline':'py-4 xl:px-12 lg:px-10 md:px-6 sm:px-4 px-2 hover:bg-black hover:underline'} href={'/menu/CHICKEN-WINGS'}>CHICKEN WINGS</Link>
            </div>
            <div className="menu-image py-8 flex justify-center">
                <div className="relative flex flex-col items-center">
                    <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-black text-white py-4 mt-2">{label}</h1>
                    <p className="xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-11/12 w-full px-4 xl:text-2xl lg:text-xl md:text-lg sm:text-lg text-lg py-4 font-black text-white my-2">{desc}</p>
                </div>
            </div>
            <span className="flex justify-center my-16 [&>*:first-child]:rounded-s-full [&>*:last-child]:rounded-e-full">
                {subMenu && subCategory?.map((SubCategories)=>(
                    <button onClick={(e)=>changeMenuItems(e,SubCategories._id)} key={SubCategories._id} id={SubCategories._id} className="bg-[#e02c1c] py-4 xl:px-6 lg:px-5 md:px-4 sm:px-3 px-2 xl:text-2xl lg:text-xl md:text-lg sm:text-md text-sm font-black text-white hover:bg-[#692c27]">{SubCategories.name}</button>
                ))}
            </span>
            <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-12 mb-12 px-4">
                {currentMenuItems.length > 0 && currentMenuItems.map((Item)=>(
                    <MenuItems key={Item._id} {...Item}/>
                ))}
            </div>
        </section>
    );
}