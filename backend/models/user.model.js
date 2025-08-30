import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        default:null
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        default:null
    },
    role:{
        type:String,
        default:"admin"
    },
    profileImage :{
        type:String,
        default:""
    }
,},{timestamps:true})

export default mongoose.model("User",userSchema)