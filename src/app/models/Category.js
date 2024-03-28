const { Schema, models, model } = require("mongoose");

const SubCategorySchema = new Schema({
    name:String,
    description:String,
})

const CategorySchema = new Schema({
    name:{type:String,required:true},
    description:{type:String},
    image:{type:String},
    subCategory:{type:[SubCategorySchema]},
},{timestamps:true})

export const Category = models?.Category || model('Category',CategorySchema);