// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import JobList from "../../components/AdminPage/JobList";
import JobForm from "../../components/AdminPage/JobForm";
import AppliedJobs from "../../components/AdminPage/AppliedJobs";
import ContactDetails from "../../components/AdminPage/ContactDetails";
import UploadNewProjects from "../../components/AdminPage/UploadNewProjects";
import { Menu, LogOut } from "lucide-react";
import axios from "axios";

const AdminDashboard = ({ onLogout }) => {
  const [activePage, setActivePage] = useState("JobList");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false);

  // Handle job addition
  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  // ✅ Handle logout click
  const handleLogoutClick = async () => {
    try {
      setLoadingLogout(true);
      console.log("🔹 Logging out...");

      // 🔹 Call backend logout API
      await axios.post("http://localhost:8080/mechyam/api/admin/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      // 🔹 Clear sessionStorage and notify parent
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");

      console.log("✅ Logged out successfully.");
      onLogout(); // Notify AdminPage to navigate to login
    } catch (err) {
      console.error("❌ Logout failed:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setLoadingLogout(false);
    }
  };

  // Render main content area
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
      case "UploadNewProjects":
        return <UploadNewProjects />;
      default:
        return <JobList jobs={jobs} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* ==============================
           🔹 Top Navigation Bar
         ============================== */}
      <header className="flex justify-between items-center bg-white shadow-md p-4 z-10">
        {/* 🍔 Burger Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Menu size={28} className="text-blue-900" />
          </button>

          {/* 📋 Dropdown Menu */}
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {[
                "JobList",
                "JobForm",
                "AppliedJobs",
                "ContactDetails",
                "UploadNewProjects",
              ].map((item) => (
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
                  {item === "UploadNewProjects" && "🧩 Upload New Projects"}
                </button>
              ))}

              {/* 🚪 Logout Button */}
              <div className="border-t border-gray-200 mt-2">
                <button
                  onClick={handleLogoutClick}
                  disabled={loadingLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  <LogOut size={18} />
                  {loadingLogout ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 🏷️ Heading */}
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
      </header>

      {/* ==============================
           🔹 Scrollable Main Content
         ============================== */}
      <main
        className="flex-1 overflow-y-auto bg-white rounded-t-xl shadow-inner p-6"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#93c5fd #f3f4f6" }}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
