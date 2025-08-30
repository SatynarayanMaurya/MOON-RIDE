import AddedUser from "../models/addedUser.model.js"

export const addNewUser = async(req,res)=>{
    try{
        const{name,email,phone,instagram,youtube} = req.body;
        if(!name || !email){
            return res.status(400).json({
                success:false,
                message:"Required field are missing"
            })
        }

        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Not Eligible to add New user"
            })
        }

        const existingUser = await AddedUser.findOne({email:email})
        if(existingUser){
            return res.status(403).json({
                success:false,
                message:"This user is already registerd"
            })
        }

        await AddedUser.create({userId:req.user?._id,name,email,phone,youtube,instagram})
        return res.status(201).json({
            success:true,
            message:"User added successfully"
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message||"Error in adding new user"
        })
    }
}


export const getAllAddeduser = async(req,res)=>{
    try{
        const allAddedUser = await AddedUser.find({userId:req.user?._id});
        return res.status(200).json({
            success:true,
            message:'All added user fetched successfully',
            allAddedUser
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in getting all the added user "
        })
    }
}