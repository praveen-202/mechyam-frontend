import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";
import EmailButton from "./EmailButton";
import CareerButton from "./CareerButton";
import { Menu, X } from "lucide-react"; // install lucide-react for icons
import logo from "../assets/MADS01.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        {/* Left: Logo + Company Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Mechyam Logo" className="h-16 w-17" />
          </Link>
          <span className="text-2xl font-bold text-blue-900">Mechyam</span>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="block md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Center Navigation Menu (Desktop) */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
          {/* Structural Steel Dropdown */}
          <li className="relative group">
            <Link to="/steel-structure" className="hover:text-blue-600 transition">
              Structural Steel ▾
            </Link>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/structural-engineering" className="block px-4 py-2 hover:bg-gray-100">Structural Engineering Services</Link></li>
                <li><Link to="/structuralsteeldetailingservices" className="block px-4 py-2 hover:bg-gray-100">Structural Steel Detailing Services</Link></li>
                <li><Link to="/bridge-detailing" className="block px-4 py-2 hover:bg-gray-100">Bridge Detailing Services</Link></li>
              </ul>
            </div>
          </li>

          {/* Mechanical Dropdown */}
          <li className="relative group">
            <Link to="/mechanical" className="hover:text-blue-600 transition">
              Mechanical ▾
            </Link>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/product-design-development" className="block px-4 py-2 hover:bg-gray-100">Product Design & Development</Link></li>
                <li><Link to="/computer-aided-engineering" className="block px-4 py-2 hover:bg-gray-100">Computer Aided Engineering (CAE)</Link></li>
                <li><Link to="/embedded-design" className="block px-4 py-2 hover:bg-gray-100">Embedded Design</Link></li>
              </ul>
            </div>
          </li>

          {/* Industries Dropdown */}
          <li className="relative group">
            <Link to="/industries" className="hover:text-blue-600 transition">
              Industries ▾
            </Link>
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/contracting" className="block px-4 py-2 hover:bg-gray-100">Contracting</Link></li>
                <li><Link to="/oil-gas" className="block px-4 py-2 hover:bg-gray-100">Oil & Gas</Link></li>
                <li><Link to="/transportation" className="block px-4 py-2 hover:bg-gray-100">Transportation / Rail Industry</Link></li>
              </ul>
            </div>
          </li>

          {/* R&D Dropdown */}
          <li className="relative group">
            R&D ▾
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/structural-rnd" className="block px-4 py-2 hover:bg-gray-100">Structural Detailing R&D</Link></li>
                <li><Link to="/mechanical-rnd" className="block px-4 py-2 hover:bg-gray-100">Mechanical Engineering R&D</Link></li>
              </ul>
            </div>
          </li>

          <li><Link to="/projects" className="hover:text-blue-600 transition">Projects</Link></li>

          {/* About Dropdown */}
          <li className="relative group">
            <Link to="/about" className="hover:text-blue-600 transition">
              About ▾
            </Link>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/company" className="block px-4 py-2 hover:bg-gray-100">Company</Link></li>
                <li><Link to="/testimonials" className="block px-4 py-2 hover:bg-gray-100">Our Clients</Link></li>
              </ul>
            </div>
          </li>

          {/* More Dropdown */}
          <li className="relative group">
            More ▾
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
              <ul className="py-2">
                <li><Link to="/admin-page" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</Link></li>
              </ul>
            </div>
          </li>
        </ul>

        {/* Right Side Buttons (Desktop) */}
        <div className="hidden md:flex space-x-3">
          <ContactButton />
          <EmailButton />
          <CareerButton />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col text-gray-800 font-medium px-6 py-4 space-y-3">
            <li><Link to="/steel-structure" onClick={() => setMenuOpen(false)}>Structural Steel</Link></li>
            <li><Link to="/mechanical" onClick={() => setMenuOpen(false)}>Mechanical</Link></li>
            <li><Link to="/industries" onClick={() => setMenuOpen(false)}>Industries</Link></li>
            <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/admin-login" onClick={() => setMenuOpen(false)}>Admin Login</Link></li>
            <div className="flex flex-col gap-2 pt-3">
              <ContactButton />
              <EmailButton />
              <CareerButton />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
