import React, { useState } from "react";
import Topbar from "../components/Topbar"; // Import the Topbar component
import Footer from "../components/Footer"; // Import the Footer component
import { getDistance } from "geolib"; // For distance calculation

const FindLostItems = () => {
  // State for filters and search
  const [sortBy, setSortBy] = useState(""); // Sort by distance, bounty, or date
  const [sortOrder, setSortOrder] = useState(""); // Ascending or descending order
  const [searchQuery, setSearchQuery] = useState(""); // Search keyword
  const [selectedKeywords, setSelectedKeywords] = useState([]); // Selected keywords for filtering
  const [selectedItem, setSelectedItem] = useState(null); // Selected item for modal
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 9; // Number of items per page

  // Mock data for lost items
  const lostItems = [
    {
      id: 1,
      name: "Lost Wallet",
      description: "Black leather wallet with cash and cards.",
      location: { latitude: 40.785091, longitude: -73.968285 }, // Central Park, New York
      bounty: 0.5,
      date: "2023-10-01",
      image: "https://via.placeholder.com/300", // Mock image URL
    },
    {
      id: 2,
      name: "Lost Phone",
      description: "iPhone 12 Pro Max, silver color.",
      location: { latitude: 40.758896, longitude: -73.98513 }, // Times Square, New York
      bounty: 1.2,
      date: "2023-10-05",
      image: "https://via.placeholder.com/300", // Mock image URL
    },
    {
      id: 3,
      name: "Lost Keys",
      description: "Set of house and car keys.",
      location: { latitude: 40.706077, longitude: -73.996864 }, // Brooklyn Bridge, New York
      bounty: 0.2,
      date: "2023-10-10",
      image: "https://via.placeholder.com/300", // Mock image URL
    },
    // Add more items as needed
  ];

  // User location (mock for now)
  const userLocation = { latitude: 40.7128, longitude: -74.006 }; // New York City

  // Add distance to each item
  const itemsWithDistance = lostItems.map((item) => ({
    ...item,
    distance: getDistance(userLocation, item.location), // Calculate distance in meters
  }));

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Add keyword to selected keywords
  const addKeyword = () => {
    if (searchQuery.trim() && !selectedKeywords.includes(searchQuery.trim())) {
      setSelectedKeywords([...selectedKeywords, searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  // Remove keyword from selected keywords
  const removeKeyword = (keyword) => {
    setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
  };

  // Reset all filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchQuery("");
    setSelectedKeywords([]);
  };

  // Filter and sort items based on selected filters and keywords
  const filteredItems = itemsWithDistance
    .filter((item) => {
      const matchesKeywords = selectedKeywords.length
        ? selectedKeywords.some((keyword) =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.description.toLowerCase().includes(keyword.toLowerCase())
          )
        : true;
      return matchesKeywords;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        return sortOrder === "asc" ? a.distance - b.distance : b.distance - a.distance;
      } else if (sortBy === "bounty") {
        return sortOrder === "asc" ? a.bounty - b.bounty : b.bounty - a.bounty;
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle marking an item as claimed
  const handleMarkAsClaimed = (item) => {
    const isConfirmed = window.confirm("Are you sure you have found this item?");
    if (isConfirmed) {
      alert(`Owner of "${item.name}" will be notified.`);
      // TODO: Send notification to the owner (backend integration)
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 flex-grow z-10">
        {/* Centered Heading and Subheading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-red-500 mb-4">Find Lost Items</h1>
          <p className="text-lg text-gray-400">
            Browse through the list of lost items and help others recover their belongings.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === "Enter" && addKeyword()}
              placeholder="Search by keywords..."
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={addKeyword}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Add
            </button>
          </div>

          {/* Selected Keywords */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedKeywords.map((keyword, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full"
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Sort Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Sort By</option>
              <option value="distance">Distance</option>
              <option value="bounty">Bounty</option>
              <option value="date">Date</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Order</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* 3x3 Grid of Lost Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 hover:border-red-500 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-red-500 mb-2">{item.name}</h2>
              <p className="text-gray-400 mb-4">{item.description}</p>
              <p className="text-gray-400 mb-2">
                <span className="font-bold">Bounty:</span> {item.bounty} ETH
              </p>
              <p className="text-gray-400">
                <span className="font-bold">Date:</span> {item.date}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-red-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal for Item Details */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-8 rounded-lg w-11/12 max-w-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              ×
            </button>

            {/* Item Details */}
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-red-500 mb-2">{selectedItem.name}</h2>
            <p className="text-gray-400 mb-4">{selectedItem.description}</p>
            <p className="text-gray-400 mb-2">
              <span className="font-bold">Bounty:</span> {selectedItem.bounty} ETH
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-bold">Date:</span> {selectedItem.date}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-bold">Distance:</span> {(selectedItem.distance / 1000).toFixed(2)} km
            </p>

            {/* Slider to Mark as Claimed */}
            <div className="mt-6">
              <button
                onClick={() => handleMarkAsClaimed(selectedItem)}
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition duration-300"
              >
                Slide to Mark as Claimed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindLostItems;