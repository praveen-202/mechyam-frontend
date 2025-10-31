// src/components/AdminPage/AppliedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, RotateCcw, Download, ChevronDown, ChevronUp } from "lucide-react"; // Icons from Lucide React

const AppliedJobs = () => {
  // Stores all fetched job applications
  const [applications, setApplications] = useState([]);

  // Manages search input for filtering by Job ID
  const [searchJobId, setSearchJobId] = useState("");

  // Loading and error management states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Tracks which applications' cover letters are expanded
  const [expandedIds, setExpandedIds] = useState([]);

  /**
   * Load all applications when the component first mounts.
   */
  useEffect(() => {
    fetchAllApplications();
  }, []);

  /**
   * Fetch all job applications from the backend API.
   */
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

  /**
   * Search job applications by Job ID.
   * If search field is empty, fetch all applications again.
   */
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

  /**
   * Reset search filter and show all applications again.
   */
  const handleReset = () => {
    setSearchJobId("");
    setErrorMsg("");
    fetchAllApplications();
  };

  /**
   * Resume Download or Preview Function.
   * Opens resume in a new browser tab (for viewing/downloading).
   */
  const handleDownload = (id) => {
    const fileUrl = `http://localhost:8080/mechyam/api/career/applications/${id}/resume`;
    window.open(fileUrl, "_blank");
  };

  /**
   * Expand or collapse the candidate's cover letter.
   */
  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /**
   * Truncate long text with ellipsis (...).
   */
  const truncateText = (text, limit = 200) => {
    if (!text) return "";
    return text.length <= limit ? text : text.substring(0, limit) + "...";
  };

  return (
    <div>
      {/* ================================
           Header Section: Title + Search Bar
         ================================ */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Applied Job Candidates
        </h2>

        {/* Search Bar Section */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={searchJobId}
            onChange={(e) => setSearchJobId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Enter Job ID (e.g., 21)"
            className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
          >
            <Search size={18} /> Search
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>

      {/* ================================
           Loading / Error / Empty States
         ================================ */}
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
        /* ================================
             Application List Rendering
           ================================ */
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const isExpanded = expandedIds.includes(app.id);
            const coverLetterText = isExpanded
              ? app.coverLetter
              : truncateText(app.coverLetter || "");

            return (
              <div
                key={app.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md bg-white"
              >
                {/* --------------------------------
                     Job Information
                   -------------------------------- */}
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

                {/* --------------------------------
                     Candidate Information
                   -------------------------------- */}
                <p>
                  <strong>Name:</strong> {app.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {app.email}
                </p>
                <p>
                  <strong>Phone:</strong> {app.phoneNumber}
                </p>

                {/* LinkedIn Profile */}
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

                {/* Portfolio URL */}
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

                {/* --------------------------------
                     Cover Letter (Expandable Section)
                   -------------------------------- */}
                <div className="mt-3">
                  <strong>Cover Letter:</strong>
                  <pre className="whitespace-pre-wrap text-gray-800 mt-1 bg-gray-50 p-2 rounded">
                    {coverLetterText}
                  </pre>

                  {/* Toggle button for long cover letters */}
                  {app.coverLetter?.length > 200 && (
                    <button
                      onClick={() => toggleExpand(app.id)}
                      className="flex items-center text-blue-600 hover:underline mt-1"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={16} /> Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} /> Show More
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* --------------------------------
                     Application Metadata
                   -------------------------------- */}
                <p>
                  <strong>Applied On:</strong>{" "}
                  {new Date(app.applicationDate).toLocaleString()}
                </p>

                {/* Resume Download Button */}
                <button
                  onClick={() => handleDownload(app.id)}
                  className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  <Download size={18} /> Download Resume
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
