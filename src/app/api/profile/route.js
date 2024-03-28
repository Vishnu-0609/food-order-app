import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route.js";
import { User } from "../../models/User.js";

export async function PUT(req)
{
    try
    {
        const data = await req.json();
        await mongoose.connect(process.env.MONGO_URL);

        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if(data && email)
        {
            await User.updateOne({ email },data);
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

export async function GET()
{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        const session = await getServerSession(authOptions);
        const email = session.user?.email;
        
        return Response.json(
            await User.findOne({email})
        );
    }
    catch(error)
    {
        return Response.json(false);  
    }
}