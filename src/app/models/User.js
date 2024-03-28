import bcrypt from 'bcrypt';
import { Schema,models,model } from "mongoose";

const userSchema=new Schema({
    name:{type:String},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate:pass=>{
            if(!pass?.length || pass.length < 5)
            {
                new Error('password must be at least 5 Characters');
            }
        },
    },
    image:{type:String},
    phone:{type:Number},
    streetAddress:{type:String},
    postalCode:{type:Number},
    city:{type:String},
    country:{type:String},
    admin:{type:Boolean,default:false},
},{timestamps:true})

userSchema.post('validate',function(user)
{
    const pass = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPasword = bcrypt.hashSync(pass, salt);
    user.password = hashedPasword;
})

export const User=models?.User || model('User',userSchema);