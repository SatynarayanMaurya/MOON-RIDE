import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import AddProfileModal from './AddProfileModal';
import Spinner from './Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setAllAddedUser, setLoading, setUserDetails } from '../redux/slices/userSlice';
import { apiConnector } from '../services/apiConnector';
import { addedUserEndpoints, userEndpoints } from '../services/apis';
import { useNavigate } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
};

const hoverEffect = {
  scale: 1.02,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 17
  }
};

const tapEffect = {
  scale: 0.98
};

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allAddedUser = useSelector((state)=>state.user.allAddedUser)
  const userDetails = useSelector((state)=>state.user.userDetails)
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const loading = useSelector((state)=>state.user.loading)
  const [isAddProfileModal,setIsAddProfileModal] = useState(false)

  // Dummy data for the stats cards
  const statsData = [
    {
      title: 'Total Revenue',
      value: '$2,129,430',
      change: '+2.5%',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      icon: '💰'
    },
    {
      title: 'Transactions',
      value: '1,520',
      change: '+1.7%',
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      icon: '📊'
    },
    {
      title: 'Total likes',
      value: allAddedUser?.length,
      change: '+1.4%',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      icon: '❤️'
    },
    {
      title: 'Total Users',
      value: allAddedUser?.length,
      change: '+4.2%',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      icon: '👥'
    }
  ];

  // Dummy data for the bar chart
  const activityData = [
    { week: 'Week 1', Guest: 400, User: 350 },
    { week: 'Week 2', Guest: 350, User: 450 },
    { week: 'Week 3', Guest: 200, User: 300 },
    { week: 'Week 4', Guest: 380, User: 320 }
  ];

  // Dummy data for pie chart
  const pieData = [
    { name: 'Basic Tees', value: 55, color: '#10B981' },
    { name: 'Custom Short Pants', value: 30, color: '#F59E0B' },
    { name: 'Super Hoodies', value: 15, color: '#EF4444' }
  ];

  const getUserDetails = async()=>{
    try{
      if(userDetails) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",userEndpoints.GET_USER_DETAILS)
      dispatch(setUserDetails(result?.data?.userDetails))
      dispatch(setLoading(false))
    }
    catch(error){
      toast.error(error?.response?.data?.message || error.message || "Error in getting the user details")
      dispatch(setLoading(false))
    }
  }

  const getAllAddedUser = async()=>{
    try{
      if(allAddedUser) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",addedUserEndpoints.GET_ALL_ADDED_USER)
      dispatch(setAllAddedUser(result?.data?.allAddedUser))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.message || "Error in getting all the added user")
    }
  }

  useEffect(()=>{
    getUserDetails();
    getAllAddedUser()
  },[])


  if (loading) {
    return <Spinner/>;
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0"
        >
          Dashboard
        </motion.h1>
        
        {/* Header Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-48 sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </motion.div>
          
          {/* Notification Bell */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-600 hover:text-gray-900 relative"
          >
            <Bell className="h-6 w-6" />
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
            >
              3
            </motion.span>
          </motion.button>
          
          {/* Profile Avatar with Dropdown */}
          <motion.div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold focus:outline-none"
            >
              {userDetails?.name?.split(" ")?.map((word)=>word[0])?.join("")?.toUpperCase()}
            </motion.button>
            
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userDetails?.name || "John Doe"}</p>
                    <p className="text-xs text-gray-500">{userDetails?.email || "johndoe@example.com"}</p>
                  </div>
                  <button  onClick={()=>navigate("/settings")}  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                  <button onClick={()=>navigate("/settings")} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button  onClick={()=>navigate("/settings")}  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={hoverEffect}
            whileTap={tapEffect}
            className="bg-white rounded-lg shadow p-6 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="text-sm font-medium text-green-600"
              >
                {stat.change}
              </motion.span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-2xl font-bold text-gray-900"
            >
              {stat.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities Chart */}
        <motion.div 
          variants={chartVariants}
          className="lg:col-span-2 bg-white rounded-lg shadow p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Activities</h2>
              <p className="text-sm text-gray-500">May - June 2021</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Guest</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">User</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} barGap={10}>
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                />
                <Bar dataKey="Guest" fill="#F87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="User" fill="#34D399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Top Products */}
          <motion.div 
            variants={chartVariants}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Top products</h2>
              <p className="text-sm text-gray-500">May - June 2021</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              {pieData.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Add Profile Section */}
          <motion.div 
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-lg shadow p-6 cursor-pointer"
            onClick={()=>setIsAddProfileModal(true)}
          >
            <div className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ rotate: 90, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4"
              >
                <Plus className="h-8 w-8 text-gray-400" />
              </motion.div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Add Profile</h3>
              <p className="text-xs text-gray-500">Add a new profile to get started</p>
            </div>
          </motion.div>
        </div>
      </div>


      <>
        {
          isAddProfileModal && 
          <AddProfileModal closeModal={()=>setIsAddProfileModal(false)}/>
        }
      </>
    </motion.div>
  );
}

export default Dashboard;