import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadNewProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ CORRECT URL - port 8085 with /mechyam context path
  const API_BASE_URL = "http://localhost:8085/mechyam";

  // ✅ Fetch existing projects (optional — can use later for display)
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
      setError("");
      console.log("✅ Projects fetched successfully");
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
      setError("Failed to load projects. Make sure backend is running on port 8085.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      setImage(file);
      setError("");
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  // ✅ Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ✅ Submit new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post(`${API_BASE_URL}/api/projects`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert("Project uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      
      // Refresh projects list
      fetchProjects();
      
    } catch (error) {
      console.error("❌ Error uploading project:", error);
      const errorMessage = error.response?.data?.message || "Upload failed! Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Mechyam Project Upload
        </h1>
        <p className="text-blue-100">
          Upload your latest innovations and share your tech brilliance.
        </p>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Upload New Project
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-rows gap-8">
          {/* Image Upload with Preview */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Project Image
            </label>
            <div className="relative border-2 border-dashed border-blue-300 rounded-lg p-10 text-center bg-gray-50 hover:bg-blue-50 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {!preview ? (
                <p className="text-gray-500">Click or drag to upload an image</p>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-64 h-64 object-cover rounded-lg shadow-md border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNewProjects;