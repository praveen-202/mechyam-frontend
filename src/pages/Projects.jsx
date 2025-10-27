// import React from "react";

// import bridge from "../assets/bridge.jpg";
// import MES from "../assets/Mechanical-Engineering-Services.jpeg";
// import mechproj from "../assets/mechproj.jpg";
// import structproj from "../assets/structproj.jpg";


// const Projects = () => (
//   <main className="w-full overflow-hidden">
//     {/* Hero Section */}
//     <section>
//   <div className="relative w-screen flex items-center justify-start -mx-4">
//     {/* Two images side by side */}
//     <div className="flex w-full">
//       <img
//         src={structproj} // first image here
//         alt="Projects Left"
//         className="w-1/2 h-[50vh] object-cover object-center"
//       />
//       <img
//         src={mechproj} // second image here
//         alt="Projects Right"
//         className="w-1/2 h-[50vh] object-cover object-center"
//       />
//     </div>

//     {/* Text overlay */}
//     <div
//       className="absolute left-0 top-1/3 z-10 ml-8"
//       style={{ maxWidth: "50vw" }}
//     >
//       <h1
//         className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-20 w-auto h-auto bg-gray-800 bg-opacity-50 rounded"
//         style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
//       >
//         Projects
//       </h1>
//     </div>
//   </div>
// </section>


//     {/* Projects Overview */}
//     <section className="w-full bg-white py-12">
//       <div className="container mx-auto px-4">
//         <div className="w-full text-left">
//           <h2 className="text-2xl font-bold text-blue-900 mb-4">Projects</h2>
//           <p className="text-lg text-gray-800 mb-10 text-justify">
//             As a dedicated engineering consultancy, we have deep knowledge and
//             experience on working all types of projects. Our projects ranged
//             from small to large, simple to complex. All our projects were well
//             defined and the results were exactly what the clients needed and to
//             what extent. Our projects always give happiness to the clients in
//             the same way we get making the structures for them. We would be
//             pleased to share a glimpse of the projects that we have done so far.
//           </p>
//         </div>

//         {/* Project Categories */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Structural Projects */}
//           <div className="text-left">
//             <h3 className="text-xl font-bold text-blue-900 mb-3">
//               Structural Projects
//             </h3>
//             <div className="relative overflow-hidden rounded-lg shadow-md">
//               <img
//                 src={bridge}
//                 alt="Structural Projects"
//                 className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
//                 <span className="text-white text-xl font-semibold">
//                   View Projects
//                 </span>
//               </div>
//             </div>
//             <p className="text-gray-800 mt-4 text-justify">
//               Through our structure projects, we have carried out all structural
//               orientations including reinforcement of structural elements to
//               support new loads or to accommodate changes in a structure's load
//               bearing elements. Our projects yield the clients the best design
//               at a relatively high quality. Our speciality is to provide a
//               dynamic structure that crosses the client's expectations.
//             </p>
//           </div>

//           {/* Mechanical Projects */}
//           <div className="text-left">
//             <h3 className="text-xl font-bold text-blue-900 mb-3">
//               Mechanical Projects
//             </h3>
//             <div className="relative overflow-hidden rounded-lg shadow-md">
//               <img
//                 src={MES}
//                 alt="Mechanical Projects"
//                 className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
//                 <span className="text-white text-xl font-semibold">
//                   View Projects
//                 </span>
//               </div>
//             </div>
//             <p className="text-gray-800 mt-4 text-justify">
//               We are a one-stop solution for all mechanical problems. Our
//               mechanical projects have long-lasting functions and evergreen
//               memories with us. All projects are carried out by our new
//               mechanical systems to cut cost and increase durability. We have
//               carried out all our client’s projects successfully and that is the
//               reason behind the best outcome of our projects.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   </main>
// );

// export default Projects;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Projects = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/projects")
//       .then((res) => setProjects(res.data))
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-6">
//       <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
//         Our Projects
//       </h1>

//       {projects.length === 0 ? (
//         <p className="text-center text-gray-500">No projects available yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {projects.map((proj) => (
//             <div
//               key={proj.id}
//               className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//             >
//               <img
//                 src={proj.imageUrl}
//                 alt={proj.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {proj.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{proj.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;


import React, { useState } from "react";

const dummyProjects = [
  {
    id: 1,
    title: "AI Chatbot",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    description:
      "An AI-powered chatbot built with NLP that automates customer support and answers user queries intelligently.",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description:
      "A scalable e-commerce web app built using React, Node.js, and MongoDB with integrated payment gateway.",
  },
  {
    id: 3,
    title: "Weather Forecasting App",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    description:
      "Provides real-time weather updates, forecasts, and alerts using OpenWeather API with data visualization.",
  },
  {
    id: 4,
    title: "Healthcare Dashboard",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6c5b1f3b",
    description:
      "A responsive healthcare data visualization dashboard for hospitals to track patient and staff analytics.",
  },
  {
    id: 5,
    title: "Portfolio Website",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    description:
      "A personal portfolio built using React and Tailwind CSS, showcasing skills, projects, and achievements.",
  },
  {
    id: 6,
    title: "IoT Home Automation",
    image: "https://images.unsplash.com/photo-1606813902789-9b3e8c68f6e1",
    description:
      "IoT-based system that allows users to control home devices remotely using a mobile app.",
  },
  {
    id: 7,
    title: "Food Delivery App",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    description:
      "A mobile-first food ordering platform that connects restaurants and customers with real-time tracking. IoT-based system that allows users to control home devices remotely using a mobile app. IoT-based system that allows users to control home devices remotely using a mobile app.",
  },
  {
    id: 8,
    title: "Stock Market Tracker",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    description:
      "Real-time stock market tracker using financial APIs to visualize trends and portfolio insights.",
  },
  {
    id: 9,
    title: "Travel Blog",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "A blog platform for travel enthusiasts to share their journeys, stories, and recommendations.",
  },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
        Our Projects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dummyProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelected(proj)}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {proj.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for description */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2 text-blue-600">
              {selected.title}
            </h2>
            <p className="text-gray-700 mb-4">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
