import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-300">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;