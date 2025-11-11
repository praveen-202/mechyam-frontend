// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import JobList from "../../components/AdminPage/JobList";
import JobForm from "../../components/AdminPage/JobForm";
import AppliedJobs from "../../components/AdminPage/AppliedJobs";
import ContactDetails from "../../components/AdminPage/ContactDetails";
import UploadNewProjects from "../../components/AdminPage/UploadNewProjects";
import UploadNewClients from "../../components/AdminPage/UploadNewClients";
import DashboardHome from "../../components/AdminPage/DashBoardhome.jsx";
import {
  Menu,
  LogOut,
  List,
  PlusCircle,
  Users,
  Phone,
  Upload,
  Building2,
} from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("DashboardHome");
  const [menuOpen, setMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const adminEmail = sessionStorage.getItem("email") || "Admin";
  const menuRef = useRef(null);

  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  const handleLogoutClick = async () => {
    try {
      setLoadingLogout(true);

      await axios.post(
        "http://192.168.1.114:8080/mechyam/api/admin/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
        }
      );

      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("email");
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    } finally {
      setLoadingLogout(false);
    }
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case "DashboardHome":
        return <DashboardHome setActivePage={setActivePage} />;
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
      case "UploadNewClients":
        return <UploadNewClients />;
      default:
        return <DashboardHome setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="flex justify-between items-center bg-white shadow-md p-4 z-10">
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-full hover:bg-gray-200 transition">
            <Menu size={28} className="text-blue-900" />
          </button>

          {menuOpen && (
            <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {[
                { key: "DashboardHome", label: "Dashboard Home", icon: <Menu size={18} className="text-blue-700" /> },
                { key: "JobList", label: "Job List", icon: <List size={18} className="text-blue-700" /> },
                { key: "JobForm", label: "Add Job", icon: <PlusCircle size={18} className="text-green-700" /> },
                { key: "AppliedJobs", label: "Applied Jobs", icon: <Users size={18} className="text-purple-700" /> },
                { key: "ContactDetails", label: "Contact Details", icon: <Phone size={18} className="text-orange-700" /> },
                { key: "UploadNewProjects", label: "Upload New Projects", icon: <Upload size={18} className="text-pink-700" /> },
                { key: "UploadNewClients", label: "Add New Client", icon: <Building2 size={18} className="text-green-700" /> },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setActivePage(item.key); setMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-blue-100 ${
                    activePage === item.key ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

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

        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

        
      </header>

      <main
  className="flex-1 overflow-y-auto bg-white rounded-t-xl shadow-inner p-6"
  style={{ scrollbarWidth: "thin", scrollbarColor: "#93c5fd #f3f4f6" }}
>
  {activePage !== "DashboardHome" && (
    <button
      onClick={() => setActivePage("DashboardHome")}
      className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
    >
      ← Back to Dashboard
    </button>
  )}

  {renderContent()}
</main>

    </div>
  );
};

export default AdminDashboard;
