"use client"
import { useProfile } from "../../components/UseProfile.js";
import Tabs from "../../components/Tabs.js";
import { useEffect, useState } from "react";
import Editbtn from "@/components/Icons/Editbtn.js";
import Link from "next/link.js";

export default function User()
{
    const {loading,data} = useProfile();
    const [users,setUsers] = useState([]);
    
    useEffect(()=>
    {
        fetch('/api/users').then(response=>{
            response.json().then(users=>
            {
                setUsers(users);
            });
        })
    },[]);

    if(loading)
    {
        return "Loading user info...";
    }

    if(!data.admin)
    {
        return "Not an Admin";
    }

    return(
        <section className="max-w-2xl mx-auto mt-28 my-4">
            <Tabs isAdmin={true}/>
            <div className="mt-8">
                {users.length > 0 && users.map((user)=>(
                    <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 items-center flex justify-between gap-4">
                        <div className="grid grid-cols-2 w-96">
                            <div className="text-gray-700">
                                {user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No Name</span>)}
                            </div>
                            <div>
                                <span className="text-gray-500">{user.email}</span>
                            </div>
                        </div>
                        <div>
                            <Link href={'/users/'+user._id} className="text-blue-600"><Editbtn/></Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}