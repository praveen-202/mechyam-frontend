// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const JobDetailsPage = () => {
//   const location = useLocation();
//   const job = location.state;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     linkedinUrl: "",
//     portfolioUrl: "",
//     coverLetter: "",
//     resumeFile: null,
//   });

//   const [message, setMessage] = useState("");

//   if (!job) {
//     return <div className="text-center mt-10">No job details available.</div>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, resumeFile: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!formData.fullName || !formData.email || !formData.resumeFile) {
//       setMessage("❌ Please fill all required fields (Name, Email, Resume)");
//       return;
//     }

//     // Validate file type
//     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//     if (!allowedTypes.includes(formData.resumeFile.type)) {
//       setMessage("❌ Please upload PDF or Word document only");
//       return;
//     }

//     const submitData = new FormData();
//     submitData.append("jobId", job.id.toString()); // Convert to string
//     submitData.append("fullName", formData.fullName);
//     submitData.append("email", formData.email);
//     submitData.append("phoneNumber", formData.phoneNumber || "");
//     submitData.append("linkedinUrl", formData.linkedinUrl || "");
//     submitData.append("portfolioUrl", formData.portfolioUrl || "");
//     submitData.append("coverLetter", formData.coverLetter || "");
//     submitData.append("resumeFile", formData.resumeFile);

//     try {
//       console.log("Submitting application...");

//       const response = await axios.post(
//         "http://192.168.1.191:8085/mechyam/api/career/apply",
//         submitData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data"
//           },
//           timeout: 30000 // 30 seconds timeout
//         }
//       );

//       console.log("✅ Application submitted:", response.data);
//       setMessage("✅ Application submitted successfully!");

//       // Reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         phoneNumber: "",
//         linkedinUrl: "",
//         portfolioUrl: "",
//         coverLetter: "",
//         resumeFile: null,
//       });

//       // Clear file input
//       const fileInput = document.querySelector('input[type="file"]');
//       if (fileInput) fileInput.value = "";

//     } catch (error) {
//       console.error("❌ Error submitting form:", error);

//       if (error.code === "ERR_NETWORK" || error.message.includes("CONNECTION_REFUSED")) {
//         setMessage("❌ Cannot connect to server. Please check if backend is running on port 8085.");
//       } else if (error.response) {
//         // Backend returned error
//         setMessage(`❌ ${error.response.data.message || "Application failed. Please try again."}`);
//       } else {
//         setMessage("❌ Something went wrong! Please try again.");
//       }
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Banner Section */}
//       <section className="bg-blue-700 text-white py-16 text-center shadow-md">
//         <h1 className="text-4xl font-bold mb-2">{job.title || job.jobTitle}</h1>
//         {job.department && (
//           <p className="text-lg opacity-90">Department: {job.department}</p>
//         )}
//       </section>

//       {/* Job Details + Application Form Section */}
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* LEFT SIDE — Job Description */}
//         <section className="border-r pr-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Job Description
//           </h2>
//           <p className="text-gray-700 mb-6 leading-relaxed">
//             {job.description || job.details || "We are looking for passionate and skilled professionals to join our team."}
//           </p>

//           <div className="mt-6 space-y-3">
//             <p>
//               <strong>Location:</strong> {job.location || "Not specified"}
//             </p>
//             <p>
//               <strong>Experience:</strong> {job.experienceLevel || job.experience || "Not specified"}
//             </p>
//             <p>
//               <strong>Employment Type:</strong> {job.jobType || job.type || "Full-time"}
//             </p>
//             <p>
//               <strong>Department:</strong> {job.department || "Not specified"}
//             </p>
//             {job.salaryRange && (
//               <p>
//                 <strong>Salary Range:</strong> {job.salaryRange}
//               </p>
//             )}
//           </div>

//           {job.requirements && (
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold mb-2 text-blue-700">
//                 Requirements
//               </h3>
//               <div className="text-gray-700 whitespace-pre-line">
//                 {job.requirements}
//               </div>
//             </div>
//           )}

//           {job.responsibilities && (
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold mb-2 text-blue-700">
//                 Responsibilities
//               </h3>
//               <div className="text-gray-700 whitespace-pre-line">
//                 {job.responsibilities}
//               </div>
//             </div>
//           )}
//         </section>

//         {/* RIGHT SIDE — Application Form */}
//         <section>
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//             Apply for this Position
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium mb-1" htmlFor="fullName">
//                 Full Name *
//               </label>
//               <input
//                 id="fullName"
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your full name"
//                 required
//                 aria-label="Full Name"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="email">
//                 Email *
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your email"
//                 required
//                 aria-label="Email Address"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="phoneNumber">
//                 Phone Number
//               </label>
//               <input
//                 id="phoneNumber"
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your phone number"
//                 aria-label="Phone Number"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="linkedinUrl">
//                 LinkedIn URL
//               </label>
//               <input
//                 id="linkedinUrl"
//                 type="url"
//                 name="linkedinUrl"
//                 value={formData.linkedinUrl}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your LinkedIn profile link"
//                 aria-label="LinkedIn Profile URL"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="portfolioUrl">
//                 Portfolio URL
//               </label>
//               <input
//                 id="portfolioUrl"
//                 type="url"
//                 name="portfolioUrl"
//                 value={formData.portfolioUrl}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your portfolio link"
//                 aria-label="Portfolio URL"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="coverLetter">
//                 Cover Letter
//               </label>
//               <textarea
//                 id="coverLetter"
//                 name="coverLetter"
//                 value={formData.coverLetter}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Write a short cover letter..."
//                 aria-label="Cover Letter"
//               ></textarea>
//             </div>

//             <div>
//               <label className="block font-medium mb-1" htmlFor="resumeFile">
//                 Upload Resume *
//               </label>
//               <input
//                 id="resumeFile"
//                 type="file"
//                 name="resumeFile"
//                 onChange={handleFileChange}
//                 className="w-full border px-3 py-2 rounded"
//                 accept=".pdf,.doc,.docx"
//                 required
//                 aria-label="Upload Resume File"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Accepted formats: PDF, DOC, DOCX (Max 5MB)
//               </p>
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full font-medium"
//               aria-label="Submit Job Application"
//             >
//               Submit Application
//             </button>
//           </form>

//           {message && (
//             <div className={`mt-4 p-3 rounded ${message.includes("✅")
//               ? "bg-green-100 text-green-700 border border-green-300"
//               : "bg-red-100 text-red-700 border border-red-300"
//               }`}>
//               {message}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default JobDetailsPage;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const JobDetailsPage = () => {
  const location = useLocation();
  const job = location.state;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    linkedinUrl: "",
    portfolioUrl: "",
    coverLetter: "",
    resumeFile: null,
  });

  const [message, setMessage] = useState("");

  if (!job) {
    return <div className="text-center mt-10">No job details available.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resumeFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.resumeFile) {
      setMessage("❌ Please fill all required fields (Name, Email, Resume)");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(formData.resumeFile.type)) {
      setMessage("❌ Please upload PDF or Word document only");
      return;
    }

    const submitData = new FormData();
    submitData.append("jobId", job.id.toString());
    submitData.append("fullName", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("phoneNumber", formData.phoneNumber || "");
    submitData.append("linkedinUrl", formData.linkedinUrl || "");
    submitData.append("portfolioUrl", formData.portfolioUrl || "");
    submitData.append("coverLetter", formData.coverLetter || "");
    submitData.append("resumeFile", formData.resumeFile);

    try {
      console.log("Submitting application...");

      const response = await axios.post(
        "http://localhost:8080/mechyam/api/career/apply",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      console.log("✅ Application submitted:", response.data);
      setMessage("✅ Application submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        linkedinUrl: "",
        portfolioUrl: "",
        coverLetter: "",
        resumeFile: null,
      });

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      if (error.code === "ERR_NETWORK" || error.message.includes("CONNECTION_REFUSED")) {
        setMessage("❌ Cannot connect to server. Please check if backend is running on port 8085.");
      } else if (error.response) {
        setMessage(`❌ ${error.response.data.message || "Application failed. Please try again."}`);
      } else {
        setMessage("❌ Something went wrong! Please try again.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="bg-blue-700 text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">{job.title || job.jobTitle}</h1>
        {job.department && <p className="text-lg opacity-90">Department: {job.department}</p>}
      </section>

      {/* Job Details + Application Form Section */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SIDE — Job Description */}
        <section className="border-r pr-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {job.description || job.details || "We are looking for passionate and skilled professionals to join our team."}
          </p>

          <div className="mt-6 space-y-3">
            <p><strong>Location:</strong> {job.location || "Not specified"}</p>
            <p><strong>Experience:</strong> {job.experienceLevel || job.experience || "Not specified"}</p>
            <p><strong>Employment Type:</strong> {job.jobType || job.type || "Full-time"}</p>
            <p><strong>Department:</strong> {job.department || "Not specified"}</p>
            {job.salaryRange && <p><strong>Salary Range:</strong> {job.salaryRange}</p>}
          </div>

          {job.requirements && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Requirements</h3>
              <div className="text-gray-700 whitespace-pre-line">{job.requirements}</div>
            </div>
          )}

          {job.responsibilities && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Responsibilities</h3>
              <div className="text-gray-700 whitespace-pre-line">{job.responsibilities}</div>
            </div>
          )}
        </section>

        {/* RIGHT SIDE — Application Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Apply for this Position</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your full name"
                required
                aria-label="Full Name"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your email"
                required
                aria-label="Email Address"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your phone number"
                aria-label="Phone Number"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="linkedinUrl">LinkedIn URL</label>
              <input
                id="linkedinUrl"
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your LinkedIn profile link"
                aria-label="LinkedIn Profile URL"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="portfolioUrl">Portfolio URL</label>
              <input
                id="portfolioUrl"
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter your portfolio link"
                aria-label="Portfolio URL"
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full border px-3 py-2 rounded"
                placeholder="Write a short cover letter..."
                aria-label="Cover Letter"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="resumeFile">Upload Resume *</label>
              <input
                id="resumeFile"
                type="file"
                name="resumeFile"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
                accept=".pdf,.doc,.docx"
                required
                aria-label="Upload Resume File"
              />
              <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 active:scale-95 active:bg-blue-800 transition-transform duration-150 w-full font-medium"
              aria-label="Submit Job Application"
            >
              Submit Application
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}>
              {message}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default JobDetailsPage;
