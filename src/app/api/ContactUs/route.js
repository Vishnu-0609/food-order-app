import mongoose from "mongoose";
import { ContactUser } from "../../models/ContactUser.js";

export async function POST(req)
{
    const {firstName,lastName,email:Email,phone:phoneNumber,pincode:pinCode,dob,favBuffet:fav} =  await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const user = await ContactUser.find({Email});

    if(user.length > 0)
    {
        return Response.json(false);
    }
    else
    {
        await ContactUser.create({firstName,lastName,Email,phoneNumber,pinCode,dob,fav});
    }

    return Response.json(true);
}