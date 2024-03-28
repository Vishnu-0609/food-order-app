import mongoose from "mongoose";
import { User } from "../../models/User";
import bcrypt from 'bcrypt';

export async function POST(req) {
    const body = await req.json();
    await mongoose.connect(process.env.MONGO_URL);
    const createduser = await User.create(body);
    return Response.json(createduser);
}

// export async function GET(req) {
//     await mongoose.connect(`${process.env.MONGO_URL}/food-ordering`);
//     const alluser = await User.find();
//     return Response.json(alluser);
// }
