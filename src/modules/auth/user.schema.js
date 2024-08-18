import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: {
        type:String
    },
    email: {
        type:String,
        unique:true,
        required:true
    }, 
    password: {
        type:String,
        required:true
    },
    role: {
        type:String
    },
    photo: {
        type: String
    },
    comments: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"comments"
        }
    ],
    results: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"results"
        }
    ]
}, {
    _id:true,
    timestamps:true,
    collection:"users"
});

export const users = mongoose.model("users", userSchema);