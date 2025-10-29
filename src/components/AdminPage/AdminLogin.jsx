// // src/components/AdminPage/AdminLogin.jsx
// import React, { useState } from "react";
// import OTPModal from "./OTPModal";

// const AdminLogin = ({ onVerified }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showOTP, setShowOTP] = useState(false);
//   const [isClicked, setIsClicked] = useState(false); // ✅ new state for click animation

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleVerify = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (formData.email !== "a@a.com" || formData.password !== "a123") {
//       setError("Invalid credentials");
//       return;
//     }

//     // ✅ Button click animation
//     setIsClicked(true);
//     setTimeout(() => setIsClicked(false), 200);

//     // Show OTP modal
//     setShowOTP(true);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
//       {/* Login Form Container */}
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
//         <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
//           Admin Login
//         </h1>

//         <form onSubmit={handleVerify} className="space-y-5">
//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="admin@company.com"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {error && <p className="text-red-600 text-sm text-center">{error}</p>}

//           {/* ✅ Animated Button */}
//           <button
//             type="submit"
//             onMouseDown={() => setIsClicked(true)}
//             onMouseUp={() => setIsClicked(false)}
//             className={`w-full bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${
//               isClicked ? "scale-95 bg-blue-800" : "hover:bg-blue-800"
//             }`}
//           >
//             Verify via OTP
//           </button>
//         </form>

//         {/* OTP Modal */}
//         {showOTP && (
//           <OTPModal
//             email={formData.email}
//             onVerified={onVerified}
//             onClose={() => setShowOTP(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;


// src/components/AdminPage/AdminLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import OTPModal from "./OTPModal";

const AdminLogin = ({ onVerified }) => {
  // ===============================
  // 🔹 Component State Management
  // ===============================
  const [formData, setFormData] = useState({ email: "", password: "" }); // Stores login credentials
  const [error, setError] = useState(""); // For displaying error messages
  const [showOTP, setShowOTP] = useState(false); // Controls OTP Modal visibility
  const [isClicked, setIsClicked] = useState(false); // Button click animation
  const [loading, setLoading] = useState(false); // Spinner/loading state

  // ===============================
  // 🖊️ Handle input field changes
  // ===============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear any previous error when typing
  };

  // ===============================
  // 🚀 Handle Login (Verify Admin)
  // ===============================
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔹 Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("🔹 Calling Spring Boot Login API...");

      // 🔹 Make POST request to backend for authentication
      const response = await axios.post(
        "http://localhost:8080/mechyam/api/admin/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("✅ Login successful:", response.data);

      // 🔹 Save JWT Token & Email in sessionStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", response.data.email);

      // 🔹 Add small button click animation
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);

      // 🔹 Show OTP Modal (2nd step verification)
      setShowOTP(true);
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data);

      // 🔹 Handle backend error or fallback error message
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Use: admin@mechyam.com / admin123"
      );
    } finally {
      // 🔹 Stop loading spinner
      setLoading(false);
    }
  };

  // ===============================
  // ✅ Handle OTP Verification Success
  // ===============================
  const handleOTPVerified = () => {
    console.log("✅ OTP verified successfully");
    setShowOTP(false);
    onVerified(); // Tell parent component (AdminPage) that admin is verified
  };

  // ===============================
  // 🎨 Component UI
  // ===============================
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
        {/* 🔹 Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Admin Login
        </h1>

        {/* 🔹 Login Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          {/* 📨 Email Field */}
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

          {/* 🔐 Password Field */}
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

          {/* ⚠️ Error Message Display */}
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          {/* 🔘 Submit Button */}
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

        {/* 🧩 Demo Credentials Section */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold text-center">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-600 text-center">
            Email: admin@mechyam.com
          </p>
          <p className="text-xs text-blue-600 text-center">
            Password: admin123
          </p>
        </div>

        {/* 🔐 OTP Modal (2-Step Verification) */}
        {showOTP && (
          <OTPModal
            email={formData.email}
            onVerified={handleOTPVerified} // Callback when OTP verified
            onClose={() => setShowOTP(false)} // Handle modal close
          />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
