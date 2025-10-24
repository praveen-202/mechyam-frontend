import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedJobList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">No job selected!</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">{job.jobTitle}</h1>
        <div className="grid grid-cols-2 gap-6 text-gray-700">
          <div>
            <span className="font-bold">Department:</span> {job.department}
          </div>
          <div>
            <span className="font-bold">Location:</span> {job.location}
          </div>
          <div>
            <span className="font-bold">Job Type:</span> {job.jobType}
          </div>
          <div>
            <span className="font-bold">Experience Level:</span> {job.experienceLevel}
          </div>
          <div>
            <span className="font-bold">Active:</span> {job.isActive ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-bold">Posted Date:</span>{" "}
            {new Date(job.postedDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-bold">Closing Date:</span>{" "}
            {new Date(job.closingDate).toLocaleDateString()}
          </div>
          {job.description && (
            <div className="col-span-2">
              <span className="font-bold">Description:</span> {job.description}
            </div>
          )}
          {job.responsibilities && (
            <div className="col-span-2">
              <span className="font-bold">Responsibilities:</span> {job.responsibilities}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedJobList;
