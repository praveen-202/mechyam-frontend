import React from "react";
import brige from "../../assets/bridge.jpg"; 
import rail from "../../assets/rail.jpg";
import rail01 from "../../assets/rail01.jpg";



const Transportation = () => (
  <>
  <section className="w-full overflow-hidden">
    <div className="relative w-screen flex items-center justify-start -mx-4">
      <img
        src={rail}
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
          className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-20  w-auto h-auto bg-gray-800 bg-opacity-50 rounded"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
        >
          Transportation/Rail Industry
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
            Transportation/Rail Industry
          </h2>
          <p className="text-lg text-gray-800 mb-4">
           We at Mechyam cater to the Rail industry providing them with a range of transportation engineering services and solutions.
          </p>
          <p className="text-lg text-gray-800 mb-4">
            The Transportation industry is constantly faced with the challenge bringing new rails to the market. They need solutions to help manage the lifecycle of trains. They require cost effective, quality solutions to meet with market demands.
          </p>
          <p className="text-lg text-gray-800 mb-4">DGS is a partner of choice to the rail industry, offering all them all Rail Engineering Services and Solutions.</p>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={rail01}
            alt="Steel detailing"
            className="w-full h-auto max-h-96 object-contain rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  </section>
  {/* Heading Section */}
      <section className="w-full text-left px-40 bg-gray-50">
        <p className="text-lg  font-bold text-blue-900 mb-2">
         <div>
          Engineering Services Offered:
          </div>
        </p>
      </section>

      {/* ✅ Updated Services Section */}
      <section className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
            <ul className="list-none m-0 p-0 mb-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[

'Engineering Design & Modelling',
'Mounting/Installation Drawings',
'PDM Configuration/Data Management, BOM, EBOM',
'MIGRATION between ACAD, Microstation, ProE, CATIA V4 / V5',
'Finite Element Analysis (FEA)',
'Technical Publications – CBT, WBTS, KPIs, Parts Catalogs, Technical Documentation, 3D walkthroughs',
'Electronic H/w and S/w – S/w development, test support, SCADA GUI development, PCB Designs, H/w Product developments, Obsolescence management',
'TCMS',
'IT Services & Process Consultancy',
'CMMi consultancy',
'Software Tools development & maintenance',
'SharePoint and SAP Portal work packages',
'Requirements Management on SLATE & DOORS',
'Industrial Design (IDD) surfaces where required',
'Clash analysis-3D',
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
export default Transportation;
