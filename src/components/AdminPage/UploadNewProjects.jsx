// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { FileEdit } from "lucide-react";

// const UploadNewProjects = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [preview, setPreview] = useState(null);


//    // ✅ Fetch existing projects from backend
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/projects");
//       setProjects(res.data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);


//    // Handle image selection and preview
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const previewURL = URL.createObjectURL(file);
//       setPreview(previewURL);
//     }
//   };


//    // ✅ Clean up memory
//   useEffect(() => {
//     return () => {
//       if (preview) URL.revokeObjectURL(preview);
//     };
//   }, [preview]);

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !image) {
//       alert("Please fill all fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("title", title);
//     formData.append("description", description);
    

//     try {
//       await axios.post("http://localhost:8080/api/projects", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Project uploaded successfully!");

//       // Re-fetch all projects without reloading page
//       // await fetchProjects();

//       // // Reset form fields
//       // setTitle("");
//       // setDescription("");
//       // setImage(null);
//       // setPreview(null);

//       window.location.reload();

//     } catch (error) {
//       console.error("Error uploading project:", error);
//       alert("Upload failed!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-12">
//         <h1 className="text-4xl font-bold tracking-wide mb-2">
//           Nebulytix Project Upload
//         </h1>
//         <p className="text-blue-100">
//           Upload your latest innovations and share your tech brilliance.
//         </p>
//       </div>

//       {/* Upload Form */}
//       <div className="max-w-5xl mx-auto bg-white  rounded shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
//           Upload New Project
//         </h2>

//        {/* form start and  layout */}
//       <form 
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-rows gap-8"
//       >
//         {/* Image Upload with Preview */}

//           <div>
//             <label className="block text-gray-700 mb-2 font-semibold ">
//               Project Image
//             </label>

//           <div className="relative border-2 border-dashed border-blue-300 rounded-lg p-10 text-center bg-gray-50 hover:bg-blue-50 transition cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                       setImage(file);
//                       setPreview(URL.createObjectURL(file)); // ✅ Correct casing
//                   }
//                 }}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />

//                 {!preview ? (
//                     <p className="text-gray-500">Click or drag to upload an image</p>
//                 ) : (
//                   <div className="flex justify-center">
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-64 h-64 object-cover rounded-lg shadow-md border"
//                     />
//                   </div>
//                 )}
//               </div>
//           </div>

//           {/* title */}
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder=" Enter project title"
//             className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div style={{ marginBottom: "1rem" }}>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder=" Enter project Description"
//             className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </div>

//         <button
//          type="submit"
//          className="w-full bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold  py-3 rounded-lg transition duration-30"
//          >
//           Upload Project
//          </button>

//       </form>
//     </div>

//   </div>

//   );
// };

// export default UploadNewProjects;


// src/components/AdminPage/UploadNewProjects.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react"; // Lucide spinner icon

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UploadNewProjects = () => {
  // ------------------- State Management -------------------
  const [title, setTitle] = useState(""); // Holds project title
  const [description, setDescription] = useState(""); // Holds project description
  const [image, setImage] = useState(null); // Holds uploaded image file
  const [preview, setPreview] = useState(null); // Stores preview image URL
  const [loading, setLoading] = useState(false); // Controls spinner visibility

  // ------------------- Fetch All Projects -------------------
  // Used to verify project upload success and refresh project data
  const fetchProjects = async () => {
    try {
      await axios.get("http://192.168.1.192:8085/mechyam/api/projects");
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Called once when component loads
  useEffect(() => {
    fetchProjects();
  }, []);

  // ------------------- Handle Image Upload -------------------
  // Updates state and preview when user selects an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Cleans up preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ------------------- Submit Form -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!title || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    // Prepare multipart form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true); // Show spinner during upload

      // Send POST request to backend
      await axios.post("http://192.168.1.192:8085/mechyam/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Project uploaded successfully!");

      // Reset form fields and refresh project list
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      fetchProjects();
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("Upload failed!");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // ------------------- JSX UI -------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Mechyam
        </h1>
        <p className="text-blue-100">
          MECHYAM AI DESIGN SOLUTION
        </p>
      </div>

      {/* Project Upload Form */}
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

          {/* Project Title Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Project Description Field */}
          <div style={{ marginBottom: "1rem" }}>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Uploading...
              </>
            ) : (
              "Upload Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNewProjects;
