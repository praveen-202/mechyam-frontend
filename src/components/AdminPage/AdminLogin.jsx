// // // src/components/AdminPage/AdminLogin.jsx
// // import React, { useState } from "react";
// // import axios from "axios";
// // import OTPModal from "./OTPModal";


// // const AdminLogin = ({ onVerified }) => {
// //   // ===============================
// //   // 🔹 Component State Management
// //   // ===============================
// //   const [formData, setFormData] = useState({ email: "", password: "" }); // Stores login credentials
// //   const [error, setError] = useState(""); // For displaying error messages
// //   const [showOTP, setShowOTP] = useState(false); // Controls OTP Modal visibility
// //   const [isClicked, setIsClicked] = useState(false); // Button click animation
// //   const [loading, setLoading] = useState(false); // Spinner/loading state

// //   // ===============================
// //   // 🖊️ Handle input field changes
// //   // ===============================
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setError(""); // Clear any previous error when typing
// //   };

// //   // ===============================
// //   // 🚀 Handle Login (Verify Admin)
// //   // ===============================
// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     // 🔹 Basic validation
// //     if (!formData.email || !formData.password) {
// //       setError("Please fill in all fields");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       console.log("🔹 Calling Spring Boot Login API...");

// //       // 🔹 Make POST request to backend for authentication
// //       const response = await axios.post(
// //         "http://localhost:8080/mechyam/api/admin/auth/login",
// //         {
// //           email: formData.email,
// //           password: formData.password,
// //         }
// //       );

// //       console.log("✅ Login successful:", response.data);

// //       // 🔹 Save JWT Token & Email in sessionStorage
// //       sessionStorage.setItem("token", response.data.token);
// //       sessionStorage.setItem("email", response.data.email);

// //       // 🔹 Add small button click animation
// //       setIsClicked(true);
// //       setTimeout(() => setIsClicked(false), 200);

// //       // 🔹 Show OTP Modal (2nd step verification)
// //       setShowOTP(true);
// //     } catch (err) {
// //       console.error("❌ Login failed:", err.response?.data);

// //       // 🔹 Handle backend error or fallback error message
// //       setError(
// //         err.response?.data?.message ||
// //           "Invalid credentials. Use: admin@mechyam.com / admin123"
// //       );
// //     } finally {
// //       // 🔹 Stop loading spinner
// //       setLoading(false);
// //     }
// //   };

// //   // ===============================
// //   // ✅ Handle OTP Verification Success
// //   // ===============================
// //   const handleOTPVerified = () => {
// //     console.log("✅ OTP verified successfully");
// //     setShowOTP(false);
// //     onVerified(); // Tell parent component (AdminPage) that admin is verified
// //   };

// //   // ===============================
// //   // 🎨 Component UI
// //   // ===============================
// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
// //       <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
// //         {/* 🔹 Heading */}
// //         <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
// //           Admin Login
// //         </h1>

// //         {/* 🔹 Login Form */}
// //         <form onSubmit={handleVerify} className="space-y-5">
// //           {/* 📨 Email Field */}
// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="admin@mechyam.com"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           {/* 🔐 Password Field */}
// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="admin123"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           {/* ⚠️ Error Message Display */}
// //           {error && (
// //             <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
// //               {error}
// //             </p>
// //           )}

// //           {/* 🔘 Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             onMouseDown={() => setIsClicked(true)}
// //             onMouseUp={() => setIsClicked(false)}
// //             className={`w-full bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${
// //               isClicked ? "scale-95 bg-blue-800" : "hover:bg-blue-800"
// //             } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
// //           >
// //             {loading ? (
// //               <div className="flex items-center justify-center">
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                 Verifying...
// //               </div>
// //             ) : (
// //               "Verify via OTP"
// //             )}
// //           </button>
// //         </form>

// //         {/* 🧩 Demo Credentials Section */}
// //         <div className="mt-6 p-3 bg-blue-50 rounded-lg">
// //           <p className="text-sm text-blue-800 font-semibold text-center">
// //             Demo Credentials:
// //           </p>
// //           <p className="text-xs text-blue-600 text-center">
// //             Email: admin@mechyam.com
// //           </p>
// //           <p className="text-xs text-blue-600 text-center">
// //             Password: admin123
// //           </p>
// //         </div>

// //         {/* 🔐 OTP Modal (2-Step Verification) */}
// //         {showOTP && (
// //           <OTPModal
// //             email={formData.email}
// //             onVerified={handleOTPVerified} // Callback when OTP verified
// //             onClose={() => setShowOTP(false)} // Handle modal close
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLogin;



// // // src/components/AdminPage/AdminLogin.jsx
// // import React, { useState } from "react";
// // import axios from "axios";
// // import OTPModal from "./OTPModal";

// // const AdminLogin = ({ onVerified }) => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [showOTP, setShowOTP] = useState(false);
// //   const [isClicked, setIsClicked] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ ADD THIS STATE for temporary token
// //   const [tempToken, setTempToken] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setError("");
// //   };

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     if (!formData.email || !formData.password) {
// //       setError("Please fill in all fields");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       console.log("🔹 Calling Spring Boot Login API...");

// //       const response = await axios.post(
// //         "http://192.168.1.192:8085/mechyam/api/admin/auth/login",
// //         {
// //           email: formData.email,
// //           password: formData.password,
// //         }
// //       );

// //       console.log("✅ Login successful:", response.data);

// //       // ✅ STORE TEMPORARY TOKEN from response
// //       if (response.data.tempToken) {
// //         setTempToken(response.data.tempToken);
// //         console.log("🔐 Temporary Token stored:", response.data.tempToken);
// //       } else {
// //         console.log("❌ No tempToken in response:", response.data);
// //       }

// //       // Save email in sessionStorage
// //       sessionStorage.setItem("email", formData.email);

// //       // Button animation
// //       setIsClicked(true);
// //       setTimeout(() => setIsClicked(false), 200);

// //       // Show OTP Modal
// //       setShowOTP(true);
// //     } catch (err) {
// //       console.error("❌ Login failed:", err.response?.data);
// //       setError(
// //         err.response?.data?.message ||
// //           "Invalid credentials. Use: admin@mechyam.com / admin123"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOTPVerified = (responseData) => {
// //     console.log("✅ OTP verified successfully:", responseData);

// //     // ✅ STORE FINAL TOKEN from OTP verification
// //     if (responseData.token) {
// //       sessionStorage.setItem("token", responseData.token);
// //       console.log("🔐 Final Token stored:", responseData.token);
// //     }

// //     setShowOTP(false);
// //     onVerified(); // Tell parent component that admin is verified
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
// //       <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
// //         <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
// //           Admin Login
// //         </h1>

// //         <form onSubmit={handleVerify} className="space-y-5">
// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="admin@mechyam.com"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="admin123"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //               required
// //             />
// //           </div>

// //           {error && (
// //             <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
// //               {error}
// //             </p>
// //           )}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             onMouseDown={() => setIsClicked(true)}
// //             onMouseUp={() => setIsClicked(false)}
// //             className={`w-full bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${
// //               isClicked ? "scale-95 bg-blue-800" : "hover:bg-blue-800"
// //             } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
// //           >
// //             {loading ? (
// //               <div className="flex items-center justify-center">
// //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                 Verifying...
// //               </div>
// //             ) : (
// //               "Verify via OTP"
// //             )}
// //           </button>
// //         </form>

// //         <div className="mt-6 p-3 bg-blue-50 rounded-lg">
// //           <p className="text-sm text-blue-800 font-semibold text-center">
// //             Demo Credentials:
// //           </p>
// //           <p className="text-xs text-blue-600 text-center">
// //             Email: admin@mechyam.com
// //           </p>
// //           <p className="text-xs text-blue-600 text-center">
// //             Password: admin123
// //           </p>
// //         </div>

// //         {/* ✅ PASS TEMP TOKEN TO OTP MODAL */}
// //         {showOTP && (
// //           <OTPModal
// //             email={formData.email}
// //             tempToken={tempToken} // ✅ THIS WAS MISSING!
// //             onVerified={handleOTPVerified}
// //             onClose={() => setShowOTP(false)}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLogin;



// // // src/components/AdminPage/AdminLogin.jsx
// // import React, { useState } from "react";
// // import axios from "axios";
// // import OTPModal from "./OTPModal";

// // const BASE_URL = "http://localhost:8080/mechyam/api/admin/auth";

// // const AdminLogin = ({ onVerified }) => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [showOTP, setShowOTP] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [tempToken, setTempToken] = useState("");

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setError("");
// //   };

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     if (!formData.email || !formData.password) {
// //       setError("Please fill in all fields");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       console.log("🔹 Sending login request...");
// //       const response = await axios.post(`${BASE_URL}/login`, {
// //         email: formData.email,
// //         password: formData.password,
// //       });

// //       console.log("✅ Login successful:", response.data);

// //       if (response.data.tempToken) {
// //         setTempToken(response.data.tempToken);
// //         console.log("🔐 Temp token received:", response.data.tempToken);
// //         sessionStorage.setItem("email", formData.email);
// //         setShowOTP(true);
// //       } else {
// //         setError("Server did not return a temporary token.");
// //       }
// //     } catch (err) {
// //       console.error("❌ Login failed:", err);
// //       if (err.code === "ERR_NETWORK") {
// //         setError("Backend server is not reachable. Please start your Spring Boot backend on port 8085.");
// //       } else {
// //         setError(err.response?.data?.message || "Invalid credentials. Try again.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleOTPVerified = (data) => {
// //     console.log("✅ OTP Verified Successfully:", data);
// //     if (data.token) {
// //       sessionStorage.setItem("token", data.token);
// //       console.log("🔐 Final JWT stored:", data.token);
// //     }
// //     setShowOTP(false);
// //     onVerified?.();
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
// //       <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">
// //         <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
// //           Admin Login
// //         </h1>

// //         <form onSubmit={handleVerify} className="space-y-5">
// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="admin@mechyam.com"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-700 mb-1 font-medium">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="admin123"
// //               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           {error && (
// //             <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
// //               {error}
// //             </p>
// //           )}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
// //               }`}
// //           >
// //             {loading ? "Verifying..." : "Verify via OTP"}
// //           </button>
// //         </form>

// //         <div className="mt-6 p-3 bg-blue-50 rounded-lg text-center text-sm text-blue-800 font-medium">
// //           Demo Credentials:
// //           <div className="text-xs text-blue-600">
// //             Email: admin@mechyam.com | Password: admin123
// //           </div>
// //         </div>

// //         {showOTP && (
// //           <OTPModal
// //             email={formData.email}
// //             tempToken={tempToken}
// //             onVerified={handleOTPVerified}
// //             onClose={() => setShowOTP(false)}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLogin;



// src/components/AdminPage/AdminLogin.jsx
import React, { useState } from "react";
import OTPModal from "./OTPModal";

const AdminLogin = ({ onVerified }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/mechyam/api/admin/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.token) {
        console.log("✅ Login success:", data);

        // Store token if needed later
        localStorage.setItem("adminToken", data.token);

        // ✅ After successful login, show the hardcoded OTP modal
        setShowOTP(true);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px] relative">
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
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-800"
            } text-white py-2 rounded-lg font-semibold transition`}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        {/* ✅ OTP Modal appears only after successful login */}
        {showOTP && (
          <OTPModal
            email={formData.email}
            onVerified={onVerified}
            onClose={() => setShowOTP(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;



// // src/components/AdminPage/AdminLogin.jsx
// import React, { useState } from "react";

// const AdminLogin = ({ onVerified }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🖊 Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   // 🚀 Handle Login
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setError("");

//     const { email, password } = formData;
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/mechyam/api/admin/auth/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.token) {
//         console.log("✅ Login successful:", data);

//         // Store JWT token for session management
//         localStorage.setItem("adminToken", data.token);
//         localStorage.setItem("adminEmail", email);

//         // Notify parent that admin is verified/logged in
//         onVerified?.();
//       } else {
//         setError(data.message || "Invalid email or password");
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🎨 UI
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
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
//               placeholder="admin@mechyam.com"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               required
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
//               required
//             />
//           </div>

//           {error && (
//             <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
//             } text-white py-2 rounded-lg font-semibold transition-all duration-150`}
//           >
//             {loading ? "Verifying..." : "Login"}
//           </button>
//         </form>

//         {/* Demo Info */}
//         <div className="mt-6 p-3 bg-blue-50 rounded-lg text-center text-sm text-blue-800 font-medium">
//           Demo Credentials:
//           <div className="text-xs text-blue-600">
//             Email: admin@mechyam.com | Password: admin123
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
