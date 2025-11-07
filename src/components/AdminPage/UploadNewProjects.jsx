import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UploadNewProjects = () => {
  // ------------------- State Management -------------------
  const [title, setTitle] = useState(""); // Holds project title
  const [description, setDescription] = useState(""); // Holds project description
  const [image, setImage] = useState(null); // Holds uploaded image file
  const [preview, setPreview] = useState(null); // Stores preview image URL
  const [error, setError] = useState(""); // For displaying error messages
  const [loading, setLoading] = useState(false); // Controls spinner visibility
  const [activeTab, setActiveTab] = useState("existing"); // "existing" or "upload"
  const [projects, setProjects] = useState([]); // Stores list of existing projects

  // Fetch Clients to refresh list after upload (if needed)
  const fetchClients = async () => {
    try {
      const res = await axios.get("http://192.168.1.114:8080/mechyam/api/projects");
      setProjects(res.data);
      setError("");
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      setError("Failed to load projects. Make sure backend is running .");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Submit Client Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !location) {
      setError("Please fill all fields");
      return;
    }

    const clientData = { companyName, location };

    try {
      setLoading(true); // Show spinner during upload

      // Send POST request to backend
      await axios.post("http://192.168.1.114:8080/mechyam/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Client added successfully!");

      // Reset form
      setCompanyName("");
      setLocation("");
      setError("");

      // Reload clients list
      fetchClients();

    } catch (err) {
      console.error("❌ Error adding client:", err);
      setError("Upload failed. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`http://192.168.1.114:8080/mechyam/api/projects/${projectId}`);
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
        console.error("Error deleting project:", err);
        alert("Delete failed! Please try again.");
      }
    }
  

  // ------------------- JSX UI -------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">

      {/* Header Section */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Mechyam
        </h1>
        <p className="text-blue-100">
          MECHYAM AI DESIGN SOLUTION
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <div className="flex border border-blue-500 rounded-lg overflow-hidden shadow-md">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-6 py-2 font-semibold transition-all duration-300 ${
                activeTab === "upload"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
          
            }`}
            >
                Upload Project
            </button>
            <button
              onClick={() => setActiveTab("existing")}
              className={`px-6 py-2 font-semibold transition-all duration-300 ${
                activeTab === "existing"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
                Existing Projects
            </button>
        </div>
      </div>


       
     {/*  Condotional Rendering for Tabs */}
     {activeTab === "upload" && (
      <div className="max-w-5xl mx-auto bg-white rounded shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Add New Client
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Client Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter project / location"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              "Add Client"
            )}
          </button>
        </form>
      </div>
    )}

 {/* existing projects tab */}

    {activeTab === "existing" && (
      <div className=" max-w-6xl mx-auto bg-white rounded shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Existing Projects
        </h2>


          {projects.length === 0 ? (
            <p className="text-center text-gary-500" >No projects uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div
                  key={proj.id || index}
                  className=" flex items-center justify-between bg-gray-50 rounded-xl shadow-md hover:shadow-md transition-all duration-300 p-4"
                >
                  {/* Image */}
                  <div className="flex items-center gap-4">
                  <img
                    src={proj.imageUrl || proj.image}
                    alt={proj.title}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-400"
                  />

                  <div>
                  <h3 className=" text-lg font-semibold text-blue-700 mb-2">
                    {proj.title}
                  </h3>
                  <p>
                    <span className="font-semibold">Project Code:</span>{" "}
                    {proj.code || `PRJ-${index + 1}`}
                  </p>
                 </div>
                </div>
                  
              {/* Delete Button */}
              <button
                  onClick={() => handleDelete(proj.id)}
                  className=" bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-600 transition"
              >
                  Delete
              </button>
             </div>
            ))}
          </div>
        )}
      </div>
  )};
</div> 
)}


export default UploadNewProjects;
