import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const UploadNewClients = () => {
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Clients to refresh list after upload (if needed)
  const fetchClients = async () => {
    try {
      await axios.get("http://localhost:8080/api/clients");
      setError("");
    } catch (error) {
      console.error("❌ Error fetching clients:", error);
      setError("Failed to load clients.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Submit Client Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !location) {
      setError("Please fill all fields");
      return;
    }

    const clientData = { companyName, location };

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/clients", clientData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Client added successfully!");

      // Reset form
      setCompanyName("");
      setLocation("");
      setError("");

      // Reload clients list
      fetchClients();

    } catch (err) {
      console.error("❌ Error adding client:", err);
      setError("Upload failed. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 py-10 px-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-sky-400 text-white rounded-2xl shadow-lg p-8 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Mechyam
        </h1>
        <p className="text-blue-100">
          MECHYAM AI DESIGN SOLUTION
        </p>
      </div>

      {/* Upload Form */}
      <div className="max-w-5xl mx-auto bg-white rounded shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Add New Client
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Client Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter project / location"
              className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-400 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              "Add Client"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNewClients;
