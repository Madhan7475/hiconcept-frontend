import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-black' : 'bg-transparent'}`}>

      {/* CONTAINER */}
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex justify-between items-center text-white">

        {/* LOGO */}
        <Link to="/" className="block">
          <img
            src="/logo.png"
            alt="Hi-Concept Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Service</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-7 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-50 flex flex-col items-center justify-center gap-8 text-2xl text-white`}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Service</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </div>
    </div>
  );
};

export default Navbar;