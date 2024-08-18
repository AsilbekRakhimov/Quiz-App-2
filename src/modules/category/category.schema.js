import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name_uz:{
        type:String,
        required:true
    },
    name_ru:{
        type:String,
        required:true
    },
    name_en:{
        type:String,
        required:true
    },
    description_uz:{
        type:String
    },
    description_ru:{
        type:String
    },
    description_en:{
        type:String
    },
    image:{
        type:String
    },
    sub_categories:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"sub_category"
        }
    ]
}, {
    _id:true,
    timestamps:true,
    collection:"category"
});

export const category = mongoose.model("category", categorySchema);