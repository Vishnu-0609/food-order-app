import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { User } from "../../../models/User";
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect.js";

export const authOptions = {
  secret:process.env.SECRET,
  adapter:MongoDBAdapter(clientPromise),
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
        name: 'Credentials',
        id:'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const email= credentials?.email;
          const password= credentials?.password;
          
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({email});
          const passwordok=user && bcrypt.compareSync(password,user.password);
          // console.log(passwordok);
          if(passwordok)
          {
            return user;
          }

          return null
        }
      })    
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }