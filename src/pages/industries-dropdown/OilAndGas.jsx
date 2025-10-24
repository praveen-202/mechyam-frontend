import React from "react";


import oilandgas03 from "../../assets/oilandgas03.jpg";
import oilandgas02 from "../../assets/oilandgas02.jpg";
import prebid from "../../assets/prebid.jpg";
import detail from "../../assets/detail.jpg";
import projectmanagement from "../../assets/projectmanagement.jpg";


const OilAndGas = () => (
  <>
    {/* Hero Section */}
    <section className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={oilandgas03}
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
            className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-20 w-auto h-auto bg-gray-800 bg-opacity-50 rounded"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Oil & Gas
          </h1>
        </div>
      </div>
    </section>

    {/* Intro Section */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-5 rounded">
              Oil & Gas
            </h2>
            <p className="text-lg text-gray-800 mb-4">
              Mechyam provides a wide range of engineering services to oil and gas companies globally. We empower oil & gas conglomerates with their upstream, downstream, and mid-stream OEMs operating both onshore as well as offshore to achieve objectives of maximizing revenues and ensuring sustainability through a range of engineering services.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              The oil and gas industry face challenges with steadily depleting resources and risky exploration processes. Downstream refineries are under constant pressure to increase output at lower costs, and mid-stream companies are grappling with the geographical spread of their assets.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              People who work in these demanding and sometimes inhospitable conditions need to be equipped with safer processes to reduce operational risks. Added to this is the need to constantly assess the environmental impact of the company’s operations.
            </p>
            <p className="text-lg text-gray-800 mb-2">
              We have great experience in the turnkey contracting and complete solutions of commercial buildings such as warehouses, showrooms, offices, etc., including all activities to deliver your project up to completion from the authorities such as follow:
            </p>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src={oilandgas02}
              alt="Steel detailing"
              className="w-full h-auto max-h-96 object-contain rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Solutions Include Section */}
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
          Solutions Include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-gray-100 shadow-md rounded-md overflow-hidden">
            <img
              src={prebid}
              alt="Pre-bid Engineering Services"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Pre-bid Engineering Services
              </h3>
              <p className="text-gray-700 text-sm">
                Comprehensive estimation, proposal support, and feasibility
                studies for oil & gas projects.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-gray-100 shadow-md rounded-md overflow-hidden">
            <img
              src={detail}
              alt="Detailed Engineering"
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold text-blue-800 mb-3 text-center">
                Detailed Engineering
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Structural and Civil Engineering</li>
                <li>Plant Design Engineering</li>
                <li>EPC Management</li>
                <li>Exploration Equipment Design</li>
                <li>Drilling Systems, Rigs and Pumps</li>
                <li>Process and Utility Systems</li>
                <li>Mud Systems and Pumps</li>
                <li>Fire, hazardous materials & safety systems</li>
              </ul>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-gray-100 shadow-md rounded-md overflow-hidden">
            <img
              src={projectmanagement}
              alt="Project Management"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Project Management
              </h3>
              <p className="text-gray-700 text-sm">
                Effective coordination, scheduling, cost control, and project
                delivery management for all engineering phases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    
  </>
);

export default OilAndGas;
