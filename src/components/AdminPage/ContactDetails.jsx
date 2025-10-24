// // src/components/AdminPage/ContactDetails.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ContactDetails = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.191:8085/mechyam/api/contact/all")
//       .then((res) => setContacts(res.data.data || []))
//       .catch((err) => console.error("Error fetching contact details:", err));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4 text-blue-900">Contact Details</h2>
//       {contacts.length === 0 ? (
//         <p className="text-gray-500">No contact entries found.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Phone</th>
//               <th className="border p-2">Message</th>
//               <th className="border p-2">Submitted On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((c, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="border p-2">{c.name}</td>
//                 <td className="border p-2">{c.email}</td>
//                 <td className="border p-2">{c.phone}</td>
//                 <td className="border p-2">{c.message}</td>
//                 <td className="border p-2">
//                   {new Date(c.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ContactDetails;

//==============
// src/components/AdminPage/ContactDetails.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ContactDetails = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://192.168.1.191:8085/mechyam/api/contact/all")
//       .then((res) => setContacts(res.data.data || []))
//       .catch((err) => console.error("Error fetching contact details:", err));
//   }, []);

//   // Helper to format date into human-readable form
//   const formatDate = (isoString) => {
//     if (!isoString) return "-";
//     const date = new Date(isoString);
//     return date.toLocaleString("en-IN", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-900">
//         Contact Details
//       </h2>

//       {contacts.length === 0 ? (
//         <p className="text-gray-500">No contact entries found.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
//           <thead className="bg-blue-50 text-blue-900">
//             <tr>
//               <th className="border p-3 text-left">Name</th>
//               <th className="border p-3 text-left">Email</th>
//               <th className="border p-3 text-left">Phone</th>
//               <th className="border p-3 text-left">Service Type</th>
//               <th className="border p-3 text-left">Message</th>
//               <th className="border p-3 text-left">Captcha</th>
//               <th className="border p-3 text-left">Status</th>
//               <th className="border p-3 text-left">Submitted On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((c) => (
//               <tr
//                 key={c.id}
//                 className="hover:bg-blue-50 transition-all text-gray-800"
//               >
//                 <td className="border p-2">{c.name}</td>
//                 <td className="border p-2">{c.email}</td>
//                 <td className="border p-2">{c.phoneNumber}</td>
//                 <td className="border p-2">{c.serviceType}</td>
//                 <td className="border p-2 max-w-[250px] truncate">{c.message}</td>
//                 <td className="border p-2 text-center">{c.captchaAnswer}</td>
//                 <td className="border p-2">{c.status}</td>
//                 <td className="border p-2">{formatDate(c.submissionDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ContactDetails;


// ============

import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mechyam/api/contact/all")
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
