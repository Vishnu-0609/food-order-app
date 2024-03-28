import mongoose from "mongoose";
import { Category } from "../../models/Category.js";
import { data } from "autoprefixer";

export async function POST(req) {
    const {...data} = await req.json();
    console.log(data);
    await mongoose.connect(process.env.MONGO_URL);
    const categoryDoc = await Category.create(data);
    
    return Response.json(categoryDoc);
}

export async function GET(req)
{
    await mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Category.find()
    );
}

export async function PUT(req) {
    const {_id,...data} = await req.json();
    // console.log(_id);
    // console.log(data);
    await mongoose.connect(process.env.MONGO_URL);
    await Category.updateOne({_id},data);
    
    return Response.json(true);
}

export async function DELETE(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true);
}