

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
