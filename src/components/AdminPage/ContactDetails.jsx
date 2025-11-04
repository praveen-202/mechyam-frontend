import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.114:8080/mechyam/api/contact/all")
      .then((res) => setContacts(res.data.data || []))
      .catch((err) => console.error("Error fetching contact details:", err));
  }, []);

  // Helper function to make the date human-readable
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-blue-900">
        Contact Details
      </h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contact entries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md bg-white">
            <thead className="bg-blue-50 text-blue-900">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Phone</th>
                <th className="border p-3 text-left">Service Type</th>
                <th className="border p-3 text-left w-64">Message</th>
                <th className="border p-3 text-left">Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-blue-50 transition-all text-gray-800"
                >
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.phoneNumber}</td>
                  <td className="border p-2">{c.serviceType}</td>
                  {/* Scrollable message cell */}
                  <td className="border p-2 max-w-[250px]">
                    <div className="max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 p-1 rounded">
                      {c.message}
                    </div>
                  </td>
                  <td className="border p-2">{formatDate(c.submissionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
