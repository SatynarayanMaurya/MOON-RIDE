import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, User, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // You can also send data to backend here...
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="p-6 h-screen flex justify-center items-center"
    >
      <div className="bg-gradient-to-br from-green-50 to-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Phone className="text-green-600 w-10 h-10" />
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
        </div>

        {/* Description */}
        {!submitted && (
          <p className="text-gray-600 mb-6">
            Have questions or need assistance? Fill out the form below or reach us
            through our contact details.
          </p>
        )}

        {/* If submitted → Thank You Message */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12  max-w-3xl"
          >
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Thank you for contacting us!
            </h3>
            <p className="text-gray-600 mt-2">
              We’ll get back to you as soon as possible.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white rounded-xl shadow p-3 border">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl shadow p-3 border">
                <Mail className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">support@example.com</span>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-xl shadow-md hover:bg-green-600 transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Contact;
