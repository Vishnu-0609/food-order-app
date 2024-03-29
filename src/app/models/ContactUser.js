import { Schema,model,models } from "mongoose";

const ContactUserSchema = new Schema({
    firstName:{type:String},
    lastName:{type:String},
    Email:{type:String},
    phoneNumber:{type:Number},
    dob:{type:Date},
    pinCode:{type:Number},
    fav:{type:String}
},{timestamps:true});

export const ContactUser = models?.ContactUser || model("ContactUser",ContactUserSchema);