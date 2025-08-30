import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Search, Settings, Key, CreditCard, Phone } from "lucide-react";

const faqs = [
  {
    icon: <Settings className="w-5 h-5 text-blue-500" />,
    question: "How to manage your account settings",
  },
  {
    icon: <Key className="w-5 h-5 text-green-500" />,
    question: "How to reset your password",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-purple-500" />,
    question: "Steps to view your transactions",
  },
  {
    icon: <Phone className="w-5 h-5 text-red-500" />,
    question: "Contacting support for unresolved issues",
  },
];

const Help = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="p-6 h-screen flex justify-center items-center"
    >
      <div className="bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="text-blue-600 w-10 h-10" />
          <h2 className="text-3xl font-bold text-gray-800">Help & Support</h2>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Welcome to the Help Center! Browse popular questions below or search 
          for a topic to get quick assistance.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-md rounded-xl px-4 py-2 mb-6 border">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search help topics..."
            className="ml-2 w-full outline-none bg-transparent text-gray-700"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 bg-white border rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition"
            >
              {faq.icon}
              <span className="text-gray-700 font-medium">{faq.question}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Help;
