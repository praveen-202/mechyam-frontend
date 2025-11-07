import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Users, PlusCircle, Pencil, Trash2 } from "lucide-react";

const UploadNewClients = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("existing");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("adminToken");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://192.168.1.114:8080/mechyam/clients");
      setClients(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load clients. Ensure server is running.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !location) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://192.168.1.114:8080/mechyam/clients/add",
        { companyName, location },
        { headers: authHeader }
      );

      alert("Client added successfully!");
      setCompanyName("");
      setLocation("");
      fetchClients();
    } catch (err) {
      setError("Failed to add client.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(
        `http://192.168.1.114:8080/mechyam/api/clients/${id}`,
        { headers: authHeader }
      );
      fetchClients();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-white py-12 px-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-sky-400 text-transparent bg-clip-text flex justify-center items-center gap-3">
          <Users size={45} /> Client Management Panel
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Manage and maintain trusted clients effortlessly.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full bg-white shadow-lg overflow-hidden border border-blue-400">
          {["upload", "existing"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-3 font-semibold text-lg transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`}
            >
              {tab === "upload" ? "Add Client" : "View Clients"}
            </button>
          ))}
        </div>
      </div>

      {/* Add Client Form */}
      {activeTab === "upload" && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register New Client</h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                placeholder="ex: Tata Projects Ltd"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Project / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
                placeholder="ex: Mumbai Metro Site"
              />
            </div>

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

      {/* Existing Clients */}
      {activeTab === "existing" && (
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {clients.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No clients added yet.</p>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-blue-700">{client.companyName}</h3>
                <p className="text-gray-600 mt-1">{client.location}</p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() =>
                      setClients((prev) =>
                        prev.map((c) =>
                          c.id === client.id ? { ...c, isEditing: true } : c
                        )
                      )
                    }
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    <Pencil size={22} />
                  </button>

                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={22} />
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
