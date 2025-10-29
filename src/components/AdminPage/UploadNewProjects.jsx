import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadNewProjects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Fetch existing projects (optional — can use later for display)
  const fetchProjects = async () => {
    try {
      await axios.get("http://192.168.1.192:8085/mechyam/api/projects");
      // await axios.get("http://localhost:8085/mechyam/api/projects");
      // if you want to use data later, you can store it in state
      // but since not used now, we skip setProjects()
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
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
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://192.168.1.192:8085/mechyam/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      fetchProjects();
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Nebulytix Project Upload
        </h1>
        <p className="text-blue-100">
          Upload your latest innovations and share your tech brilliance.
        </p>
      </div>

      {/* Upload Form */}
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Upload Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNewProjects;
