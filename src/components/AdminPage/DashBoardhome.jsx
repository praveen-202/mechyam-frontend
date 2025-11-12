import React, { useEffect, useState } from "react";
import { Briefcase, Users, Building2, PlusCircle, FileText } from "lucide-react";
import axios from "axios";
import Applications from "../../pages/Applications";

const DashboardHome = ({ setActivePage }) => {
  const [stats, setStats] = useState({
    jobs: 0,
    clients: 0,
    projects: 0,
    applications: 0,
  });

  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplications, setShowApplications] = useState(false);

  const extractCount = (data) => {
    if (Array.isArray(data)) return data.length;
    if (typeof data === "object" && data !== null) {
      for (let key in data) {
        if (Array.isArray(data[key])) return data[key].length;
      }
    }
    return 0;
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");

        const [jobsRes, clientsRes, projectsRes, applicationsRes] = await Promise.all([
          axios.get("http://192.168.1.192:8080/mechyam/api/career/jobs/all", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://192.168.1.192:8080/mechyam/clients/all", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://192.168.1.192:8080/mechyam/api/projects", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://192.168.1.192:8080/mechyam/api/career/applications", {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        const extractArray = (res) =>
          Array.isArray(res.data) ? res.data :
          Array.isArray(res.data?.data) ? res.data.data :
          [];

        const applications = extractArray(applicationsRes);

        // Assuming applications have structure { jobCode, jobTitle, applicants: [] }
        setApplicationData(applications);

        setStats({
          jobs: extractCount(extractArray(jobsRes)),
          clients: extractCount(extractArray(clientsRes)),
          projects: extractCount(extractArray(projectsRes)),
          applications: extractCount(applications),
        });

      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    { label: "Total Jobs", value: stats.jobs, icon: <Briefcase size={40} />, page: "JobList", color: "from-blue-500 to-blue-700" },
    { label: "Clients", value: stats.clients, icon: <Users size={40} />, page: "UploadNewClients", color: "from-green-500 to-green-700" },
    { label: "Projects", value: stats.projects, icon: <Building2 size={40} />, page: "UploadNewProjects", color: "from-purple-500 to-purple-700" },
    { label: "Applications", value: stats.applications, icon: <FileText size={40} />, page: "Applications", color: "from-orange-500 to-orange-700" },
  ];

  if (loading) return <p className="text-center text-lg py-10">Loading Dashboard...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen rounded-xl">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-800 tracking-wide drop-shadow-sm">Welcome, Admin</h1>
        <p className="text-gray-600 mt-2 text-lg">Here’s what’s happening at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => setActivePage(card.page)}

            className={`p-7 rounded-2xl text-white shadow-lg bg-gradient-to-r ${card.color} cursor-pointer w-full text-left transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-90">{card.label}</p>
                <p className="text-5xl font-bold mt-1">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </button>
        ))}
      </div>

      {/* Applications Table */}
      {showApplications && (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-gray-800">
            <FileText className="text-orange-600" /> Job Applications
          </h2>
          {applicationData.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="p-3 border-b">Job Code</th>
                  <th className="p-3 border-b">Job Title</th>
                  <th className="p-3 border-b">Applicants Count</th>
                </tr>
              </thead>
              <tbody>
                {applicationData.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{app.jobCode || "—"}</td>
                    <td className="p-3 border-b">{app.jobTitle || "—"}</td>
                    <td className="p-3 border-b">{app.applicants?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No applications available.</p>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mt-10">
        <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-gray-800">
          <PlusCircle className="text-blue-600" /> Quick Actions
        </h2>
        <div className="flex gap-5 flex-wrap">
          <button onClick={() => setActivePage("JobForm")} className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Add New Job
          </button>
          <button onClick={() => setActivePage("UploadNewClients")} className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
            Add New Client
          </button>
          <button onClick={() => setActivePage("UploadNewProjects")} className="px-5 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
