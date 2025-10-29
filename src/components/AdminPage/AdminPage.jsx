// src/components/AdminPage/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "../../pages/more-dropdown/AdminDashboard";

const AdminPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if user is already logged in (token exists)
    const token = sessionStorage.getItem("token");
    console.log("🔹 Checking token on page load:", token);
    
    if (token) {
      console.log("🔹 Token found, user is logged in");
      setIsVerified(true);
    } else {
      console.log("🔹 No token found, user needs to login");
      setIsVerified(false);
    }
  }, []);

  const handleVerified = () => {
    console.log("🔹 handleVerified called - user logged in successfully");
    setIsVerified(true);
    // Ensure we're on the admin page
    navigate("/admin-page");
  };

  const handleLogout = () => {
    console.log("🔹 Logging out...");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    setIsVerified(false);
    navigate("/admin-page");
  };

  console.log("🔹 AdminPage - isVerified:", isVerified);

  return (
    <div>
      {!isVerified ? (
        <AdminLogin onVerified={handleVerified} />
      ) : (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default AdminPage;