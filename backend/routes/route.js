import express from "express"
import passport  from "passport";
import jwt from "jsonwebtoken"
import { getUserDetails, login, logout, setPassword, signup, updateUserDetails } from "../controllers/auth.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { addNewUser, getAllAddeduser } from "../controllers/addedUser.controller.js";
const router = express.Router();


router.post("/login",login)
router.post("/signup",signup)
router.post("/logout",logout)
router.put("/set-password",setPassword)



// Admin user
router.get("/get-user-details",authMiddleware,getUserDetails)
router.put("/update-user-details",authMiddleware,updateUserDetails)


//Added User
router.post("/add-user",authMiddleware,addNewUser)
router.get("/get-all-added-user",authMiddleware,getAllAddeduser)












router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.FRONTEND_URL }),
  (req, res) => {

    const token = jwt.sign({ _id: req.user._id,email:req.user.email,name:req.user.name,role:req.user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProduction = process.env.NODE_ENV === "production"
    const cookieOptions = {
      httpOnly:true,
      secure :isProduction,
      sameSite:isProduction?"None":"Lax",
      maxAge:7*24*60*60*1000,
      path:"/"
    }

    res.cookie("token", token, cookieOptions);
    res.redirect(process.env.FRONTEND_URL); // redirect to frontend
  }
);

export default router