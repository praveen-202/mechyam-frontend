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

        {/* 🏷 Heading (Right Side) */}
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