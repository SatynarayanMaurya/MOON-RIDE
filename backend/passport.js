import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "./models/user.model.js"
import User from "./models/user.model.js"
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        // let user = await User.findOne({ googleId: profile.id });
        const email = profile.emails?.[0]?.value;
        const profileImage = profile?.photos?.[0]?.value
        const name = profile?.displayName;
        let existingUser = await User.findOne({email})
        if(!existingUser){
          existingUser = await User.create({googleId:profile.id,name,email,profileImage})
        }
        return done(null,existingUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// serialize & deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});
