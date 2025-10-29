
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/mechyam/api/career/jobs/all"
//         );

//         const jobsArray =
//           response.data && response.data.data
//             ? Object.values(response.data.data).flat()
//             : [];

//         setJobs(jobsArray);
//       } catch (error) {
//         console.error("❌ Error fetching jobs:", error);
//         setJobs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleJobClick = (job) => {
//     navigate(`/jobs/${job.id}`, { state: { job } }); // pass job data to next page
//   };

//   if (loading) {
//     return <p className="text-gray-500 text-center mt-4">Loading jobs...</p>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md h-[85vh] overflow-y-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-900">Uploaded Jobs</h2>
//       {jobs.length === 0 ? (
//         <p className="text-gray-500">No jobs uploaded yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {jobs.map((job) => (
//             <li
//               key={job.id}
//               className="border p-4 rounded-lg hover:bg-gray-50 transition flex flex-wrap gap-4 cursor-pointer"
//               onClick={() => handleJobClick(job)}
//             >
//               <div className="flex-1 min-w-[150px]">
//                 <span className="font-bold">Job Title:</span> {job.jobTitle}
//               </div>
//               <div className="flex-1 min-w-[120px]">
//                 <span className="font-bold">Department:</span> {job.department}
//               </div>
//               <div className="flex-1 min-w-[120px]">
//                 <span className="font-bold">Location:</span> {job.location}
//               </div>
//               <div className="flex-1 min-w-[100px]">
//                 <span className="font-bold">Type:</span> {job.jobType}
//               </div>
//               <div className="flex-1 min-w-[120px]">
//                 <span className="font-bold">Experience:</span> {job.experienceLevel}
//               </div>
//               <div className="flex-1 min-w-[60px]">
//                 <span className="font-bold">Active:</span> {job.isActive ? "Yes" : "No"}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default JobList;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null); // track which job is being deleted
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/mechyam/api/career/jobs/all"
//         );

//         const jobsArray =
//           response.data && response.data.data
//             ? Object.values(response.data.data).flat()
//             : [];

//         setJobs(jobsArray);
//       } catch (error) {
//         console.error("❌ Error fetching jobs:", error);
//         setJobs([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleJobClick = (job) => {
//     navigate(`/jobs/${job.id}`, { state: { job } });
//   };

//   // 🗑️ DELETE Job API Call
//   const handleDelete = async (jobId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this job?");
//     if (!confirmDelete) return;

//     setDeletingId(jobId); // show loader on the delete button

//     try {
//       // Dummy API URL – replace later with your actual one
//       await axios.delete(`http://localhost:8080/mechyam/api/career/jobs/delete/${jobId}`);

//       // Remove deleted job from UI
//       setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
//       alert("✅ Job deleted successfully!");
//     } catch (error) {
//       console.error("❌ Error deleting job:", error);
//       alert("Failed to delete the job. Please try again.");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return <p className="text-gray-500 text-center mt-4">Loading jobs...</p>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md h-[85vh] overflow-y-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-900">Uploaded Jobs</h2>
//       {jobs.length === 0 ? (
//         <p className="text-gray-500">No jobs uploaded yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {jobs.map((job) => (
//             <li
//               key={job.id}
//               className="border p-4 rounded-lg hover:bg-gray-50 transition flex flex-wrap items-center justify-between cursor-pointer"
//             >
//               {/* Job Info Section */}
//               <div
//                 className="flex flex-wrap gap-4 flex-1"
//                 onClick={() => handleJobClick(job)}
//               >
//                 <div className="flex-1 min-w-[150px]">
//                   <span className="font-bold">Job Title:</span> {job.jobTitle}
//                 </div>
//                 <div className="flex-1 min-w-[120px]">
//                   <span className="font-bold">Department:</span> {job.department}
//                 </div>
//                 <div className="flex-1 min-w-[120px]">
//                   <span className="font-bold">Location:</span> {job.location}
//                 </div>
//                 <div className="flex-1 min-w-[100px]">
//                   <span className="font-bold">Type:</span> {job.jobType}
//                 </div>
//                 <div className="flex-1 min-w-[120px]">
//                   <span className="font-bold">Experience:</span> {job.experienceLevel}
//                 </div>
//                 <div className="flex-1 min-w-[60px]">
//                   <span className="font-bold">Active:</span> {job.isActive ? "Yes" : "No"}
//                 </div>
//               </div>

//               {/* 🗑️ Delete Button Section */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // prevent navigating when clicking delete
//                   handleDelete(job.id);
//                 }}
//                 disabled={deletingId === job.id}
//                 className={`ml-4 px-3 py-2 rounded-lg text-white ${
//                   deletingId === job.id
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 {deletingId === job.id ? "Deleting..." : "Delete"}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default JobList;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.192:8080/mechyam/api/career/jobs/all"
        );

        const jobsArray =
          response.data && Array.isArray(response.data.data)
            ? response.data.data
            : [];

        setJobs(jobsArray);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    setDeletingId(jobId);

    try {
      // Dummy API link — replace with your actual DELETE endpoint
      await axios.delete(`http://localhost:8080/mechyam/api/career/jobs/${jobId}`);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      alert("✅ Job deleted successfully!");
    } catch (error) {
      console.error("❌ Error deleting job:", error);
      alert("Failed to delete the job. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-4">Loading jobs...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-[85vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Uploaded Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-4 rounded-lg hover:bg-gray-50 transition flex flex-wrap items-center justify-between cursor-pointer"
            >
              {/* Job Info Section */}
              <div
                className="flex flex-wrap gap-4 flex-1"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex-1 min-w-[80px]">
                  <span className="font-bold">ID:</span> {job.id}
                </div>
                <div className="flex-1 min-w-[150px]">
                  <span className="font-bold">Job Title:</span> {job.jobTitle}
                </div>
                <div className="flex-1 min-w-[120px]">
                  <span className="font-bold">Department:</span> {job.department}
                </div>
                <div className="flex-1 min-w-[120px]">
                  <span className="font-bold">Location:</span> {job.location}
                </div>
                <div className="flex-1 min-w-[100px]">
                  <span className="font-bold">Type:</span> {job.jobType}
                </div>
                <div className="flex-1 min-w-[120px]">
                  <span className="font-bold">Experience:</span> {job.experienceLevel}
                </div>
                <div className="flex-1 min-w-[60px]">
                  <span className="font-bold">Active:</span> {job.isActive ? "Yes" : "No"}
                </div>
              </div>

              {/* 🗑️ Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(job.id);
                }}
                disabled={deletingId === job.id}
                className={`ml-4 px-3 py-2 rounded-lg text-white ${
                  deletingId === job.id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deletingId === job.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
