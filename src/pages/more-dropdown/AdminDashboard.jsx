// // src/pages/AdminDashboard.jsx
// import React, { useState } from "react";
// import JobList from "../../components/AdminPage/JobList";
// import JobForm from "../../components/AdminPage/JobForm";
// // import AdminLogin from "./components/AdminPage/AdminLogin";

// const AdminDashboard = () => {
//   const [jobs, setJobs] = useState([]);

//   const handleAddJob = (job) => {
//     setJobs([...jobs, job]);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left: Job List */}
//       <div className="w-1/2 p-8">
//         <JobList jobs={jobs} />
//       </div>

//       {/* Right: Job Form */}
//       <div className="w-1/2 p-8">
//         <JobForm onAddJob={handleAddJob} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

//====================================

// import React, { useState } from "react";
// import JobList from "../../components/AdminPage/JobList";
// import JobForm from "../../components/AdminPage/JobForm";

// const AdminDashboard = () => {
//   const [jobs, setJobs] = useState([]);

//   const handleAddJob = (job) => {
//     setJobs([...jobs, job]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* 🔹 Top Section — Contact Details + Applied Job List */}
//       <div className="bg-white shadow-md p-6 flex flex-wrap justify-between items-start gap-6 border-b border-gray-200">
//         {/* Contact Details Section */}
//         <div className="flex-1 min-w-[280px] bg-blue-50 p-4 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold text-blue-800 mb-3 border-b border-blue-300 pb-1">
//             Contact Details
//           </h2>
//           <p><span className="font-bold text-gray-800">Email:</span> hr@mechyam.com</p>
//           <p><span className="font-bold text-gray-800">Phone:</span> +91 98765 43210</p>
//           <p><span className="font-bold text-gray-800">Address:</span> Pune, Maharashtra, India</p>
//         </div>

//         {/* Applied Job List Section */}
//         <div className="flex-1 min-w-[280px] bg-green-50 p-4 rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold text-green-800 mb-3 border-b border-green-300 pb-1">
//             Recently Applied Jobs
//           </h2>
//           <ul className="list-disc pl-5 text-gray-700 space-y-1">
//             <li>Frontend Developer - John Doe</li>
//             <li>Backend Engineer - Priya Sharma</li>
//             <li>UI/UX Designer - Arjun Patel</li>
//           </ul>
//           <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition">
//             View All Applications
//           </button>
//         </div>
//       </div>

//       {/* 🔹 Bottom Section — JobList and JobForm */}
//       <div className="flex-1 flex flex-wrap">
//         {/* Left: Job List */}
//         <div className="w-full lg:w-1/2 p-8">
//           <JobList jobs={jobs} />
//         </div>

//         {/* Right: Job Form */}
//         <div className="w-full lg:w-1/2 p-8 border-l border-gray-200 bg-gray-50">
//           <JobForm onAddJob={handleAddJob} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


//=====================

// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import JobList from "../../components/AdminPage/JobList";
import JobForm from "../../components/AdminPage/JobForm";
import AppliedJobs from "../../components/AdminPage/AppliedJobs";
import ContactDetails from "../../components/AdminPage/ContactDetails";
import { Menu } from "lucide-react"; // For burger icon

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("JobList");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  const renderContent = () => {
    switch (activePage) {
      case "JobList":
        return <JobList jobs={jobs} />;
      case "JobForm":
        return <JobForm onAddJob={handleAddJob} />;
      case "AppliedJobs":
        return <AppliedJobs />;
      case "ContactDetails":
        return <ContactDetails />;
      default:
        return <JobList jobs={jobs} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      {/* ==============================
           🔹 Top Navigation Bar
         ============================== */}
      <header className="flex justify-between items-center mb-6">
        {/* 🍔 Burger Menu (Left Side) */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Menu size={28} className="text-blue-900" />
          </button>

          {/* 📋 Dropdown Menu */}
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {["JobList", "JobForm", "AppliedJobs", "ContactDetails"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActivePage(item);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-100 ${
                      activePage === item ? "bg-blue-50 font-semibold" : ""
                    }`}
                  >
                    {item === "JobList" && "📋 Job List"}
                    {item === "JobForm" && "➕ Add Job"}
                    {item === "AppliedJobs" && "👥 Applied Jobs"}
                    {item === "ContactDetails" && "📞 Contact Details"}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* 🏷️ Heading (Right Side) */}
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
      </header>

      {/* ==============================
           🔹 Main Content Area
         ============================== */}
      <main className="bg-white rounded-xl shadow-md p-6">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;

