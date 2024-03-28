import mongoose from "mongoose";
import { User } from "../../models/User";

export async function GET()
{
    await mongoose.connect(process.env.MONGO_URL);
    const users = await User.find();
    return Response.json(users);
}

export async function POST(req)
{
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url?.searchParams.get('_id');

    const user = await User.findById(_id);
    return Response.json(user);   
}

export async function PUT(req)
{
    try
    {
        const data = await req.json();
        const url = new URL(req.url);
        const _id = url.searchParams.get('id');
        await mongoose.connect(process.env.MONGO_URL);

        if(data && _id)
        {
            await User.updateOne({_id},data);
        }
        else
        {
            return Response.json(false);
        }

        return Response.json(true);
    }
    catch(error)
    { 
        return Response.json(false);    
    }
}