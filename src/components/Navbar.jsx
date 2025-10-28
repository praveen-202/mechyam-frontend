import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";
import EmailButton from "./EmailButton";
import CareerButton from "./CareerButton";
import { Menu, X } from "lucide-react";
import logo from "../assets/MADS01.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  const openDropdown = (name) => {
    // cancel any pending close timer and open immediately
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const scheduleCloseDropdown = (delay = 200) => {
    // schedule close after short delay to allow mouse to move into submenu
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, delay);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-10 py-4">
        {/* Left: Logo + Company Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Mechyam Logo" className="h-20 w-17" />
          </Link>
          <span className="text-2xl font-bold text-blue-900">Mechyam</span>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="block md:hidden text-gray-800"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium relative z-50">
          {/* Structural Steel Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("steel")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <Link to="/steel-structure" className="hover:text-blue-600 transition px-1 py-1 inline-block">
              Structural Steel ▾
            </Link>

            {/* Dropdown panel: keep it mounted only when active for cleanliness */}
            {activeDropdown === "steel" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[16rem]"
                onMouseEnter={() => openDropdown("steel")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link
                      to="/engineering-design"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Engineering Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/structural-analysis"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Structural Analysis
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/structural-engineering"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Structural Engineering Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/structuralsteeldetailingservices"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Structural Steel Detailing Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bridge-detailing"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Bridge Detailing Services
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Mechanical Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("mechanical")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <Link to="/mechanical" className="hover:text-blue-600 transition px-1 py-1 inline-block">
              Mechanical ▾
            </Link>
            {activeDropdown === "mechanical" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[16rem]"
                onMouseEnter={() => openDropdown("mechanical")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/product-design-development" className="block px-4 py-2 hover:bg-gray-100">
                      Product Design & Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/computer-aided-engineering" className="block px-4 py-2 hover:bg-gray-100">
                      Computer Aided Engineering (CAE)
                    </Link>
                  </li>
                  <li>
                    <Link to="/embedded-design" className="block px-4 py-2 hover:bg-gray-100">
                      Embedded Design
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Industries Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("industries")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <Link to="/industries" className="hover:text-blue-600 transition px-1 py-1 inline-block">
              Industries ▾
            </Link>
            {activeDropdown === "industries" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[16rem]"
                onMouseEnter={() => openDropdown("industries")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/aerospace-transportation" className="block px-4 py-2 hover:bg-gray-100">
                      Aerospace and Transportation
                    </Link>
                  </li>
                  <li>
                    <Link to="/windenergyrenewables" className="block px-4 py-2 hover:bg-gray-100">
                      Wind Energy and Renewables
                    </Link>
                  </li>
                  <li>
                    <Link to="/manufacturing-plantengineering" className="block px-4 py-2 hover:bg-gray-100">
                      Manufacturing and Plant Engineering
                    </Link>
                  </li>
                  <li>
                    <Link to="/contracting" className="block px-4 py-2 hover:bg-gray-100">
                      Contracting
                    </Link>
                  </li>
                  <li>
                    <Link to="/oil-gas" className="block px-4 py-2 hover:bg-gray-100">
                      Oil & Gas
                    </Link>
                  </li>
                  <li>
                    <Link to="/transportation" className="block px-4 py-2 hover:bg-gray-100">
                      Transportation / Rail Industry
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* R&D */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("rnd")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <span className="hover:text-blue-600 transition px-1 py-1 inline-block cursor-pointer">
              R&D ▾
            </span>
            {activeDropdown === "rnd" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[18rem]"
                onMouseEnter={() => openDropdown("rnd")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/structural-rnd" className="block px-4 py-2 hover:bg-gray-100">
                      Structural Detailing R&D
                    </Link>
                  </li>
                  <li>
                    <Link to="/mechanical-rnd" className="block px-4 py-2 hover:bg-gray-100">
                      Mechanical Engineering R&D
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/projects" className="hover:text-blue-600 transition px-1 py-1 inline-block">
              Projects
            </Link>
          </li>

          {/* About */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("about")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <Link to="/about" className="hover:text-blue-600 transition px-1 py-1 inline-block">
              About ▾
            </Link>
            {activeDropdown === "about" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[12rem]"
                onMouseEnter={() => openDropdown("about")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/company" className="block px-4 py-2 hover:bg-gray-100">
                      Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/testimonials" className="block px-4 py-2 hover:bg-gray-100">
                      Our Clients
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* More */}
          <li
            className="relative"
            onMouseEnter={() => openDropdown("more")}
            onMouseLeave={() => scheduleCloseDropdown()}
          >
            <span className="hover:text-blue-600 transition px-1 py-1 inline-block cursor-pointer">
              More ▾
            </span>
            {activeDropdown === "more" && (
              <div
                className="absolute left-0 top-full bg-white rounded-md shadow-lg z-50 mt-0 min-w-[12rem]"
                onMouseEnter={() => openDropdown("more")}
                onMouseLeave={() => scheduleCloseDropdown()}
              >
                <ul className="py-2">
                  <li>
                    <Link to="/admin-page" className="block px-4 py-2 hover:bg-gray-100">
                      Admin Panel
                    </Link>
                  </li>
                </ul>
              </div>
            )}
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
            <li>
              <Link to="/steel-structure" onClick={() => setMenuOpen(false)}>
                Structural Steel
              </Link>
            </li>
            <li>
              <Link to="/mechanical" onClick={() => setMenuOpen(false)}>
                Mechanical
              </Link>
            </li>
            <li>
              <Link to="/industries" onClick={() => setMenuOpen(false)}>
                Industries
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/admin-login" onClick={() => setMenuOpen(false)}>
                Admin Login
              </Link>
            </li>
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
