import React from "react";
import brige from "../../assets/bridge.jpg";

const Testimonials = () => (
  <>
    {/* Hero Section */}
    <section className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={brige}
          alt="Steel Structure Background"
          className="w-full"
          style={{
            height: "70vh",
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
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 text-left px-20"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
          >
            Testimonials
          </h1>
        </div>
      </div>
    </section>

    {/* Content Section */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
       
        <div className="flex flex-col md:flex-row items-start gap-8">
          
          <div className="w-full md:w-1/3 text-left">
            <h2 className="text-xl font-bold mb-4 text-blue-900 p-3 rounded bg-white">
              See what our clients are saying about us
            </h2>
        </div>
        </div>
      </div>
    </section>
  </>
);

export default Testimonials;
