import React from "react";
import { Link } from "react-router-dom";
import industries01 from "../assets/industries01.jpg";

const Industries = () => (
  <>
    <section id="steel-structure" className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={industries01}
          alt="Industries Background"
          className="w-full"
          style={{ height: "50vh", objectFit: "cover" }}
        />
        <div className="absolute left-0 top-1/3 z-10 ml-8">
          <h1
            className="text-6xl lg:text-l font-extrabold text-white mb-2 px-20 w-auto h-auto bg-gray-800 rounded bg-opacity-50"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Industries
          </h1>
        </div>
      </div>
    </section>

    {/* Offerings Section */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">
          Our offerings for the industrial sector include:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* 01 Contracting */}
          <div>
            <h1 className="text-6xl font-extrabold text-black">01</h1>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Contracting</h2>
            <p className="text-gray-700 mb-4 text-justify">
              Our clients are building professionals of all kinds that perform
              private and public work across infrastructure, industrial, and
              commercial sectors.
            </p>
            <Link to="/contracting" className="text-blue-700 font-semibold hover:underline">
              Read More
            </Link>
          </div>

          {/* 02 Transportation / Rail Industry */}
          <div>
            <h1 className="text-6xl font-extrabold text-black">02</h1>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Transportation / Rail Industry</h2>
            <p className="text-gray-700 mb-4 text-justify">
              We at Mechyam cater to the Rail industry by providing a range of
              transportation engineering and design services that ensure
              efficiency, safety, and sustainability.
            </p>
            <Link to="/transportation" className="text-blue-700 font-semibold hover:underline">
              Read More
            </Link>
          </div>

          {/* 03 Oil & Gas */}
          <div>
            <h1 className="text-6xl font-extrabold text-black">03</h1>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Oil & Gas</h2>
            <p className="text-gray-700 mb-4 text-justify">
              Mechyam provides end-to-end engineering services for oil and gas
              companies globally, focusing on safety, performance, and cost optimization.
            </p>
            <Link to="/oil-gas" className="text-blue-700 font-semibold hover:underline">
              Read More
            </Link>
          </div>

          {/* 04 Aerospace and Transportation */}
          <div>
            <h1 className="text-6xl font-extrabold text-black">04</h1>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Aerospace & Transportation</h2>
            <p className="text-gray-700 mb-4 text-justify">
              Offering design and analysis services for aerospace and transport
              systems, Mechyam supports clients with innovation, reliability, and
              precision engineering solutions.
            </p>
            <Link to="/aerospace-transportation" className="text-blue-700 font-semibold hover:underline">
              Read More
            </Link>
          </div>

          {/* 05 Wind Energy and Renewables */}
          <div>
            <h1 className="text-6xl font-extrabold text-black">05</h1>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Wind Energy & Renewables</h2>
            <p className="text-gray-700 mb-4 text-justify">
              We help organizations transition to renewable energy sources
              efficiently—aligning with sustainability goals and reducing carbon footprints.
            </p>
            <Link to="/windenergyrenewables" className="text-blue-700 font-semibold hover:underline">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Industries;
