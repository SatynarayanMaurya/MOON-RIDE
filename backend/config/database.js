import mongoose from "mongoose"

export const connectDb = async()=>{
    mongoose.connect(process.env.DB_URI)
    .then(()=>console.log("Data base connected successfully"))
    .catch((error)=>{
        console.log("Database connection failed ! : ",error)
        process.exit(1);
    })
}