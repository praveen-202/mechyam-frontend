import React from "react";
import testimonials from "../../assets/testimonials.jpg";

const OurClients = () => (
  <>
    {/* Hero Section */}
    <section className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={testimonials}
          alt="Steel Structure Background"
          className="w-full"
          style={{
            height: "50vh",
            width: "100vw",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          className="absolute left-0 top-1/3 z-10 ml-8"
          style={{ maxWidth: "50vw" }}
        >
          <h1
            className="absolute left-0 top-10 text-5xl md:text-6xl font-extrabold text-white mb-2 text-left px-20 py-4 bg-gray-800 bg-opacity-50 rounded"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Our Clients
          </h1>

        </div>
      </div>
    </section>

    {/* Clients Table Section */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-8">
          Trusted by Leading Organizations
        </h2>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-yellow-500 text-white text-lg">
                <th className="py-3 px-6 border border-gray-300">Client Name</th>
                <th className="py-3 px-6 border border-gray-300">Project / Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">NJK TECHNOLOGIES</td>
                <td className="py-3 px-6 border border-gray-300">Noida International Airport</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">ENVIROTEC ENTERPRISES</td>
                <td className="py-3 px-6 border border-gray-300">Structural Analysis</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">ENVIROTEC ENTERPRISES</td>
                <td className="py-3 px-6 border border-gray-300">ISRO hopper CAD</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">NJK TECHNOLOGIES</td>
                <td className="py-3 px-6 border border-gray-300">ONGC</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">NJK TECHNOLOGIES</td>
                <td className="py-3 px-6 border border-gray-300">SCAN TO BIM</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6 border border-gray-300">PUNJ LIYOD ENGINEERING PVT. LTD.</td>
                <td className="py-3 px-6 border border-gray-300">
                  Abu Dhabi, United Arab Emirates
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </>
);

export default OurClients;
