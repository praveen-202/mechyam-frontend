import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://192.168.1.192:8085/mechyam/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-xl font-semibold">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Our Projects
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelected(proj)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={proj.imageUrl || proj.image} // ✅ supports both keys
                alt={proj.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for description */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.imageUrl || selected.image}
              alt={selected.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-blue-600">
              {selected.title}
            </h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
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
