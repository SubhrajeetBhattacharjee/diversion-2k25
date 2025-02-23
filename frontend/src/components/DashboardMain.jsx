import React from "react";

const DashboardMain = () => {
  return (
    <section className="p-6 bg-gray-900 text-white rounded-lg shadow-lg animate-fade-in">
      {/* Dashboard Header */}
      <header>
        <h1 className="text-3xl font-bold text-red-500">Welcome to Your Dashboard</h1>
        <p className="mt-4 text-gray-300">
          Here, you can manage your lost and found items efficiently. Use the navigation to explore.
        </p>
      </header>

      {/* Dashboard Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Find Lost Items Card */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-red-400">Find Lost Items</h2>
          <p className="text-gray-300 mt-2">Search for items that have been reported lost.</p>
        </div>

        {/* Post Lost Items Card */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-red-400">Post Lost Items</h2>
          <p className="text-gray-300 mt-2">Report your lost items and help others find them.</p>
        </div>

        {/* Your Reports Card */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-red-400">Your Reports</h2>
          <p className="text-gray-300 mt-2">View and manage your lost item reports.</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;