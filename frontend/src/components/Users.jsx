import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAllAddedUser, setLoading } from "../redux/slices/userSlice";
import { apiConnector } from "../services/apiConnector";
import { addedUserEndpoints } from "../services/apis";
import Spinner from "./Spinner";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const hoverEffect = {
  scale: 1.02,
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

const tapEffect = { scale: 0.98 };

function Users() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const allAddedUser = useSelector((state) => state.user.allAddedUser);

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter + Search + Sort
  const filteredUsers = allAddedUser
    ?.filter((user) => {
      const search = searchQuery?.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone.toLowerCase().includes(search) ||
        user.instagram.toLowerCase().includes(search) ||
        user.youtube.toLowerCase().includes(search)
      );
    })
    ?.sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "email") {
        return sortOrder === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
      return 0;
    });

  // 🔹 Slice for pagination
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, startIndex + usersPerPage);

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getAllAddedUser = async () => {
    try {
      if (allAddedUser) return;
      dispatch(setLoading(true));
      const result = await apiConnector("GET", addedUserEndpoints.GET_ALL_ADDED_USER);
      dispatch(setAllAddedUser(result?.data?.allAddedUser));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error in getting all the added user"
      );
    }
  };

  useEffect(() => {
    getAllAddedUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 relative"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          Users
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="w-full sm:w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </motion.div>

          {/* Filter Button */}
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Options */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Users Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div
            className="flex items-center cursor-pointer hover:text-gray-700"
            onClick={() => toggleSort("name")}
          >
            Name
            {sortBy === "name" &&
              (sortOrder === "asc" ? (
                <ChevronUp className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
              ))}
          </div>
          <div>Email</div>
          <div>Phone</div>
          <div>Instagram</div>
          <div>YouTube</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {currentUsers?.length > 0 ? (
              currentUsers?.map((user, index) => (
                <motion.div
                  key={user._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={tableRowVariants}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4"
                >
                  {/* Name + Avatar */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                      {user?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        ?.toUpperCase()}
                    </div>
                    <div className="font-medium text-gray-900 overflow-scroll hide-scrollbar">
                      {user.name}
                    </div>
                  </div>
                  <div className="text-gray-600 overflow-scroll hide-scrollbar">
                    {user.email}
                  </div>
                  <div className="text-gray-600">{user.phone}</div>
                  <div className="text-gray-600 overflow-scroll hide-scrollbar">
                    {user.instagram}
                  </div>
                  <div className="text-gray-600 overflow-scroll hide-scrollbar">
                    {user.youtube}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-8 text-center"
              >
                <div className="text-gray-400 mb-2">No users found</div>
                <div className="text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 🔹 Pagination Controls */}
      {filteredUsers?.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <p className="absolute bottom-2 right-4 text-sm italic text-gray-500">These details are retrieved directly from the database.</p>
    </motion.div>
  );
}

export default Users;
