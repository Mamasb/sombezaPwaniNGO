import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">MyPortal</Link>
        <div>
          <Link to="/" className="mx-4">Home</Link>
          <Link to="/admin" className="mx-4">Admin Feed</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
