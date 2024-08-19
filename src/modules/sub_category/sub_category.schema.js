import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name_uz:{
        type:String,
        required: true
    },
    name_ru:{
        type:String,
        required: true
    },
    name_en:{
        type:String,
        required: true
    },
    description_uz:{
        type:String,
        required:true
    },
    description_ru:{
        type:String,
        required:true
    },
    description_en:{
        type:String,
        required:true
    },
    quiz:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"quiz"
        }
    ],
    categoryId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"category",
        required:true
    }
}, {
    _id:true,
    collection:"sub_category",
    timestamps:true
})

export const sub_category = mongoose.model("sub_category", subCategorySchema);