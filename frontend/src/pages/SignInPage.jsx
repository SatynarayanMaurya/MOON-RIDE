

import React, { useState } from 'react';
import { Eye, EyeOff, Github } from 'lucide-react';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { apiConnector } from '../services/apiConnector';
import { authEndpoints } from '../services/apis';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [isLogin,setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e)=>{
    try{
        e.preventDefault();
        dispatch(setLoading(true))
        console.log("Data is : ",name,email,password)
        let result ;
        if(isLogin){
          result = await apiConnector("POST",authEndpoints.LOGIN,{email,password})
          toast.success(result?.data?.message)

        }
        else{
          result = await apiConnector("POST",authEndpoints.SIGN_UP,{email,name,password})
          setIsLogin(true)
          toast.success(result?.data?.message)
        }
        
        dispatch(setLoading(false))
        navigate("/")
      }
      catch(error){
        dispatch(setLoading(false))
        if(error?.response?.data?.message==="You signed up with Google. Please set a password to enable email login."){
          navigate("/set-password")
        }
        toast.error(error?.response?.data?.message || error.message || "Error in submitting the form ")
    }
  }

  const handleLoginWithGoogle = (credentialResponse) => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`; // redirect to backend
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Blue/Purple section with angled cut - Desktop */}
        <div 
          className="hidden lg:block absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"
          style={{
            clipPath: 'polygon(0 0, 50% 0, 35% 100%, 0 100%)'
          }}
        >
          <div className="flex flex-col justify-between p-8 text-white h-full relative z-10">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-1 bg-white rounded-full transform rotate-12"></div>
                </div>
              </div>
            </div>

            {/* BASE text */}
            <div className="flex items-center justify-center xl:justify-start xl:pl-20">
              <h1 className="text-4xl xl:text-6xl font-bold tracking-wider">BASE</h1>
            </div>

            {/* Social icons */}
            <div className="flex space-x-4 justify-center xl:justify-start xl:pl-16">
              <div className="w-10 h-10 flex items-center justify-center">
                <Github className="w-6 h-6" />
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.568 7.178c-.818 1.58-2.26 2.933-4.107 3.864.06-.4.091-.82.091-1.25 0-3.19-2.587-5.777-5.777-5.777-.32 0-.631.026-.937.075C8.29 2.486 10.043 1.75 12 1.75c2.685 0 5.043 1.356 6.432 3.428zM12 22.25c-5.66 0-10.25-4.59-10.25-10.25 0-1.704.416-3.31 1.15-4.725.818 1.58 2.26 2.933 4.107 3.864-.06.4-.091.82-.091 1.25 0 3.19 2.587 5.777 5.777 5.777.32 0 .631-.026.937-.075C11.71 19.514 9.957 20.25 8 20.25c-2.685 0-5.043-1.356-6.432-3.428C2.866 18.534 7.1 22.25 12 22.25z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile header with logo and BASE text */}
        <div className="lg:hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-0.5 bg-white rounded-full transform rotate-12"></div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wider">BASE</h1>
          </div>
          
          {/* Mobile social icons */}
          <div className="flex justify-center space-x-6">
            <Github className="w-5 h-5" />
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.568 7.178c-.818 1.58-2.26 2.933-4.107 3.864.06-.4.091-.82.091-1.25 0-3.19-2.587-5.777-5.777-5.777-.32 0-.631.026-.937.075C8.29 2.486 10.043 1.75 12 1.75c2.685 0 5.043 1.356 6.432 3.428zM12 22.25c-5.66 0-10.25-4.59-10.25-10.25 0-1.704.416-3.31 1.15-4.725.818 1.58 2.26 2.933 4.107 3.864-.06.4-.091.82-.091 1.25 0 3.19 2.587 5.777 5.777 5.777.32 0 .631-.026.937-.075C11.71 19.514 9.957 20.25 8 20.25c-2.685 0-5.043-1.356-6.432-3.428C2.866 18.534 7.1 22.25 12 22.25z"/>
            </svg>
          </div>
        </div>

        {/* Form Section */}
        {
          isLogin ?
        
          <div className="flex items-center justify-center lg:justify-end p-4 sm:p-6 lg:p-8 bg-gray-50 lg:bg-transparent min-h-screen lg:min-h-0 lg:absolute lg:inset-0">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md lg:mr-8 xl:mr-32">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">Sign in to your account</p>

                  {/* Social login buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                  <button onClick={handleLoginWithGoogle} className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">Sign in with Google</span>
                  </button>
                  <button  onClick={()=>toast.warn("This feature is not active yet !")} className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.568 7.178c-.818 1.58-2.26 2.933-4.107 3.864.06-.4.091-.82.091-1.25 0-3.19-2.587-5.777-5.777-5.777-.32 0-.631.026-.937.075C8.29 2.486 10.043 1.75 12 1.75c2.685 0 5.043 1.356 6.432 3.428zM12 22.25c-5.66 0-10.25-4.59-10.25-10.25 0-1.704.416-3.31 1.15-4.725.818 1.58 2.26 2.933 4.107 3.864-.06.4-.091.82-.091 1.25 0 3.19 2.587 5.777 5.777 5.777.32 0 .631-.026.937-.075C11.71 19.514 9.957 20.25 8 20.25c-2.685 0-5.043-1.356-6.432-3.428C2.866 18.534 7.1 22.25 12 22.25z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">Sign in with Apple</span>
                  </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                      {/* Email field */}
                      <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email address
                          </label>
                          <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                              placeholder="johndoe@gmail.com"
                          />
                      </div>

                      {/* Password field */}
                      <div className="mb-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                              Password
                          </label>
                          <div className="relative">
                              <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-3 py-2 sm:py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                              placeholder="••••••••"
                              />
                              <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                              {showPassword ? (
                                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                              ) : (
                                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                              )}
                              </button>
                          </div>
                      </div>

                      {/* Forgot password link */}
                      <div className="mb-6 text-right">
                      <button type='button' className="text-sm text-indigo-600 hover:text-indigo-500">
                          Forgot password?
                      </button>
                      </div>

                      {/* Sign in button */}
                      <button
                      type='submit'
                      className="w-full bg-indigo-600 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base"
                      >
                      Sign In
                      </button>
                  </form>

                  {/* Register link */}
                  <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button onClick={()=>setIsLogin(false)} className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">
                      Register here
                  </button>
                  </p>
              </div>
              </div>
          </div>:

          <div className="flex items-center justify-center lg:justify-end p-4 sm:p-6 lg:p-8 bg-gray-50 lg:bg-transparent min-h-screen lg:min-h-0 lg:absolute lg:inset-0">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md lg:mr-8 xl:mr-32">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Sign up</h2>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">Create an account</p>

                  {/* Social login buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                  <button onClick={handleLoginWithGoogle} className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">Sign in with Google</span>
                  </button>
                  <button onClick={()=>toast.warn("This feature is not active yet !")} className="flex-1 flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.568 7.178c-.818 1.58-2.26 2.933-4.107 3.864.06-.4.091-.82.091-1.25 0-3.19-2.587-5.777-5.777-5.777-.32 0-.631.026-.937.075C8.29 2.486 10.043 1.75 12 1.75c2.685 0 5.043 1.356 6.432 3.428zM12 22.25c-5.66 0-10.25-4.59-10.25-10.25 0-1.704.416-3.31 1.15-4.725.818 1.58 2.26 2.933 4.107 3.864-.06.4-.091.82-.091 1.25 0 3.19 2.587 5.777 5.777 5.777.32 0 .631-.026.937-.075C11.71 19.514 9.957 20.25 8 20.25c-2.685 0-5.043-1.356-6.432-3.428C2.866 18.534 7.1 22.25 12 22.25z"/>
                      </svg>
                      <span className="text-xs sm:text-sm">Sign in with Apple</span>
                  </button>
                  </div>

                  {/* Name field */}
                  <form onSubmit={handleSubmit}>

                      <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                              Name
                          </label>
                          <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                              placeholder="John Doe"
                          />
                      </div>

                      {/* Email field */}
                      <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                              Email address
                          </label>
                          <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                              placeholder="johndoe@gmail.com"
                          />
                      </div>

                      {/* Password field */}
                      <div className="mb-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                              Password
                          </label>
                          <div className="relative">
                              <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-3 py-2 sm:py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-sm sm:text-base"
                              placeholder="••••••••"
                              />
                              <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                              {showPassword ? (
                                  <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                              ) : (
                                  <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                              )}
                              </button>
                          </div>
                      </div>

                      {/* Forgot password link */}
                      <div className="mb-6 text-right">
                      <button type='button' className="text-sm text-indigo-600 hover:text-indigo-500">
                          Forgot password?
                      </button>
                      </div>

                      {/* Sign in button */}
                      <button
                      type='submit'
                      className="w-full bg-indigo-600 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base"
                      >
                      Sign In
                      </button>
                  </form>

                  {/* Register link */}
                  <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
                  Already have an account?{' '}
                  <button onClick={()=>setIsLogin(true)} className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">
                      Sign In
                  </button>
                  </p>
              </div>
              </div>
          </div>
        }
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignInPage;


