import Image from 'next/image'
import toast from 'react-hot-toast';

export default function EditableImage({link,setlink,label})
{
    const handlefilechange=async(e)=>
    {
        e.preventDefault();
        
        const file = e.target.files?.[0];
        const data = new FormData();
        data.set('file',file);

        const savedavatar = new Promise(async (resolve,reject)=>
        {
            try
            {
                const result = await fetch('/api/upload',{
                    method:'POST',
                    body:data
                })
                const link = await result.json();
                if(link)
                {
                    resolve();
                    setlink(link);
                }
                else
                {
                    reject();
                }
            }
            catch(error)
            {
                reject();
            }   
        })

        await toast.promise(
            savedavatar,
                {
                loading: 'Uploading...',
                success: <b>Uploaded Successfully!</b>,
                error: <b>Could not Upload.</b>,
                }
            );
    }

    return (
        <>
            {link && (
                <Image className='rounded-lg w-full h-full mb-2' src={link} alt={'avatar'} width={250} height={250}></Image>
            )}
            {!link && (
                <div className='text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1'>
                    No Image 
                </div>
            )}
            <label>
                <input type="file" name='file' onChange={(e)=>{handlefilechange(e)}} className='hidden'/>
                <span className='block border border-gray-300 cursor-pointer rounded-lg p-2 text-center'>{label}</span>
            </label>
        </>
    );
}