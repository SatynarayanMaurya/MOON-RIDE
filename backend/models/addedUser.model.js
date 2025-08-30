import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        default:""
    },
    role:{
        type:String,
        default:"user"
    },
    instagram:{
        type:String,
        default:""
    },
    youtube:{
        type:String,
        default:""
    }
,},{timestamps:true})

export default mongoose.model("AddedUser",userSchema)