import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText, User, ArrowLeft } from "lucide-react";

const Applications = ({ setActivePage }) => {
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");

        console.log("Fetching applications..."); // 🟢 Debug log

        const response = await axios.get(
          "http://192.168.1.192:8080/mechyam/api/career/applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Applications API Response:", response.data); // 🟢 Log full response

        // Handle any data format: {data:[...]} or just [...]
        const data =
          Array.isArray(response.data) && response.data.length
            ? response.data
            : Array.isArray(response.data?.data)
            ? response.data.data
            : [];

        console.log("Extracted Applications Data:", data); // 🟢 Check extracted data
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please check your backend API.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ✅ Loader
  if (loading)
    return (
      <div className="text-center text-lg py-10 font-medium text-gray-700">
        Loading Job Applications...
      </div>
    );

  // ✅ Error
  if (error)
    return (
      <div className="text-center text-red-600 py-10 font-semibold">
        {error}
      </div>
    );

  // ✅ No Data
  if (!applications || applications.length === 0)
    return (
      <div className="text-center text-gray-500 py-20">
        No job applications found. <br /> (Check API or try adding some)
      </div>
    );

  // ✅ Page UI
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen rounded-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
          <FileText size={30} /> Job Applications
        </h1>
        <button
          onClick={() => setActivePage("DashboardHome")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>

      {selectedJob ? (
        // ✅ Applicant view
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <button
            onClick={() => setSelectedJob(null)}
            className="mb-5 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to All Jobs
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {selectedJob.jobTitle || "Untitled Job"}{" "}
            <span className="text-gray-500 text-lg">
              ({selectedJob.jobCode || "N/A"})
            </span>
          </h2>

          {selectedJob.applicants?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {selectedJob.applicants.map((applicant, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-gradient-to-r from-blue-50 to-white border shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <User className="text-blue-600" />
                    <p className="font-semibold text-gray-800">
                      {applicant.name || "Unknown Applicant"}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    <strong>Email:</strong> {applicant.email || "N/A"}
                  </p>
                  {applicant.phone && (
                    <p className="text-gray-600 text-sm">
                      <strong>Phone:</strong> {applicant.phone}
                    </p>
                  )}
                  {applicant.resume && (
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline mt-2 inline-block"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No applicants found for this job.
            </p>
          )}
        </div>
      ) : (
        // ✅ Job List view
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((job, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedJob(job)}
              className="p-6 bg-white rounded-2xl border border-gray-200 shadow hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Job Code</p>
                  <p className="text-lg font-semibold">
                    {job.jobCode || "—"}
                  </p>
                </div>
                <FileText className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.jobTitle || "Untitled Job"}
              </h3>
              <p className="text-gray-600">
                Applicants:{" "}
                <span className="font-bold text-blue-700">
                  {job.applicants?.length || 0}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
