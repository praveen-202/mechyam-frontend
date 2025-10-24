// 

// src/components/AdminPage/AppliedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mechyam/api/career/applications")
      .then((res) => setApplications(res.data.data || []))
      .catch((err) => console.error("Error fetching applied jobs:", err));
  }, []);

  const handleDownload = (id) => {
    // Open the resume download API in a new tab
    const fileUrl = `http://localhost:8080/mechyam/api/career/applications/${id}/resume`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-900">Applied Job Candidates</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500">No candidates have applied yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md">
              <p><strong>Name:</strong> {app.fullName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phoneNumber}</p>
              <p><strong>LinkedIn:</strong> <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.linkedinUrl}</a></p>
              <p><strong>Portfolio:</strong> <a href={app.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.portfolioUrl}</a></p>
              <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Applied On:</strong> {new Date(app.applicationDate).toLocaleString()}</p>
              <button
                onClick={() => handleDownload(app.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
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
