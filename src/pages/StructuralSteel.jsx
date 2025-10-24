import React from "react";
import { Link } from "react-router-dom";

import steelDetailingImg from "../assets/StructuralSteelImages/structural-steel-detailing.jpeg";
import structuralsteel from "../assets/StructuralSteelImages/structuralsteel.jpg";

const SteelStructure = () => (
  <>
    {/* Hero Section */}
    <section id="steel-structure" className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={structuralsteel}
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
            className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-20 w-auto h-auto bg-gray-800 bg-opacity-50 rounded"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Structural Steel
          </h1>
        </div>
      </div>
    </section>

    {/* Two-column section: text (left) and image (right) */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-5 rounded">Structural Steel</h2>
            <p className="text-lg text-gray-800 mb-4">
              Steel Detailing services from Mechyam use the state of the art
              technical tools and solutions. Our services are tailored to our
              customers needs in an efficient and transparent manner. Majority
              of our offerings are CAD based with 3D Modeling. DGS believes in
              using right technology tools with skilled personnel to deliver
              optimum solutions to customers in a closed loop style. Our Steel
              Detailing services help our clients to simplify project
              coordination, improve delivery schedules, and increase overall
              project quality.
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Driven by a passion to build a better tomorrow, we strive to go
              above and beyond customer expectations. With emphasis on research,
              and focus on quality we offer highly innovative Steel detailing
              solutions to our valued customers. We Commit delivering quality
              solutions on time and every time. Since pioneering, the scope and
              scale of Mechyam has expanded year-on-year, generating a
              substantial repeat business element.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src={steelDetailingImg}
              alt="Steel detailing"
              className="w-full h-auto max-h-96 object-contain rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Project types and services section */}
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          We provide NC files, KISS files, ABM’s for Fabtrol / CNC machines and
          PEDDIMAT & DSTV formats as well
        </h2>
        <ul className="list-none m-0 p-0 mb-8">
          {[
            "Heavy Industrial Buildings",
            "Multistory Structures",
            "Churches",
            "Schools",
            "Power Plants",
            "Miscellaneous",
            "Complex Commercial Buildings",
            "Hospitals & Medical Buildings",
            "Shopping Centers",
            "Auditoriums",
            "Petrochemical Refineries",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start mb-2">
              <span className="w-3 h-3 bg-blue-900 mr-3 mt-1 flex-shrink-0"></span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

        {/* ✅ Updated Read More Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <span className="text-sm font-semibold text-indigo-600">01</span>
            <h3 className="text-xl font-bold mt-2">
              Structural Engineering Services
            </h3>
            <p className="text-gray-600 mt-2">
              Structural Engineering is all about providing the framework for
              structures and designing those structures to withstand the
              environment and remain safe, stable, and secure.
            </p>
            <Link
              to="/structural-engineering"
              className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <span className="text-sm font-semibold text-indigo-600">02</span>
            <h3 className="text-xl font-bold mt-2">
              Structural Steel Detailing Services
            </h3>
            <p className="text-gray-600 mt-2">
              Structural steel detailing involves creating detailed drawings
              and plans for all manufacturing and construction activities like
              erection of buildings, shipbuilding, etc.
            </p>
            <Link
              to="/structuralsteeldetailingservices"
              className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <span className="text-sm font-semibold text-indigo-600">03</span>
            <h3 className="text-xl font-bold mt-2">Bridge Detailing Services</h3>
            <p className="text-gray-600 mt-2">
              Beyond 3D PMI Definition, SOLIDWORKS MBD helps organize CAD data
              into clean and structured 3D presentations with different views
              and display settings.
            </p>
            <Link
              to="/bridge-detailing"
              className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default SteelStructure;
