import NextAuth,{NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import mongoose from "mongoose";
import { User } from "../../../models/User";
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../libs/mongoConnect.ts";

export const authOptions = {
  secret:process.env.SECRET,
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
        name: 'credentials',
        id:'credentials',
        credentials: {
          email: { label: "Email" , placeholder: "test@gmail.com" },
          password: { label: "Password" , placeholder: "password" }
        },
        async authorize(credentials, req) {
          if(!credentials || !credentials?.email || !credentials?.password)
          {
            return null;
          }
          else
          {
            const email= credentials?.email;
            const password= credentials?.password;
            // const session = await getServerSession(authOptions);
            
            await mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({email});
            console.log(user);
            const passwordok=user && bcrypt.compareSync(password,user.password);
            console.log(passwordok);
            
            if(passwordok)
            {
              return user;
            }
            else
            {
              return null;
            }
          }
        }
      })    
  ],
  pages : {
    signIn:"/auth",
  },
  debug: process.env.NODE_ENV === "development",
  // adapter:MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }