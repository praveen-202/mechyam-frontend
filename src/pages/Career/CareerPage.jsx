// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const JobCard = ({ job, onClick }) => (
//   <div
//     onClick={() => onClick(job)}
//     className="border p-4 shadow-md hover:shadow-lg transition bg-white w-full sm:w-[300px] cursor-pointer"
//   >
//     <h3 className="text-blue-700 font-semibold mb-1 border-b border-blue-700 inline-block">
//       {job.jobTitle}
//     </h3>
//     {job.department && <p className="text-gray-500 mb-2">{job.department}</p>}
//     <p className="text-blue-600 hover:underline text-sm font-medium">
//       Click for Details →
//     </p>
//   </div>
// );

// const CareerPage = () => {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.191:8085/mechyam/api/career/jobs/all")
//       .then((response) => {
//         let allJobs = [];
//         if (response.data && response.data.data) {
//           const data = response.data.data;
//           allJobs = Array.isArray(data) ? data : Object.values(data).flat();
//         }
//         setJobs(allJobs);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching jobs:", err);
//         setError("Failed to load jobs. Please try again later.");
//         setLoading(false);
//       });
//   }, []);

//   const handleCardClick = (job) => {
//     navigate(`/career/${job.id}`, { state: job });
//   };

//   if (loading) return <p className="text-center mt-20">Loading jobs...</p>;
//   if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

//   return (
//     <main className="min-h-screen bg-white py-10 px-8">
//       <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
//         Job Openings
//       </h1>

//       <div className="max-w-6xl mx-auto flex flex-wrap gap-6">
//         {jobs.length > 0 ? (
//           jobs.map((job) => (
//             <JobCard key={job.id} job={job} onClick={handleCardClick} />
//           ))
//         ) : (
//           <p className="text-center w-full mt-20 text-gray-500">
//             No jobs available
//           </p>
//         )}
//       </div>
//     </main>
//   );
// };

// export default CareerPage;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobCard = ({ job, onClick }) => (
  <div
    onClick={() => onClick(job)}
    className="rounded-2xl border border-gray-200 p-5 shadow-md hover:shadow-xl transition-all duration-300 bg-white w-full sm:w-[300px] cursor-pointer transform hover:-translate-y-1"
  >
    <h3 className="text-blue-700 font-semibold mb-1 border-b border-blue-700 inline-block text-lg">
      {job.jobTitle}
    </h3>

    {job.department && (
      <p className="text-gray-500 mb-3 text-sm">{job.department}</p>
    )}

    <div className="flex justify-between items-center mt-2">
      <p className="text-gray-600 text-sm">
        📍 <span className="font-medium">{job.location || "Location N/A"}</span>
      </p>
      <p className="text-gray-500 text-sm">{job.jobType || "Type N/A"}</p>
    </div>

    <p className="text-blue-600 hover:underline text-sm font-medium mt-3">
      Click for Details →
    </p>
  </div>
);

const CareerPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mechyam/api/career/jobs/all")
      .then((response) => {
        let allJobs = [];
        if (response.data && response.data.data) {
          const data = response.data.data;
          allJobs = Array.isArray(data) ? data : Object.values(data).flat();
        }
        setJobs(allJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleCardClick = (job) => {
    navigate(`/career/${job.id}`, { state: job });
  };

  if (loading) return <p className="text-center mt-20">Loading jobs...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 drop-shadow-sm">
        Job Openings
      </h1>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={handleCardClick} />
          ))
        ) : (
          <p className="text-center w-full mt-20 text-gray-500 text-lg">
            No jobs available
          </p>
        )}
      </div>
    </main>
  );
};

export default CareerPage;
