// src/components/Projects.jsx
// -------------------------------------------------------
// This component fetches project data from the backend API,
// displays them in a grid layout, and shows a modal with
// more details when a project is clicked.
// -------------------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  // -------------------------------------------------------
  // State variables
  // -------------------------------------------------------
  const [projects, setProjects] = useState([]); // Stores list of projects fetched from API
  const [selected, setSelected] = useState(null); // Stores the currently selected project for modal display
  const [loading, setLoading] = useState(true); // Controls loading spinner visibility

  // -------------------------------------------------------
  // Function to fetch all projects from backend API
  // -------------------------------------------------------
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://192.168.1.114:8080/mechyam/api/projects");
      setProjects(res.data);
    } catch (error) {
      // Log any errors that occur during API call
      console.error("Error fetching projects:", error);
    } finally {
      // Stop showing the loading spinner once API call is done
      setLoading(false);
    }
  };

  // -------------------------------------------------------
  // useEffect hook to load project data on initial render
  // -------------------------------------------------------
  useEffect(() => {
    fetchProjects(); // Fetch data only once when component mounts
  }, []);

  // -------------------------------------------------------
  // Show loading message while projects are being fetched
  // -------------------------------------------------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl font-semibold">
        Loading projects...
      </div>
    );
  }

  // -------------------------------------------------------
  // Main Component JSX Rendering
  // -------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Our Projects
      </h1>

      {/* Conditional rendering when no projects exist */}
      {projects.length === 0 ? (
        <p className="text-center text-gray-600">No projects available.</p>
      ) : (
        // -------------------------------------------------------
        // Projects Grid Section
        // -------------------------------------------------------
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((proj) => (
            // Each project card
            <div
              key={proj.id}
              onClick={() => setSelected(proj)} // Set selected project when clicked
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Project Image */}
              <img
                src={proj.imageUrl || proj.image} // Supports both backend field names
                alt={proj.title}
                className="w-full h-48 object-cover"
              />

              {/* Project Title */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------------------------------------------
         Modal Section (for showing detailed project info)
         ------------------------------------------------------- */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)} // Close modal when background is clicked
        >
          {/* Modal content box */}
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-4 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            {/* Modal Project Image */}
            <img
              src={selected.imageUrl || selected.image}
              alt={selected.title}
              className="w-full max-h-[500px] object-cover rounded-lg mb-4"
            />

            {/* Modal Title */}
            <h2 className="text-2xl font-bold mb-2 text-blue-600">
              {selected.title}
            </h2>

            {/* Modal Description */}
            <p className="text-gray-700 mb-4">{selected.description}</p>

            {/* Modal Close Button */}
            <button
              onClick={() => setSelected(null)} // Close modal
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;