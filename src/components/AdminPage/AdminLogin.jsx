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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setIsClicked(true);

      // ✅ Call backend for authentication
      const response = await axios.post(
        "http://localhost:8085/mechyam/api/admin/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Example expected response:
      // { success: true, message: "Login successful" }
      if (response.data && response.data.success) {
        setShowOTP(true); // ✅ Open OTP modal only if login success
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to login. Please try again later.");
      }
    } finally {
      setIsClicked(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      {/* Login Form Container */}
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
              placeholder="admin@company.com"
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
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* ✅ Animated Button with Loading */}
          <button
            type="submit"
            disabled={loading}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            className={`w-full flex justify-center items-center bg-blue-900 text-white py-2 rounded-lg font-semibold transition-all duration-150 ${isClicked ? "scale-95 bg-blue-800" : "hover:bg-blue-800"
              } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify via OTP"
            )}
          </button>
        </form>

        {/* OTP Modal */}
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
