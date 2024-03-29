"use client";
import React,{useEffect,useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage()
{
    const [categories,setCategories] = useState([]);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [dob,setDOB] = useState("");
    const [pincode,setPincode] = useState("");
    const [favBuffet,setFavBuffet] = useState("");

    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            })
        });
    },[])

    const handleformsubmit = async (e) =>
    {
        e.preventDefault();
        const response = await axios.post("/api/ContactUs",{firstName,lastName,email,phone,pincode,dob,favBuffet},{
            headers:{'Content-Type':'application/json'}
        })
        const data = await response.data;
        if(data)
        {
            toast.success("Form Submitted");
        }
        else
        {
            toast.error("Form Already Submitted");
        }
        setEmail("");
        setDOB("");
        setFavBuffet("");
        setFirstName("");
        setLastName("");
        setPhone("");
        setPincode("");
    }

    return (
        <section className="flex flex-col bg-[#e02c1c] text-center border-0 m-0 p-0 " id="contact"> 
            <div className="w-full h-full py-4 text-center">
                <div>
                    <h1 className='xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-10'>NEVER MISS OUT ON AMAZING DEALS AT CICIS!</h1>
                </div>
                <div>
                    <p className='xl:text-2xl lg:text-3xl md:text-2xl sm:text-xl font-serif text-white font-black pt-5 tracking-tight'>SIGN UP FOR NEW PIZZABILITIES</p>
                </div>
            </div>
            <div className="w-full h-full py-4 text-center flex flex-col xl:px-28 lg:px-28 md:px-20 sm:px-4 px-4">
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">First Name</label>
                        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="mt-1 text-lg" type="text"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Last Name</label>
                        <input value={lastName} onChange={(e)=>setLastName(e.target.value)} className="mt-1 text-lg" type="text"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Email</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 text-lg" type="text"/>
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1 sm:pt-3">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">Phone Number</label>
                        <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 text-lg" type="tel" placeholder="+9100000 00000"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">BirthDay</label>
                        <input value={dob} onChange={(e)=>setDOB(e.target.value)} className="mt-1 text-lg" type="date"/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">PinCode</label>
                        <input value={pincode} onChange={(e)=>setPincode(e.target.value)} className="mt-1 text-lg" type="text"/>
                    </div>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-4 sm:grid-cols-1 sm:pt-3">
                    <div className="flex flex-col items-start">
                        <label className="text-black text-xl pl-1" htmlFor="">What's your Buffet fave?</label>
                        <select value={favBuffet} onChange={(e)=>setFavBuffet(e.target.value)} className="mt-1 text-lg">
                            <option value="">Select Your Fav Buffet</option>
                            {categories.length > 0 && categories.map((category)=>(
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end sm:mt-2">
                    <button onClick={handleformsubmit} className="px-12 py-3 rounded-3xl bg-black text-white text-xl font-black">Submit</button>
                </div>
            </div>
        </section>
    );
}