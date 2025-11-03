// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import JobList from "../../components/AdminPage/JobList";
import JobForm from "../../components/AdminPage/JobForm";
import AppliedJobs from "../../components/AdminPage/AppliedJobs";
import ContactDetails from "../../components/AdminPage/ContactDetails";
import UploadNewProjects from "../../components/AdminPage/UploadNewProjects";
import {
  Menu,
  LogOut,
  List,
  PlusCircle,
  Users,
  Phone,
  Upload,
} from "lucide-react"; // Lucide icons import
import axios from "axios";

const AdminDashboard = ({ onLogout }) => {
  const [activePage, setActivePage] = useState("JobList");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false);

  // Reference for the menu container to detect outside clicks
  const menuRef = useRef(null);

  /**
   * Handle job addition from JobForm
   * @param {Object} job - New job object to add to the list
   */
  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  /**
   * Handle admin logout operation
   * Calls backend API to invalidate token, clears session storage,
   * and navigates to the login page.
   */
  const handleLogoutClick = async () => {
    try {
      setLoadingLogout(true);

      // Backend logout API call
      await axios.post(
        "http://192.168.1.114:8080/mechyam/api/admin/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      // Clear stored session data
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");

      // Notify parent component (AdminPage) to navigate back to login
      onLogout();
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setLoadingLogout(false);
    }
  };

  /**
   * Close the burger menu if the user clicks outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu and the menu button
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Attach the event listener only when the menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when menu is closed or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  /**
   * Render the main content area based on the active menu option.
   */
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
           Top Navigation Bar
         ============================== */}
      <header className="flex justify-between items-center bg-white shadow-md p-4 z-10">
        {/* Burger Menu Button and Dropdown */}
        <div className="relative" ref={menuRef}>
          {/* Burger icon button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Menu size={28} className="text-blue-900" />
          </button>

          {/* Dropdown menu list */}
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {[
                {
                  key: "JobList",
                  label: "Job List",
                  icon: <List size={18} className="text-blue-700" />,
                },
                {
                  key: "JobForm",
                  label: "Add Job",
                  icon: <PlusCircle size={18} className="text-green-700" />,
                },
                {
                  key: "AppliedJobs",
                  label: "Applied Jobs",
                  icon: <Users size={18} className="text-purple-700" />,
                },
                {
                  key: "ContactDetails",
                  label: "Contact Details",
                  icon: <Phone size={18} className="text-orange-700" />,
                },
                {
                  key: "UploadNewProjects",
                  label: "Upload New Projects",
                  icon: <Upload size={18} className="text-pink-700" />,
                },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActivePage(item.key);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-blue-100 ${
                    activePage === item.key ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Logout Button Section */}
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

        {/* Dashboard Title */}
        <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
      </header>

      {/* ==============================
           Scrollable Main Content Area
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
