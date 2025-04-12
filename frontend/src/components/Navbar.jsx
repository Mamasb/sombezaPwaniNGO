import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MyPortal</Link>
        <div className="space-x-4 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/admin" className="hover:underline">Admin Feed</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
