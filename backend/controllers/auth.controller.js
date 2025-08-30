import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async(req,res)=>{
    try{    
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        const existingUser = await User.findOne({email:email})
        if(existingUser){
            return res.status(403).json({
                success:false,
                message:'User is already registered with us'
            })
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.create({name,email,password:hashPassword,role:"admin"})

        return res.status(201).json({
            success:true,
            message:"User registered successfully !"
        })



    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in signup"
        })
    }
}


export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        const existingUser = await User.findOne({email:email})
        if(!existingUser){
            return res.status(403).json({
                success:false,
                message:"User is not registered with us"
            })
        }

        if(!existingUser?.password){
            return res.status(400).json({
                success:false,
                message:"You signed up with Google. Please set a password to enable email login."
            })
        }


        const matchPassword = await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(403).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = jwt.sign(
            {
                _id:existingUser._id,
                name:existingUser?.name,
                email:existingUser?.email,
                role:existingUser?.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )

        const isProduction = process.env.NODE_ENV === "production" ? true:false;

        const cookieOptions = {
            sameSite:isProduction ? "None":"Lax",
            secure:isProduction,
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            path:"/"
        }

        return res.cookie("token",token,cookieOptions).status(200).json({
            success:true,
            message:"Login successfull !",
            userDetails:existingUser
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in login "
        })
    }
}


export const logout = async(req,res)=>{
    try{
        const isProduction = process.env.NODE_ENV === "production"
        const cookieOption = {
            httpOnly:true,
            secure:isProduction,
            sameSite:isProduction?"None":"Lax"
        }
        return res.clearCookie("token",cookieOption).status(200).json({
            success:true,
            message:"Logout successfull"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in logout",
        })
    }
}


export const getUserDetails = async(req,res)=>{
    try{
        const userDetails = await User.findById(req.user._id)
        return res.status(200).json({
            success:true,
            message:"User details fetched successfully !",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in getting the user details"
        })
    }
}


export const updateUserDetails = async(req,res)=>{
    try{
        const {name,password} = req.body;
        let hashPassword ;
        if(password){
            hashPassword = await bcrypt.hash(password,10)
        }

        let data  ={};
        if(name ) data.name = name ;
        if(password){
            data.password = hashPassword
        }

        const userDetails = await User.findByIdAndUpdate(req.user._id,{$set:data},{new:true});
        return res.status(200).json({
            success:true,
            message:"User updated successfully !",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in updating the user details"
        })
    }
}


export const setPassword = async(req,res)=>{
    try{
        const {email,newPassword} = req.body;
        if(!email || !newPassword){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(403).json({
                success:false,
                message:"User is not registered with us"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword,10)
        existingUser.password = hashPassword;
        await existingUser.save()
        return res.status(200).json({
            success:true,
            message:"Password set"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message||"Error in setting the password"
        })
    }
}