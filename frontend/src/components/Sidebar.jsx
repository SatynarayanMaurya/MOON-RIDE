import React, { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  CreditCard,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  useEffect(()=>{
    setActiveTab(location.pathname)
  },[location.pathname])

  const navItems = [
    { name: "Dashboard", icon: BarChart3, path: "/" },
    { name: "Transactions", icon: CreditCard, path: "/transactions" },
    { name: "Schedules", icon: Calendar, path: "/schedules" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleNavigation = (path) => {
    setActiveTab(path);
    navigate(path);
    setIsOpen(false); // close sidebar after navigation on mobile
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const NavLink = ({ item, isActive }) => (
    <button
      onClick={() => handleNavigation(item.path)}
      className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
        isActive
          ? "bg-blue-600 bg-opacity-20 text-white border-white"
          : "text-blue-100 hover:bg-blue-500 hover:bg-opacity-10 hover:text-white"
      }`}
    >
      <item.icon
        className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-blue-200"}`}
      />
      <span className="font-medium">{item.name}</span>
    </button>
  );

  return (
    <>
      {/* Top bar for mobile */}
      <div className="lg:hidden flex items-center justify-between bg-blue-600 px-4 py-3 text-white">
        <h1 className="text-xl font-bold">Board.</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed lg:static top-[52px] left-0 h-[calc(100vh-56px)] lg:h-screen w-64 lg:w-full bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col z-50"
          >
            {/* Logo Section */}
            <div className="px-6 py-8 hidden lg:flex">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                </div>
                <h1 className="text-2xl font-bold">Board.</h1>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    isActive={activeTab === item.path}
                  />
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="px-6 py-6 border-t border-blue-400 border-opacity-30">
              <div className="space-y-2">
                <button onClick={()=>navigate("/help")} className="w-full flex items-center px-0 py-2 text-blue-100 hover:text-white transition-colors">
                  <HelpCircle className="w-5 h-5 mr-3 text-blue-200" />
                  <span className="text-sm">Help</span>
                </button>
                <button onClick={()=>navigate("/contact-us")} className="w-full flex items-center px-0 py-2 text-blue-100 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-blue-200" />
                  <span className="text-sm">Contact Us</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
