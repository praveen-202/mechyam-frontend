import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BurgerMenu = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://localhost:8080/mechyam/api/admin/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // ✅ Clear sessionStorage, not localStorage
      sessionStorage.clear();

      // ✅ Close menu
      setIsOpen(false);

      // ✅ Redirect to login page
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-6 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-6">Admin Menu</h2>
          <ul className="space-y-4">
            <li
              className="text-gray-700 font-medium hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="text-gray-700 font-medium hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/admin/jobs")}
            >
              Manage Jobs
            </li>
            <li
              className="text-gray-700 font-medium hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/admin/contact")}
            >
              Contact Messages
            </li>
          </ul>
        </div>

        {/* ✅ Logout at bottom */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold mt-6 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default BurgerMenu;
