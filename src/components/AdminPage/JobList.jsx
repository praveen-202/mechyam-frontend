
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mechyam/api/career/jobs/all"
        );

        const jobsArray =
          response.data && response.data.data
            ? Object.values(response.data.data).flat()
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
    navigate(`/jobs/${job.id}`, { state: { job } }); // pass job data to next page
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
              className="border p-4 rounded-lg hover:bg-gray-50 transition flex flex-wrap gap-4 cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
