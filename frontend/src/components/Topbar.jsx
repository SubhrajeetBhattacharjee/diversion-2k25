import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react"; // Icons

const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle login state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle dropdown state

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".profile-dropdown")) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative top-0 left-0 w-full z-50 bg-transparent text-white shadow-none select-none">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide cursor-default">
          Findora
        </Link>

        {/* Center - Navigation Links */}
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-red-400 transition duration-200 cursor-default">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-red-400 transition duration-200 cursor-default">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/find-lost-items" className="hover:text-red-400 transition duration-200 cursor-default">
              Find Lost Items
            </Link>
          </li>
          <li>
            <Link to="/post-lost-items" className="hover:text-red-400 transition duration-200 cursor-default">
              Post Lost Items
            </Link>
          </li>
        </ul>

        {/* Right - Notification & Profile */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-red-600/30 transition duration-300 cursor-default">
            <Bell className="w-6 h-6 text-red-400" />
            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-1">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <div
              className="cursor-pointer flex items-center space-x-2 hover:text-red-400 transition duration-300 cursor-default"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User className="w-6 h-6" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg z-50">
                {isLoggedIn ? (
                  <Link to="/profile" className="block px-4 py-2 hover:bg-red-500 transition cursor-default">
                    Open Profile
                  </Link>
                ) : (
                  <>
                    <Link to="/signin" className="block px-4 py-2 hover:bg-red-500 transition cursor-default">
                      Sign In
                    </Link>
                    <Link to="/signup" className="block px-4 py-2 hover:bg-red-500 transition cursor-default">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Topbar;