// 

// src/components/AdminPage/AdminLogin.jsx
import React, { useState } from "react";
import OTPModal from "./OTPModal";
import axios from "axios";

const AdminLogin = ({ onVerified }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("🔹 Calling Spring Boot API...");
      
      const response = await axios.post(
        "http://localhost:8085/mechyam/api/admin/auth/login",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("🔹 Login successful:", response.data);

      // ✅ Save token to sessionStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", response.data.email);

      // ✅ Button click animation
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);

      // ✅ Show OTP modal after successful API login
      setShowOTP(true);

    } catch (err) {
      console.log("🔹 Login failed:", err.response?.data);
      setError(
        err.response?.data?.message || 
        "Invalid credentials. Use: admin@mechyam.com / admin123"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ This function will be passed to OTPModal
  const handleOTPVerified = () => {
    console.log("🔹 OTP verified, calling onVerified");
    setShowOTP(false);
    onVerified(); // This tells AdminPage that user is verified
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@mechyam.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="admin123"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            className={`w-full bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${
              isClicked ? "scale-95 bg-blue-800" : "hover:bg-blue-800"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify via OTP"
            )}
          </button>
        </form>

        {/* Demo credentials helper */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold text-center">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-600 text-center">Email: admin@mechyam.com</p>
          <p className="text-xs text-blue-600 text-center">Password: admin123</p>
        </div>

        {/* OTP Modal - Pass the correct function */}
        {showOTP && (
          <OTPModal
            email={formData.email}
            onVerified={handleOTPVerified} // ✅ Pass the correct function
            onClose={() => setShowOTP(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;