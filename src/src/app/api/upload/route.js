import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

export async function POST(req)
{
    const data=await req.formData();
    const file=data.get('file');

    if(!file)
    {
        return NextResponse.json({"message":"No Image Found",success:false})
    }
    
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/temp/${file.name}`;
    await writeFile(path,buffer);

    const avatar=await uploadOnCloudinary(path);
    if(!avatar.url)
    {
        return NextResponse.json({"message":"No Image uploaded on clodinary",success:false})   
    }
    else
    {
        return Response.json(avatar.url); 
    }
    
}