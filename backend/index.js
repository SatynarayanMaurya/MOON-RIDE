import express from "express"
import { connectDb } from "./config/database.js";
import dotenv from "dotenv"
dotenv.config();
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import routes from "./routes/route.js"
import "./passport.js"
import cors from "cors"


const app = express();
connectDb()

const allowedOrigins = process.env.FRONTEND_URLS?.split(",");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// // Express-session (needed for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or "strict"
    },
  })
);


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(routes)









app.get("/",(req,res)=>{
    res.send(`<h1>Hello from Moon ride Dashboard</h1>`)
})

app.listen(4000,()=>{
    console.log("App is running on 4000 port")
})