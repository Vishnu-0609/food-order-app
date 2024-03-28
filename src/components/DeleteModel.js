import { useState } from "react";

export default function DeleteModel({label,onDelete,className})
{
    const [showconfirm,setshowconfirm] = useState(false);

    if(showconfirm)
    {
        return (
            <div className="fixed bg-black/80 inset-0 mx-auto flex justify-center items-center h-full">
                <div className="bg-white p-4 rounded-lg">
                    <div>
                        Are You sure you want to delete?
                    </div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={()=>setshowconfirm(false)} className="button hover:bg-black/10">Cancel</button>
                        <button type="button" onClick={()=>{onDelete();setshowconfirm(false)}} className="submit btn hover:bg-red-600">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <button type="button" onClick={()=>setshowconfirm(!showconfirm)} className={className}>
            {label}
        </button>
    );
}