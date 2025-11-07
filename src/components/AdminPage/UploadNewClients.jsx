import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Users, PlusCircle, Trash2, LayoutGrid, Upload } from "lucide-react";

const UploadNewClients = () => {
  // --------------------------- STATE VARIABLES ---------------------------
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("existing"); // current view: "upload" or "existing"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------- AUTH & BASE URL ---------------------------
  const token = sessionStorage.getItem("adminToken");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  const BASE_URL = "http://192.168.1.192:8080/mechyam/clients"; // consistent API base URL

  // --------------------------- FETCH CLIENT LIST ---------------------------
  const fetchClients = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all`);
      setClients(res.data);
      setError("");
    } catch {
      setError("Failed to load clients. Ensure server is running.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // --------------------------- ADD NEW CLIENT ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !companyLocation) {
      setError("Please fill all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${BASE_URL}/add`,
        { companyName, companyLocation },
        { headers: authHeader }
      );

      alert("Client added successfully!");
      setCompanyName("");
      setCompanyLocation("");
      fetchClients();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add client. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------- DELETE CLIENT ---------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await axios.delete(`${BASE_URL}/delete/${id}`, { headers: authHeader });
      fetchClients();
    } catch {
      alert("Delete failed. Try again.");
    }
  };

  // --------------------------- COMPONENT JSX ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white py-12 px-4 sm:px-6">

      {/* ========================= HEADER ========================= */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-400 text-transparent bg-clip-text flex justify-center items-center gap-3 py-4">
          <Users size={42} /> Client Management Panel
        </h1>

        <p className="text-gray-600 mt-2 text-lg leading-relaxed">
          Manage and maintain trusted clients effortlessly.
        </p>

      </div>

      {/* ========================= TAB SWITCH (RESPONSIVE) ========================= */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="grid grid-cols-2 border border-blue-400 rounded-xl overflow-hidden shadow-md">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center justify-center gap-2 py-3 font-semibold text-base sm:text-lg transition
              ${activeTab === "upload"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"}`}
          >
            <Upload size={20} />
            Add Client
          </button>

          <button
            onClick={() => setActiveTab("existing")}
            className={`flex items-center justify-center gap-2 py-3 font-semibold text-base sm:text-lg transition
              ${activeTab === "existing"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"}`}
          >
            <LayoutGrid size={20} />
            View Clients
          </button>
        </div>
      </div>

      {/* ========================= ADD CLIENT FORM ========================= */}
      {activeTab === "upload" && (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
            Register New Client
          </h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                placeholder="Ex: Tata Projects Ltd"
              />
            </div>

            {/* Project / Location Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Project / Location</label>
              <input
                type="text"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                placeholder="Ex: Mumbai Metro Site"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
            >
              {loading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
              {loading ? "Saving..." : "Add Client"}
            </button>
          </form>
        </div>
      )}

      {/* ========================= EXISTING CLIENT LIST ========================= */}
      {activeTab === "existing" && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full py-10">
              No clients added yet.
            </p>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Client Info */}
                <h3 className="text-xl font-semibold text-blue-700">
                  {client.companyName}
                </h3>
                <p className="text-gray-600 mt-1">{client.companyLocation}</p>

                {/* Delete Button */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={20} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UploadNewClients;
