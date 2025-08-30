import React, { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { addedUserEndpoints } from "../services/apis";
import { toast } from "react-toastify";
import {useDispatch, useSelector} from "react-redux"
import { clearAllAddedUser, setLoading } from "../redux/slices/userSlice";
import Spinner from "./Spinner";

const AddProfileModal = ({closeModal }) => {

  const dispatch = useDispatch()
  const loading= useSelector((state)=>state.user.loading)
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    youtube: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit =async () => {
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("POST",addedUserEndpoints.ADD_USER,formData)
      dispatch(setLoading(false))
      dispatch(clearAllAddedUser())
      toast.success(result?.data?.message)
      closeModal();
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.message || "Error in adding the user")
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60  z-50">
      {loading && <Spinner/>}
      <div className="bg-white w-full max-w-md  rounded-xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute cursor-pointer right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Profile
        </h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-2 text-sm font-medium ${
              step === 1
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-2 text-sm font-medium ${
              step === 2
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500"
            }`}
          >
            Social
          </button>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Enter Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Eg. John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border focus:border-none rounded-lg  focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Enter Email*</label>
              <input
                type="email"
                name="email"
                placeholder="Eg. John@xyz.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border  focus:border-none  rounded-lg  focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Enter Phone*</label>
              <input
                type="tel"
                name="phone"
                placeholder="Eg. 9123456789"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border focus:border-none  rounded-lg focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Social Links */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Instagram Link ( Optional )</label>
              <input
                type="text"
                name="instagram"
                placeholder="Eg. instagram.com/username"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full mt-1 p-2 border focus:border-none  rounded-lg  focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">YouTube Link ( Optional )</label>
              <input
                type="text"
                name="youtube"
                placeholder="Eg. youtube.com/username"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full mt-1 p-2 border focus:border-none  rounded-lg focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between ">
              <button
                onClick={handleBack}
                className="bg-gray-200 text-gray-800 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProfileModal;
