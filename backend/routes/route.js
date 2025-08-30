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



router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (err, user) => {
      const frontendUrls = process.env.FRONTEND_URLS.split(",");
      const origin = req.headers.origin;
      const redirectUrl = frontendUrls.includes(origin) ? origin : frontendUrls[0];

      if (err || !user) {
        // Failure case → redirect back with an error param
        return res.redirect(`${redirectUrl}/auth?error=google_auth_failed`);
      }

      // Success case → generate token and set cookie
      const token = jwt.sign(
        { _id: user._id, email: user.email, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      };

      res.cookie("token", token, cookieOptions);

      return res.redirect(redirectUrl);
    })(req, res, next);
  }
);


export default router