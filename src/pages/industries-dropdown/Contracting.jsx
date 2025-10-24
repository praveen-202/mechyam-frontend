import React from "react";

import contracting from "../../assets/contracting01.jpg";
import contracting02 from "../../assets/contracting.jpg";



const Contracting = () => (
  <>
  <section className="w-full overflow-hidden">
    <div className="relative w-screen flex items-center justify-start -mx-4">
      <img
        src={contracting}
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
          Contracting
        </h1>
      </div>
    </div>
  </section>

  {/* Two-column section: text (left) and image (right) */}
  <section className="w-full bg-white py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl font-bold mb-4 bg-gray-200 p-5 rounded">
            Contracting
          </h2>
          <p className="text-lg text-gray-800 mb-4">
           These services include turnkey projects, new construction, interior fit-outs, site improvements and renovations. On occasion, a general contractor even takes over a project that’s already underway. It includes taking up a project from conception to completion, handing it in its entirety from the ground up. These turnkey projects are increasingly popular in new construction. We deliver certain renovations on a turnkey basis.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            Our award winning visualisation, animation and virtual reality team help people to experience assets before they are built. Tools such as fly-through, 3D immersive experiences and animations allow the client, end user and the public to understand the space and make certain schemes are fit for purpose.
          </p>
          <p className="text-lg text-gray-800 mb-4">Our vision is to be recognized as one of USA,s leading sustainable and innovative construction businesses.</p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={contracting02}
            alt="Steel detailing"
            className="w-full h-auto max-h-96 object-contain rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  </section>
  {/* Heading Section */}
      <section className="w-full text-center bg-gray-50">
        <p className="text-lg text-gray-800 mb-2">
         <div>
          We have great experience in the turn key contracting and complete solutions of commercial buildings such as warehouses, show rooms, offices …etc. including all activities to deliver your project up to completion from the authorities such as follow;
          </div>
        </p>
      </section>

      {/* ✅ Updated Services Section */}
      <section className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
            <ul className="list-none m-0 p-0 mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {['CAE / CFD modelling',
'Civil works for foundations and substructure.',
'Hot rolled Steel structure supply and installation.',
'Pre-Engineered steel structure supply and installation.',
'Roof and wall cladding supply and installation.',
'Internal and finishing works.',
'External and paving.',
'Boundary walls and gate',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-3 h-3 bg-blue-900 mr-3 mt-1 flex-shrink-0"></span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
  </>
);
export default Contracting;
