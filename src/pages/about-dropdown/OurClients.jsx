import React, { useEffect, useState } from "react";
import OurClientsImg from "../../assets/OurClients-Image/ourclients2.jpg";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OurClients = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/clients/all`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clients");
        return res.json();
      })
      .then((data) => {
        setClients(data);
        setError("");
      })
      .catch((err) => {
        console.error("Failed to load clients:", err);
        setError("Unable to load clients. Please try again later.");
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative w-full h-[50vh] overflow-hidden m-0 p-0">
  <img
    src={OurClientsImg}
    alt="Our Clients"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* Centered Box with Arrow */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative bg-white/90 px-12 py-5 rounded-lg shadow-xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-wide">
        Our Clients
      </h1>

      {/* Arrow Pointer */}
      <div
        className="absolute right-[-35px] top-1/2 -translate-y-1/2 w-0 h-0"
        style={{
          borderTop: "30px solid transparent",
          borderBottom: "30px solid transparent",
          borderLeft: "35px solid rgba(255,255,255,0.9)",
        }}
      ></div>
    </div>
  </div>
</section>


      {/* Clients Table Section */}
      <section className="w-full bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Trusted by Leading Organizations
          </h2>

          {/* Scrollable Table Box */}
          <div className="max-w-4xl mx-auto shadow-xl rounded-lg border border-gray-300 overflow-hidden">
            
            {/* Scroll Container */}
            <div className="max-h-80 overflow-y-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="bg-yellow-500 text-white text-lg sticky top-0 z-10">
                    <th className="py-3 px-6 border border-gray-300 font-semibold">Client Name</th>
                    <th className="py-3 px-6 border border-gray-300 font-semibold">Location / Project</th>
                  </tr>
                </thead>

                <tbody>
                  {error ? (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-red-600 border border-gray-300">
                        {error}
                      </td>
                    </tr>
                  ) : clients.length > 0 ? (
                    clients.map((client, index) => (
                      <tr
                        key={client.id}
                        className={`transition ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50`}
                      >
                        <td className="py-3 px-6 border border-gray-300 font-medium text-gray-800">
                          {client.companyName}
                        </td>
                        <td className="py-3 px-6 border border-gray-300 text-gray-700">
                          {client.companyLocation}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-gray-500 border border-gray-300">
                        No clients added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 py-14">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-wide mb-4"
            style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.1)" }}
          >
            OUR CLIENTS ARE OUR PARTNERS AND OUR PRIORITY
          </h2>
          <div className="mx-auto w-24 h-1 bg-blue-600 rounded-full mb-5"></div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            We build lasting relationships based on trust, innovation, and shared success —
            delivering solutions that empower our clients across industries.
          </p>
        </div>
      </section>
    </>
  );
};

export default OurClients;
