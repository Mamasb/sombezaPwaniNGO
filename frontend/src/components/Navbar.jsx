import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link
          to="/"
          className="logo text-2xl font-semibold text-gray-900 tracking-wider hover:text-blue-600 transition duration-300"
        >
          SombezaPwani
        </Link>

        {/* Navigation Links */}
        <div className="nav-links flex space-x-8 text-lg font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-gray-700 hover:text-blue-500 transition duration-300"
          >
            Members Area
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
