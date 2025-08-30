// src/components/SetPassword.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { toast } from "react-toastify";
import { authEndpoints,  } from "../services/apis";
import { setLoading,  } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email,setEmail] = useState("")
  const navigate = useNavigate()
  const loading = useSelector((state)=>state.user.loading)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
        console.log("data is :",email,newPassword)
        dispatch(setLoading(true))
        dispatch(setLoading(false))
        const result = await apiConnector("PUT",authEndpoints.SET_PASSWORD,{email,newPassword})
        toast.success(result?.data?.message)
        navigate("/auth")
    } 
    catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Failed to set password");
    } finally {
        dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Set Your Password
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          Set Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
