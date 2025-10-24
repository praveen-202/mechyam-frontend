// import React, { useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import StructuralSteel from "./pages/StructuralSteel";
// import Mechanical from "./pages/Mechanical";
// import StructuralDetailingRandD from "./pages/RandD-dropdown/StructuralDetailingRandD.jsx";
// import MechanicalEngineeringRandD from "./pages/RandD-dropdown/MechanicalEngineeringRandD.jsx";
// import Projects from "./pages/Projects";
// import About from "./pages/About";
// import ContactPage from "./pages/Contact/ContactPage";
// import CareerPage from "./pages/Career/CareerPage.jsx";
// import JobDetailsPage from "./pages/Career/JobDetailsPage.jsx";
// import Home from "./pages/Home/Home.jsx";
// import StructuralEngineering from "./pages/structural-steel-dropdown/StructuralEngineering";
// import StructuralSteelDetailingServices from "./pages/structural-steel-dropdown/StructuralSteelDetailingServices";
// import BridgeDetailingServices from "./pages/structural-steel-dropdown/BridgeDetailingServices";
// import ProductDesignAndDevelopment from "./pages/mechanical-dropdown/ProductDesignAndDevelopment";
// import ComputerAidedEngineering from "./pages/mechanical-dropdown/ComputerAidedEngineering";
// import EmbeddedDesign from "./pages/mechanical-dropdown/EmbeddedDesign";
// import Industries from "./pages/Industries";
// import Contracting from "./pages/industries-dropdown/Contracting";
// import OilAndGas from "./pages/industries-dropdown/OilAndGas";
// import Transportation from "./pages/industries-dropdown/Transportation";
// import Company from "./pages/about-dropdown/Company";
// import Testimonials from "./pages/about-dropdown/Testimonials";
// import AdminPage from "./components/AdminPage/AdminPage";
// import Footer from "./pages/Footer.jsx";
// import DetailedJobList from "./pages/DetailedJobList";

// // ✅ ScrollToTop Component (inside App for simplicity)
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0); // Scrolls to top when route changes
//   }, [pathname]);

//   return null;
// };

// function App() {
//   return (
//     <>
//       {/* 👇 Automatically scrolls to top when route changes */}
//       <ScrollToTop />

//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/steel-structure" element={<StructuralSteel />} />
//         <Route path="/structural-engineering" element={<StructuralEngineering />} />
//         <Route path="/structuralsteeldetailingservices" element={<StructuralSteelDetailingServices />} />
//         <Route path="/bridge-detailing" element={<BridgeDetailingServices />} />
//         <Route path="/mechanical" element={<Mechanical />} />
//         <Route path="/product-design-development" element={<ProductDesignAndDevelopment />} />
//         <Route path="/computer-aided-engineering" element={<ComputerAidedEngineering />} />
//         <Route path="/embedded-design" element={<EmbeddedDesign />} />
//         <Route path="/industries" element={<Industries />} />
//         <Route path="/contracting" element={<Contracting />} />
//         <Route path="/oil-gas" element={<OilAndGas />} />
//         <Route path="/transportation" element={<Transportation />} />
//         <Route path="/structural-rnd" element={<StructuralDetailingRandD />} />
//         <Route path="/mechanical-rnd" element={<MechanicalEngineeringRandD />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/company" element={<Company />} />
//         <Route path="/testimonials" element={<Testimonials />} />
//         <Route path="/admin-page" element={<AdminPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/careers" element={<CareerPage />} />
//         <Route path="/career/:id" element={<JobDetailsPage />} />
//         <Route path="/jobs/:id" element={<DetailedJobList />} />

//         <Route path="*" element={<div>404 Page Not Found</div>} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;



import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import StructuralSteel from "./pages/StructuralSteel";
import Mechanical from "./pages/Mechanical";
import StructuralDetailingRandD from "./pages/RandD-dropdown/StructuralDetailingRandD.jsx";
import MechanicalEngineeringRandD from "./pages/RandD-dropdown/MechanicalEngineeringRandD.jsx";
import Projects from "./pages/Projects";
import About from "./pages/About";
import ContactPage from "./pages/Contact/ContactPage";
import CareerPage from "./pages/Career/CareerPage.jsx";
import JobDetailsPage from "./pages/Career/JobDetailsPage.jsx";
import Home from "./pages/Home/Home.jsx";
import StructuralEngineering from "./pages/structural-steel-dropdown/StructuralEngineering";
import StructuralSteelDetailingServices from "./pages/structural-steel-dropdown/StructuralSteelDetailingServices";
import BridgeDetailingServices from "./pages/structural-steel-dropdown/BridgeDetailingServices";
import ProductDesignAndDevelopment from "./pages/mechanical-dropdown/ProductDesignAndDevelopment";
import ComputerAidedEngineering from "./pages/mechanical-dropdown/ComputerAidedEngineering";
import EmbeddedDesign from "./pages/mechanical-dropdown/EmbeddedDesign";
import Industries from "./pages/Industries";
import Contracting from "./pages/industries-dropdown/Contracting";
import OilAndGas from "./pages/industries-dropdown/OilAndGas";
import Transportation from "./pages/industries-dropdown/Transportation";
import Company from "./pages/about-dropdown/Company";
import Testimonials from "./pages/about-dropdown/OurClients.jsx";
import AdminPage from "./components/AdminPage/AdminPage";
import Footer from "./pages/Footer.jsx";
import DetailedJobList from "./pages/DetailedJobList";

// ✅ ScrollToTop Component (inside App for simplicity)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when route changes
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      {/* 👇 Automatically scrolls to top when route changes */}
      <ScrollToTop />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/steel-structure" element={<StructuralSteel />} />
        <Route path="/structural-engineering" element={<StructuralEngineering />} />
        <Route path="/structuralsteeldetailingservices" element={<StructuralSteelDetailingServices />} />
        <Route path="/bridge-detailing" element={<BridgeDetailingServices />} />
        <Route path="/mechanical" element={<Mechanical />} />
        <Route path="/product-design-development" element={<ProductDesignAndDevelopment />} />
        <Route path="/computer-aided-engineering" element={<ComputerAidedEngineering />} />
        <Route path="/embedded-design" element={<EmbeddedDesign />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contracting" element={<Contracting />} />
        <Route path="/oil-gas" element={<OilAndGas />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/structural-rnd" element={<StructuralDetailingRandD />} />
        <Route path="/mechanical-rnd" element={<MechanicalEngineeringRandD />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/company" element={<Company />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/career/:id" element={<JobDetailsPage />} />
        <Route path="/jobs/:id" element={<DetailedJobList />} />

        {/* ✅ Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
