import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom"
import {
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  Sun,
  Globe,
  Trash2,
  LogOut,
  Save,
  Edit
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllAddedUser, clearUserDetails, setLoading, setUserDetails } from "../redux/slices/userSlice";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints, userEndpoints } from "../services/apis";
import Spinner from "./Spinner";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};
const hoverEffect = {
  scale: 1.02,
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
};

export default function Settings() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.user.loading)
  const [isEdit,setIsEdit] = useState(false)
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const userDetails = useSelector((state)=>state.user.userDetails)
  const navigate = useNavigate();

  const [userData,setUserData]= useState({
    name:userDetails?.name||"",
    email:userDetails?.email||"",
    password:"",
  })

  const getUserDetails = async()=>{
    try{
      if(userDetails) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",userEndpoints.GET_USER_DETAILS)
      dispatch(setUserDetails(result?.data?.userDetails))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.message || "Error in getting the userDetails")
    }
  }
  useEffect(()=>{
    getUserDetails()
  },[])

  useEffect(()=>{
    setUserData({
      name:userDetails?.name,
      email:userDetails?.email
    })
  },[userDetails])


  const saveChanges = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",userEndpoints.UPDATE_USER_DETAILS,userData)
      toast.success(result?.data?.message)
      dispatch(setUserDetails(result?.data?.userDetails))
      dispatch(setLoading(false))
      setIsEdit(false)
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message ||"Error in updating the user")
      dispatch(setLoading(false))
    }
  }

  const logout = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("POST",authEndpoints.LOGOUT)
      toast.success(result?.data?.message)
      localStorage.clear("token")
      dispatch(clearUserDetails())
      dispatch(clearAllAddedUser())
      dispatch(setLoading(false))
      navigate("/auth")
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message || "Error in logout ")
      dispatch(setLoading(false))
    }
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8"
    >

      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-6 flex items-center justify-between"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        {
          isEdit ? 
          <motion.button
            onClick={()=>saveChanges()}
            whileHover={hoverEffect}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </motion.button>:
          <motion.button
            onClick={()=>setIsEdit(true)}
            whileHover={hoverEffect}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 cursor-pointer text-white rounded-lg"
          >
            <Edit className="h-4 w-4" />
            Edit 
          </motion.button>
        }
      </motion.div>

      {/* Profile Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Profile Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              value={userData?.name || ""} readOnly={!isEdit}
              onChange={(e)=>setUserData({...userData,name:e.target.value})}
              className={`flex-1 p-2 border border-gray-300 rounded-lg ${isEdit ? "focus:ring-2 focus:ring-blue-500":"cursor-not-allowed"}  outline-none`}
            />
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
               value={userData?.email || ""} readOnly
              className="flex-1 p-2 border border-gray-300 rounded-lg outline-none cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-3">
            <Lock className="text-gray-500" />
            <input
              type="password"
              placeholder="New Password"
              readOnly={!isEdit}
              value={userData?.password || ""}
              onChange={(e)=>setUserData({...userData,password:e.target.value})}
              className={`flex-1 p-2 border border-gray-300 rounded-lg ${isEdit ? "focus:ring-2 focus:ring-blue-500":"cursor-not-allowed"}  outline-none`}
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences <span className="text-sm text-gray-400 font-normal">( These feature is not active yet )</span></h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700">
              {theme === "light" ? <Sun /> : <Moon />}
              <span>Theme</span>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700">
              <Bell />
              <span>Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only"
              />
              <span className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative transition-all">
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                    notifications ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-gray-700">
              <Globe />
              <span>Language</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={itemVariants}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={hoverEffect}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg flex-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </motion.button>
          <motion.button
          onClick={logout}
            whileHover={hoverEffect}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
