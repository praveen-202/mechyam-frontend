// src/components/AdminPage/AdminPage.jsx
import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "../../pages/more-dropdown/AdminDashboard";

const AdminPage = () => {
  // State to track if admin is verified via OTP
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div>
      {/* Show login if not verified, otherwise show dashboard */}
      {!isVerified ? (
        <AdminLogin onVerified={() => setIsVerified(true)} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPage;