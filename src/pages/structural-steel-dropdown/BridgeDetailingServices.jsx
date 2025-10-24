
import React from "react";
import heroImg from "../../assets/hero.png";
import steelDetailingImg from "../../assets/StructuralSteelImages/structural-steel-detailing.jpeg";
import brige from "../../assets/bridge.jpg";
import bridge01 from "../../assets/bridge01.jpg";


const BridgeDetailingServices = () => (
  <>
    <section  className="w-full overflow-hidden">
      <div className="relative w-screen flex items-center justify-start -mx-4">
        <img
          src={brige}
          alt="Steel Structure Background"
          className="w-full"
          style={{ height: '50vh', width: '100vw', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute left-0 top-1/3 z-10 ml-8" style={{ maxWidth: '50vw' }}>
          <h1 className="text-5xl md:text-6xl lg:text-l font-extrabold text-white mb-2 text-left px-10 w-auto h-auto bg-opacity-50 bg-gray-800 rounded" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            Bridge Detailing Services
          </h1>
        </div>
      </div>
    </section>
    
    {/* Two-column section: text (left) and image (right) */}
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2 text-left">
          <h2 className="text-2xl font-bold mb-4 bg-gray-200  rounded">Bridge Detailing Services</h2>
            <p className="text-lg text-gray-800 mb-4">
              Mechyam Inc. is a Customer Centric and Consistent Performance organization Providing Detailing Services for Any Bridge Type throughout the United States and Canada. Mechyam Inc is a large and reputable 3D Modeling, Detailing, and Pre-Construction services provider. Our production team includes dedicated bridge squads working on bridges to make your bridge project a success. Teams at Mechyam are highly skilled and process oriented which enhances our ability further to deliver what is expected from our end.</p>
            <p className="text-lg text-gray-800 mb-4">
              Mechyam has worked from new Pedestrian/Foot bridges, to a simple single span beam bridge to geometrically complex multi span Plate Girder bridges with Camber, Skew and Curve (Horizontal/Vertical) on plan. Rail Road, Road Over, Beam Bridges, Truss Bridges, Tied Arch, Cable Stayed Bridge to repair work (Retrofit) on large bridges, are different category of bridges Mechyam have worked on.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
                <img src={bridge01} alt="Steel detailing" className="w-full h-auto max-h-96 object-contain rounded-md shadow-md" />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default BridgeDetailingServices;
