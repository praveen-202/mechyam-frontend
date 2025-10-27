// src/components/AdminPage/AppliedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [searchJobId, setSearchJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 🔹 Load all applications when the component mounts
  useEffect(() => {
    fetchAllApplications();
  }, []);

  // 🔹 Fetch all applications
  const fetchAllApplications = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/mechyam/api/career/applications")
      .then((res) => {
        setApplications(res.data.data || []);
        setErrorMsg("");
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
        setErrorMsg("Failed to load applications.");
      })
      .finally(() => setLoading(false));
  };

  // 🔹 Search applications by Job ID
  const handleSearch = () => {
    if (!searchJobId.trim()) {
      fetchAllApplications();
      return;
    }

    setLoading(true);
    axios
      .get(
        `http://localhost:8080/mechyam/api/career/applications/job/${searchJobId}`
      )
      .then((res) => {
        setApplications(res.data.data || []);
        setErrorMsg("");
      })
      .catch((err) => {
        console.error("Error fetching applications by Job ID:", err);
        setApplications([]);
        setErrorMsg("No applications found for this Job ID.");
      })
      .finally(() => setLoading(false));
  };

  // 🔹 Reset search and show all applications again
  const handleReset = () => {
    setSearchJobId(""); // Clear the search box
    setErrorMsg(""); // Clear error messages
    fetchAllApplications(); // Reload all data
  };

  // 🔹 Resume Download
  const handleDownload = (id) => {
    const fileUrl = `http://localhost:8080/mechyam/api/career/applications/${id}/resume`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div>
      {/* 🔹 Header Section with Title and Search aligned horizontally */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Applied Job Candidates
        </h2>

        {/* 🔍 Search Bar Section */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={searchJobId}
            onChange={(e) => setSearchJobId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter Job ID (e.g., 21)"
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 🔹 Loading / Error / Empty states */}
      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : errorMsg ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-gray-500 text-2xl font-semibold text-center">
            {errorMsg}
          </p>
        </div>
      ) : applications.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-gray-500 text-2xl font-semibold text-center">
            No candidates have applied yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md bg-white"
            >
              {/* ✅ Job Details Section */}
              <div className="mb-3 border-b pb-2">
                <p className="text-lg font-semibold text-blue-700">
                  Job Code:{" "}
                  <span className="text-gray-800">{app.job?.id}</span>
                </p>
                <p>
                  <strong>Job Title:</strong> {app.job?.jobTitle}
                </p>
                <p>
                  <strong>Department:</strong> {app.job?.department}
                </p>
              </div>

              {/* ✅ Candidate Details */}
              <p>
                <strong>Name:</strong> {app.fullName}
              </p>
              <p>
                <strong>Email:</strong> {app.email}
              </p>
              <p>
                <strong>Phone:</strong> {app.phoneNumber}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={app.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {app.linkedinUrl}
                </a>
              </p>
              <p>
                <strong>Portfolio:</strong>{" "}
                <a
                  href={app.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {app.portfolioUrl}
                </a>
              </p>
              <p>
                <strong>Cover Letter:</strong> {app.coverLetter}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>
              <p>
                <strong>Applied On:</strong>{" "}
                {new Date(app.applicationDate).toLocaleString()}
              </p>

              <button
                onClick={() => handleDownload(app.id)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Download Resume
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
