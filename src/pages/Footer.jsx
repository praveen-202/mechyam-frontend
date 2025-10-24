// import React from "react";
// import logo from "../assets/Mechyam.jpg"; // replace with your logo path

// const Footer = () => {
//   const services = {
//     "STRUCTURAL STEEL": [
//       "Structural Engineering Services",
//       "Structural Steel Detailing Services",
//       "Bridge Detailing Services",
//     ],
//     MECHANICAL: [
//       "Product Design & Development",
//       "Computer Aided Engineering (CAE) Service",
//       "Value Analysis & Value Engineering (VAVE)",
//       "Engineering Documentation & Standardization",
//       "CAD Data Migration Services",
//       "Special Purpose Machine Design",
//       "Electrical Engineering Services",
//       "Embedded Design",
//       "Technical Publication Services",
//       "Engineering Consulting Services",
//       "Marine Engineering",
//       "Industrial Internet Of Things (IIOT)",
//       "Manufacturing Services",
//       "CAD Design Automation",
//     ],
//     INDUSTRIES: [
//       "Contracting",
//       "Transportation/Rail Industry",
//       "Oil & Gas",
//       "Energy",
//       "Industrial",
//       "Aviation",
//       "Semiconductor",
//       "Consumer Electronics",
//       "Food Processing Equipment",
//       "Construction & Material Handling",
//       "Automotive",
//       "Packaging",
//     ],
//     GENERAL: ["Home", "About", "Projects", "Contact", "News & Events"],
//     CAREERS: ["View Opportunities"],
//   };

//   return (
//     <footer className="bg-[#3a3a3a] text-white py-14">
//       <div className="max-w-7xl mx-auto px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//           {/* LEFT SECTION - CONTACT INFO */}
//           <div className="lg:col-span-4">
//             {/* Logo */}
//             <div className="flex items-center mb-8">
//               <img src={logo} alt="Mechyam Logo" className="w-16 h-auto mr-3" />
//               <h1 className="text-3xl font-bold text-blue-700">MECHYAM</h1>
//             </div>

//             <h2 className="text-lg font-semibold mb-4 tracking-wide">CONTACT</h2>

//             {/* Global HQ */}
//             <div className="mb-6 text-sm leading-6">
//               <p className="font-semibold text-gray-300">Corporate Office (India) </p>
//               <p className="text-gray-300">Mechyam Technical Services Inc.</p>
//               <p  className="text-gray-400">Plot No.97-E EP Mahalaxmi puram, Narapally, Ghatkesar Manadal, Medchal-Malkajgiri Dist Telangana-500088</p>
//               <p  className="text-gray-400">Contact : +91 79816 70612</p>
//             </div>

//             {/* India Office */}
            
//           </div>

//           {/* RIGHT SECTION - SERVICES */}
//           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">
//             {/* Column 1: Structural + Mechanical */}
//             <div>
//               <div className="mb-8">
//                 <h3 className="font-bold text-white mb-4 text-base tracking-wide">
//                   STRUCTURAL STEEL
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   {services["STRUCTURAL STEEL"].map((item, index) => (
//                     <li key={index} className="hover:text-white cursor-pointer">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-white mb-4 text-base tracking-wide">
//                   MECHANICAL
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   {services["MECHANICAL"].map((item, index) => (
//                     <li key={index} className="hover:text-white cursor-pointer">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Column 2: Industries */}
//             <div>
//               <h3 className="font-bold text-white mb-4 text-base tracking-wide">
//                 INDUSTRIES
//               </h3>
//               <ul className="space-y-2 text-sm text-gray-400">
//                 {services["INDUSTRIES"].map((item, index) => (
//                   <li key={index} className="hover:text-white cursor-pointer">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Column 3: General + Careers */}
//             <div>
//               <div className="mb-8">
//                 <h3 className="font-bold text-white mb-4 text-base tracking-wide">
//                   GENERAL
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   {services["GENERAL"].map((item, index) => (
//                     <li key={index} className="hover:text-white cursor-pointer">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="font-bold text-white mb-4 text-base tracking-wide">
//                   CAREERS
//                 </h3>
//                 <ul className="space-y-2 text-sm text-gray-400">
//                   {services["CAREERS"].map((item, index) => (
//                     <li key={index} className="hover:text-white cursor-pointer">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
//           <p>© 2024 Mechyam Technical Services Pvt. Ltd | All Rights Reserved</p>
//           <div className="flex space-x-4 mt-2 md:mt-0">
//             <a href="#" className="hover:text-white">TERMS OF USE</a>
//             <span>|</span>
//             <a href="#" className="hover:text-white">PRIVACY POLICY</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import MADS from "../assets/MADS01.jpg"; // Your company logo

const Footer = () => {
  const services = {
    "STEEL STRUCTURE": [
      { name: "Structural Engineering Services", link: "/structural-engineering" },
      { name: "Structural Steel Detailing Services", link: "/structuralsteeldetailingservices" },
      { name: "Bridge Detailing Services", link: "/bridge-detailing" },
    ],
    MECHANICAL: [
      { name: "Product Design & Development" },
      { name: "Computer Aided Engineering (CAE) Service" },
      { name: "Value Analysis & Value Engineering (VAVE)" },
      { name: "Engineering Documentation & Standardization" },
      { name: "CAD Data Migration Services" },
      { name: "Special Purpose Machine Design" },
      { name: "Electrical Engineering Services" },
      { name: "Embedded Design" },
      { name: "Technical Publication Services" },
      { name: "Engineering Consulting Services" },
      { name: "Marine Engineering" },
      { name: "Industrial Internet Of Things (IIOT)" },
      { name: "Manufacturing Services" },
      { name: "CAD Design Automation" },
    ],
    INDUSTRIES: [
      "Contracting",
      "Transportation/Rail Industry",
      "Oil & Gas",
      "Energy",
      "Industrial",
      "Aviation",
      "Semiconductor",
      "Consumer Electronics",
      "Food Processing Equipment",
      "Construction & Material Handling",
      "Automotive",
      "Packaging",
    ],
    GENERAL: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Projects", link: "/projects" },
      { name: "Contact", link: "/contact" },
      { name: "News & Events", link: "/news" },
    ],
    CAREERS: [
      { name: "View Opportunities", link: "/careers" },
    ],
  };

  return (
    <footer className="bg-[#3a3a3a] text-white py-14">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SECTION - CONTACT INFO */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-8">
              <img src={MADS} alt="Mechyam Logo" className="w-20 h-30 mr-3" />
              <h1 className="text-3xl font-bold text-blue-800">Mechyam</h1>
            </div>

            <h2 className="text-lg font-semibold mb-4 tracking-wide">CONTACT</h2>
            <div className="mb-6 text-sm leading-6">
              <p className="font-semibold text-gray-300">
                Corporate Office (India)
              </p>
              <p className="text-gray-300">MECHYAM AI DESIGN SOLUTIONS PVT. LTD.</p>
              <p className="text-gray-400">
               Plot No. 2/1-C, Sy.No. - 79, # B Square Towers, 301 3rd Floor, Patrika Nagar, Hitech-City, Hyderabad, Telangana - 500 081
              </p>
              <p className="text-gray-400">Contact : +91 79816 70612
                                                    ,+91 80089 71490
              </p><hr></hr>
              <p className="text-gray-400 leading-relaxed">
  <span className="block font-semibold text-gray-300 mb-1">Website:</span>
  <span className="block">www.mechyam.com</span>
</p>
             <p className="text-gray-400 leading-relaxed">
  <span className="block font-semibold text-gray-300 mb-1">Email:</span>
  <span className="block">info@mechyam.com</span>
  <span className="block">hr@mechyam.com</span>
</p>
<hr></hr>
<p>
  <span className="block font-semibold text-gray-300 mb-1">Follow us on social for updates</span>

</p>
            </div>
          </div>

          {/* RIGHT SECTION - SERVICES */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Column 1: Steel Structure + Mechanical */}
            <div>
              <div className="mb-8">
                <h3 className="font-bold text-white mb-4 text-base tracking-wide">
                  STEEL STRUCTURE
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {services["STEEL STRUCTURE"].map((item, index) => (
                    <li key={index}>
                      <Link to={item.link} className="hover:text-white cursor-pointer">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4 text-base tracking-wide">
                  MECHANICAL
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {services["MECHANICAL"].map((item, index) => (
                    <li key={index} className="hover:text-white cursor-pointer">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Industries */}
            <div>
              <h3 className="font-bold text-white mb-4 text-base tracking-wide">
                INDUSTRIES
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {services["INDUSTRIES"].map((item, index) => (
                  <li key={index} className="hover:text-white cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: General + Careers */}
            <div>
              <div className="mb-8">
                <h3 className="font-bold text-white mb-4 text-base tracking-wide">
                  GENERAL
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {services["GENERAL"].map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.link}
                        className="hover:text-white cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-4 text-base tracking-wide">
                  CAREERS
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {services["CAREERS"].map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.link}
                        className="hover:text-white cursor-pointer"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>Copyright © 2025 Mechyam - All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">TERMS OF USE</a>
            <span>|</span>
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;