import { useState } from "react";
import {
  FaBlog,
  FaBars,
  FaTimes,
  FaUser,
  FaUserPlus,
  FaSearch,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Icon */}
        <a href="/" className="flex items-center space-x-2">
          <FaBlog className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold">MyBlog</span>
        </a>

        {/* Desktop Features */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Nav Links */}
          <a href="/" className="flex items-center space-x-1 hover:text-blue-600">
            <FaHome /> <span>Home</span>
          </a>
          <a href="/about" className="flex items-center space-x-1 hover:text-blue-600">
            <FaInfoCircle /> <span>About</span>
          </a>
          <a href="/contact" className="flex items-center space-x-1 hover:text-blue-600">
            <FaEnvelope /> <span>Contact</span>
          </a>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <FaUser />
              <span>Login</span>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              <FaUserPlus />
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden shadow-lg bg-white text-gray-900">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {/* Nav Links */}
            <a href="/" className="flex items-center space-x-2">
              <FaHome /> <span>Home</span>
            </a>
            <a href="/about" className="flex items-center space-x-2">
              <FaInfoCircle /> <span>About</span>
            </a>
            <a href="/contact" className="flex items-center space-x-2">
              <FaEnvelope /> <span>Contact</span>
            </a>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Auth Buttons */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <FaUser />
              <span>Login</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/signup");
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
            >
              <FaUserPlus />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
