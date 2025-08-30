import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CalendarClock,
  Truck,
  Wrench,
  User2,
  MapPin,
  Clock,
  Download,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   Animation Variants
========================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 110, damping: 14 } },
};
const rowVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.03, duration: 0.25 } }),
};
const hoverEffect = {
  scale: 1.02,
  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
  transition: { type: "spring", stiffness: 400, damping: 18 },
};
const tapEffect = { scale: 0.985 };

/* =========================
   Dummy Schedule Data
   Types reflect EV/e-commerce ops:
   - Test Drive, Delivery, Service
========================= */
const schedulesData = [
  {
    id: 1,
    title: "Test Drive — MR-Trac Pro",
    type: "Test Drive",
    assignedTo: "A. Kumar",
    customer: "Riya Sharma",
    datetime: "2025-09-01T10:30:00+05:30",
    durationMin: 45,
    location: "Pune Showroom",
    status: "Scheduled",
    channel: "In-person",
  },
  {
    id: 2,
    title: "Delivery — MR-Trac Lite",
    type: "Delivery",
    assignedTo: "S. Patel",
    customer: "GreenAgro Co.",
    datetime: "2025-09-02T14:00:00+05:30",
    durationMin: 60,
    location: "Ahmedabad Warehouse",
    status: "Scheduled",
    channel: "In-person",
  },
  {
    id: 3,
    title: "Service — Battery Health Check",
    type: "Service",
    assignedTo: "M. Singh",
    customer: "Anand Farms",
    datetime: "2025-08-25T11:15:00+05:30",
    durationMin: 40,
    location: "On-site (Nashik)",
    status: "Completed",
    channel: "On-site",
  },
  {
    id: 4,
    title: "Test Drive — MR-Trac Ultra",
    type: "Test Drive",
    assignedTo: "P. Verma",
    customer: "Rohan Industries",
    datetime: "2025-08-28T16:00:00+05:30",
    durationMin: 30,
    location: "Mumbai Experience Center",
    status: "Cancelled",
    channel: "In-person",
  },
  {
    id: 5,
    title: "Delivery — MR-Trac Pro",
    type: "Delivery",
    assignedTo: "A. Kumar",
    customer: "Sai Krishi",
    datetime: "2025-09-03T09:30:00+05:30",
    durationMin: 75,
    location: "Nagpur Hub",
    status: "Scheduled",
    channel: "In-person",
  },
  {
    id: 6,
    title: "Service — Firmware Update",
    type: "Service",
    assignedTo: "J. Dutta",
    customer: "Riva Organics",
    datetime: "2025-08-20T09:00:00+05:30",
    durationMin: 25,
    location: "Remote",
    status: "Completed",
    channel: "Virtual",
  },
];

/* =========================
   Helpers
========================= */
const typeIcon = (type) => {
  if (type === "Test Drive") return <CalendarClock className="h-4 w-4" />;
  if (type === "Delivery") return <Truck className="h-4 w-4" />;
  return <Wrench className="h-4 w-4" />; // Service
};

const statusPill = (status) => {
  const map = {
    Scheduled: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-700";
};


const fmtDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const withinRange = (iso, from, to) => {
  const d = new Date(iso).getTime();
  if (from) {
    const start = new Date(from + "T00:00:00").getTime();
    if (d < start) return false;
  }
  if (to) {
    const end = new Date(to + "T23:59:59").getTime();
    if (d > end) return false;
  }
  return true;
};

/* =========================
   Component
========================= */
export default function Schedules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("datetime");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const toggleSort = (key) => {
    if (sortBy === key) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setFilterStatus("all");
    setFilterType("all");
    setFilterPriority("all");
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };

  const filteredSorted = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const arr = schedulesData
      .filter((it) => {
        const matchesSearch =
          it.title.toLowerCase().includes(q) ||
          it.assignedTo.toLowerCase().includes(q) ||
          it.customer.toLowerCase().includes(q) ||
          it.location.toLowerCase().includes(q) ||
          it.type.toLowerCase().includes(q);
        const matchesStatus = filterStatus === "all" || it.status.toLowerCase() === filterStatus.toLowerCase();
        const matchesType = filterType === "all" || it.type.toLowerCase() === filterType.toLowerCase();
        const matchesPriority = filterPriority === "all" || it.priority.toLowerCase() === filterPriority.toLowerCase();
        const matchesDate = withinRange(it.datetime, dateFrom, dateTo);
        return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === "datetime") {
          const da = new Date(a.datetime).getTime();
          const db = new Date(b.datetime).getTime();
          return sortOrder === "asc" ? da - db : db - da;
        }
        const av = (a[sortBy] || "").toString().toLowerCase();
        const bv = (b[sortBy] || "").toString().toLowerCase();
        return sortOrder === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });

    return arr;
  }, [searchQuery, filterStatus, filterType, filterPriority, dateFrom, dateTo, sortBy, sortOrder]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageSafe = Math.min(page, totalPages);
  const sliceStart = (pageSafe - 1) * perPage;
  const pageItems = filteredSorted.slice(sliceStart, sliceStart + perPage);

  const kpis = useMemo(() => {
    const s = filteredSorted.reduce(
      (acc, it) => {
        acc.total++;
        acc[it.status] = (acc[it.status] || 0) + 1;
        return acc;
      },
      { total: 0, Scheduled: 0, Completed: 0, Cancelled: 0 }
    );
    return s;
  }, [filteredSorted]);

  const exportCSV = () => {
    const cols = ["id","title","type","assignedTo","customer","datetime","durationMin","location","status","priority","channel"];
    const lines = [cols.join(",")].concat(
      filteredSorted.map((it) =>
        cols
          .map((c) => {
            const val = it[c] ?? "";
            const safe = String(val).replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(",")
      )
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schedules.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 ">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Schedules</h1>
          <p className="text-gray-500 text-sm mt-1">Manage test drives, deliveries and service slots.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          {/* Search */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <input
              type="text"
              placeholder="Search (title, customer, location, assignee)…"
              value={searchQuery}
              onChange={(e) => { setPage(1); setSearchQuery(e.target.value); }}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </motion.div>

          {/* Filter */}
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            onClick={() => setIsFilterOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            {isFilterOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </motion.button>

          {/* Export */}
          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </motion.button>

        </div>
      </motion.div>


      {/* Filters Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-4 rounded-lg shadow mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => { setPage(1); setFilterStatus(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => { setPage(1); setFilterType(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="Test Drive">Test Drive</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Service">Service</option>
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => { setPage(1); setDateFrom(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => { setPage(1); setDateTo(e.target.value); }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <SortButton label="Date & Time" active={sortBy === "datetime"} order={sortOrder} onClick={() => toggleSort("datetime")} />
                <SortButton label="Title" active={sortBy === "title"} order={sortOrder} onClick={() => toggleSort("title")} />
                <SortButton label="Assignee" active={sortBy === "assignedTo"} order={sortOrder} onClick={() => toggleSort("assignedTo")} />
                <SortButton label="Customer" active={sortBy === "customer"} order={sortOrder} onClick={() => toggleSort("customer")} />
              </div>
              <button onClick={clearFilters} className="text-sm text-blue-600 hover:underline self-start">Clear filters</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="hidden md:flex justify-between gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
          <div className="lg:w-[12vw]">Title</div>
          <div  className="  lg:w-[8vw]">Type</div>
          <div className="  lg:w-[10vw]">Assigned</div>
          <div className=" lg:w-[10vw]">Customer</div>
          <div className=" lg:w-[12vw]">Date & Time</div>
          <div className="  lg:w-[12vw]">Location</div>
          <div className="text-right lg:w-[7vw]">Status</div>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {pageItems?.length > 0 ? (
              pageItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={rowVariants}
                  whileHover={{ backgroundColor: "rgba(249,250,251,0.8)" }}
                  className="grid grid-cols-1 md:flex md:justify-between gap-4 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium lg:w-[12vw] hide-scrollbar text-gray-900  whitespace-nowrap overflow-scroll">{idx+1}. {item.title}</span>
                      <span className="md:hidden text-xs text-gray-500">{fmtDate(item.datetime)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    {typeIcon(item.type)}
                    <span className="text-sm lg:w-[8vw]">{item.type}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700  lg:w-[10vw] lg:overflow-scroll hide-scrollbar lg:whitespace-nowrap ">
                    <User2 className="h-4 w-4" />
                    <span className="text-sm lg:w-[10vw] ">{item.assignedTo}</span>
                  </div>

                  <div className="text-gray-700 text-sm lg:w-[10vw] lg:overflow-scroll hide-scrollbar lg:whitespace-nowrap ">{item.customer}</div>

                  <div className="flex items-center gap-2 text-gray-700  lg:w-[12vw] lg:overflow-scroll hide-scrollbar lg:whitespace-nowrap ">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{fmtDate(item.datetime)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700  lg:w-[12vw] lg:overflow-scroll hide-scrollbar lg:whitespace-nowrap ">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{item.location}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2  lg:w-[7vw] lg:overflow-scroll hide-scrollbar lg:whitespace-nowrap ">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusPill(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="p-8 text-center">
                <div className="text-gray-400 mb-2">No schedules found</div>
                <div className="text-sm text-gray-500">Try adjusting your search or filter criteria</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{total === 0 ? 0 : sliceStart + 1}</span> to{" "}
          <span className="font-medium">{sliceStart + pageItems.length}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </div>

        <div className="flex items-center gap-2">
          <select
            value={perPage}
            onChange={(e) => { setPage(1); setPerPage(Number(e.target.value)); }}
            className="px-2 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700"
          >
            {[5,10,20].map(n => <option key={n} value={n}>{n}/page</option>)}
          </select>

          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            disabled={pageSafe === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-3 py-1.5 bg-white border rounded-md ${pageSafe === 1 ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            Previous
          </motion.button>

          <span className="text-sm text-gray-700">Page {pageSafe} / {totalPages}</span>

          <motion.button
            whileHover={hoverEffect}
            whileTap={tapEffect}
            disabled={pageSafe === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`px-3 py-1.5 bg-white border rounded-md ${pageSafe === totalPages ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>

      <p className="hidden lg:block absolute bottom-2 right-4 text-sm italic text-gray-500">These are static sample records (not from the database).</p>
    </motion.div>
  );
}


function SortButton({ label, active, order, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-lg border ${active ? "border-blue-600 text-blue-700 bg-blue-50" : "border-gray-300 text-gray-700 bg-white"} hover:bg-gray-50`}
      title={active ? `Sorted ${order}` : "Click to sort"}
    >
      {label}{active ? (order === "asc" ? " ↑" : " ↓") : ""}
    </button>
  );
}
