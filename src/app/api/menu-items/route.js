import mongoose from "mongoose";
import { MenuItem } from "@/app/models/MenuItem";

export async function POST(req)
{
    const {baseprice:basePrice,description,image,name,category,sizes,ingredients,subCategory,itemType} = await req.json();
    console.log(itemType);
    await mongoose.connect(process.env.MONGO_URL);
    const meneItemsDoc = await MenuItem.create({name,description,image,basePrice,category,sizes,ingredients,subCategory,itemType});
    return Response.json(meneItemsDoc);
}

export async function PUT(req)
{
    const {_id,...data} = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    await MenuItem.findByIdAndUpdate(_id,data);
    return Response.json(true);
}

export async function GET(req)
{
    await mongoose.connect(process.env.MONGO_URL);
    const meneItemsDoc = await MenuItem.find()
    return Response.json(meneItemsDoc);
}

export async function DELETE  (req)
{
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    return Response.json(true);
}
 
