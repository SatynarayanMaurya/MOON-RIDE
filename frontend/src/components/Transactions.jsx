import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Download, MoreVertical, Eye, Edit, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
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
      damping: 12
    }
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3
    }
  })
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

// Sample transaction data
const transactionsData = [
  {
    id: 1,
    name: "Marcus Bergson",
    date: "Nov 15, 2023",
    amount: "$80,000",
    status: "Paid",
    statusColor: "text-green-600",
    bgColor: "bg-green-100",
    method: "Paypal",
    avatar: "MB",
    type: "income"
  },
  {
    id: 2,
    name: "Jaydon Vaccaro",
    date: "Nov 15, 2023",
    amount: "$150,000",
    status: "Refund",
    statusColor: "text-red-600",
    bgColor: "bg-red-100",
    method: "Stripe",
    avatar: "JV",
    type: "expense"
  },
  {
    id: 3,
    name: "Corey Schleifer",
    date: "Nov 14, 2023",
    amount: "$87,000",
    status: "Paid",
    statusColor: "text-green-600",
    bgColor: "bg-green-100",
    method: "Bank Transfer",
    avatar: "CS",
    type: "income"
  },
  {
    id: 4,
    name: "Cooper Press",
    date: "Nov 14, 2023",
    amount: "$100,000",
    status: "Refund",
    statusColor: "text-red-600",
    bgColor: "bg-red-100",
    method: "Paypal",
    avatar: "CP",
    type: "expense"
  },
  {
    id: 5,
    name: "Phillip Lubin",
    date: "Nov 13, 2023",
    amount: "$78,000",
    status: "Paid",
    statusColor: "text-green-600",
    bgColor: "bg-green-100",
    method: "Stripe",
    avatar: "PL",
    type: "income"
  }
];

function Transactions() {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter and sort transactions
  const filteredTransactions = transactionsData
    .filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.method.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || 
                           transaction.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date) - new Date(b.date) 
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        const amountA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ""));
        const amountB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ""));
        return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Transactions</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Bar */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </motion.div>
          
          {/* Filter and Download Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={hoverEffect}
              whileTap={tapEffect}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
              {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </motion.button>
            
            <motion.button
              whileHover={hoverEffect}
              whileTap={tapEffect}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Filter Options */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="refund">Refund</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transactions Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 lg:grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div 
            className="flex items-center cursor-pointer hover:text-gray-700"
            onClick={() => toggleSort('name')}
          >
            <span>Name</span>
            {sortBy === 'name' && (
              <motion.span
                initial={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                animate={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </motion.span>
            )}
          </div>
          <div 
            className="flex items-center cursor-pointer hover:text-gray-700"
            onClick={() => toggleSort('date')}
          >
            <span>Date</span>
            {sortBy === 'date' && (
              <motion.span
                initial={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                animate={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </motion.span>
            )}
          </div>
          <div 
            className="flex items-center cursor-pointer hover:text-gray-700"
            onClick={() => toggleSort('amount')}
          >
            <span>Amount</span>
            {sortBy === 'amount' && (
              <motion.span
                initial={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                animate={{ rotate: sortOrder === 'asc' ? 0 : 180 }}
                transition={{ duration: 0.2 }}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </motion.span>
            )}
          </div>
          <div className="lg:block hidden">Payment Method</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={tableRowVariants}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-4 p-4"
                >
                  {/* Name - Mobile & Desktop */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                      {transaction.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{transaction.name}</div>
                      <div className="md:hidden text-sm text-gray-500">{transaction.date}</div>
                    </div>
                  </div>
                  
                  {/* Date - Desktop Only */}
                  <div className="hidden md:flex items-center text-gray-600">
                    {transaction.date}
                  </div>
                  
                  {/* Amount */}
                  <div className="flex items-center">
                    <div className={`mr-2 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? 
                        <ArrowDownLeft className="h-4 w-4" /> : 
                        <ArrowUpRight className="h-4 w-4" />
                      }
                    </div>
                    <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </span>
                  </div>
                  
                  {/* Payment Method - Desktop Only */}
                  <div className="hidden lg:flex items-center text-gray-600">
                    {transaction.method}
                  </div>
                  
                  {/* Status */}
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.bgColor} ${transaction.statusColor}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-end relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleDropdown(transaction.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </motion.button>
                    
                    <AnimatePresence>
                      {activeDropdown === transaction.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-8 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-200"
                        >
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                <div className="text-gray-400 mb-2">No transactions found</div>
                <div className="text-sm text-gray-500">Try adjusting your search or filter criteria</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4"
      >
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
          <span className="font-medium">{filteredTransactions.length}</span> results
        </div>
        
        <div className="flex gap-2">
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            disabled
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-400 cursor-not-allowed"
          >
            Previous
          </motion.button>
          
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            className="px-3 py-1.5 bg-blue-600 border border-blue-600 rounded-md text-white"
          >
            1
          </motion.button>
          
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
      <p className="absolute bottom-2 right-4 text-sm italic text-gray-500">These are static sample records (not from the database).</p>
    </motion.div>
  );
}

export default Transactions;