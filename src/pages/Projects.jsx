import React from "react";

import bridge from "../assets/bridge.jpg";
import MES from "../assets/Mechanical-Engineering-Services.jpeg";
import mechproj from "../assets/mechproj.jpg";
import structproj from "../assets/structproj.jpg";


const Projects = () => (
  <main className="w-full overflow-hidden">
    {/* Hero Section */}
    <section>
  <div className="relative w-screen flex items-center justify-start -mx-4">
    {/* Two images side by side */}
    <div className="flex w-full">
      <img
        src={structproj} // first image here
        alt="Projects Left"
        className="w-1/2 h-[50vh] object-cover object-center"
      />
      <img
        src={mechproj} // second image here
        alt="Projects Right"
        className="w-1/2 h-[50vh] object-cover object-center"
      />
    </div>

    {/* Text overlay */}
    <div
      className="absolute left-0 top-1/3 z-10 ml-8"
      style={{ maxWidth: "50vw" }}
    >
      <h1
        className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-20 w-auto h-auto bg-gray-800 bg-opacity-50 rounded"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
      >
        Projects
      </h1>
    </div>
  </div>
</section>


    {/* Projects Overview */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="w-full text-left">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Projects</h2>
          <p className="text-lg text-gray-800 mb-10">
            As a dedicated engineering consultancy, we have deep knowledge and
            experience on working all types of projects. Our projects ranged
            from small to large, simple to complex. All our projects were well
            defined and the results were exactly what the clients needed and to
            what extent. Our projects always give happiness to the clients in
            the same way we get making the structures for them. We would be
            pleased to share a glimpse of the projects that we have done so far.
          </p>
        </div>

        {/* Project Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Structural Projects */}
          <div className="text-left">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Structural Projects
            </h3>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={bridge}
                alt="Structural Projects"
                className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-xl font-semibold">
                  View Projects
                </span>
              </div>
            </div>
            <p className="text-gray-800 mt-4 text-justify">
              Through our structure projects, we have carried out all structural
              orientations including reinforcement of structural elements to
              support new loads or to accommodate changes in a structure's load
              bearing elements. Our projects yield the clients the best design
              at a relatively high quality. Our speciality is to provide a
              dynamic structure that crosses the client's expectations.
            </p>
          </div>

          {/* Mechanical Projects */}
          <div className="text-left">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Mechanical Projects
            </h3>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={MES}
                alt="Mechanical Projects"
                className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                <span className="text-white text-xl font-semibold">
                  View Projects
                </span>
              </div>
            </div>
            <p className="text-gray-800 mt-4 text-justify">
              We are a one-stop solution for all mechanical problems. Our
              mechanical projects have long-lasting functions and evergreen
              memories with us. All projects are carried out by our new
              mechanical systems to cut cost and increase durability. We have
              carried out all our client’s projects successfully and that is the
              reason behind the best outcome of our projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Projects;
