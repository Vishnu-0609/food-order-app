import mongoose from "mongoose";
import { User } from "../../models/User";

export async function POST(req) {
    const {email,password} = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createduser = await User.find({email:email});
    return Response.json(createduser);
}

