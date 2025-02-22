
import React, { useState, useEffect } from "react";
import { FaTrophy, FaChartLine, FaUser, FaWallet } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // ScrollTrigger for animations
import Topbar from "../components/Topbar"; // Import the Topbar component
import Footer from "../components/Footer"; // Import the Footer component

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const DashboardPage= () => {
  // Mock data for charts and metrics
  const metrics = {
    reportsPosted: 42,
    bountiesClaimed: 15,
    ethInEscrow: 12.5,
    activeBounties: 27,
  };

  const recentActivity = [
    { id: 1, item: "Lost Wallet", bounty: 0.5, date: "2023-10-15" },
    { id: 2, item: "Lost Phone", bounty: 1.2, date: "2023-10-14" },
    { id: 3, item: "Lost Keys", bounty: 0.2, date: "2023-10-13" },
  ];

  const topFinders = [
    { id: 1, name: "Alice", bountiesClaimed: 8 },
    { id: 2, name: "Bob", bountiesClaimed: 5 },
    { id: 3, name: "Charlie", bountiesClaimed: 3 },
    { id: 4, name: "David", bountiesClaimed: 2 },
    { id: 5, name: "Eve", bountiesClaimed: 2 },
    { id: 6, name: "Frank", bountiesClaimed: 1 },
    { id: 7, name: "Grace", bountiesClaimed: 1 },
  ];

  const bountyData = [
    { name: "Wallets", value: 15 },
    { name: "Phones", value: 10 },
    { name: "Keys", value: 5 },
    { name: "Others", value: 7 },
  ];

  const bountyOverTimeData = [
    { date: "2023-10-01", bounties: 5 },
    { date: "2023-10-05", bounties: 10 },
    { date: "2023-10-10", bounties: 15 },
    { date: "2023-10-15", bounties: 20 },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

  // Testimonials data with profile pictures
  const testimonials = [
    {
      id: 1,
      name: "Alice",
      review: "Amazing platform! Found my lost wallet in no time.",
      pfp: "https://via.placeholder.com/150", // Mock profile picture
    },
    {
      id: 2,
      name: "Bob",
      review: "The community is so helpful. Highly recommend!",
      pfp: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Charlie",
      review: "Got my keys back within a day. Thank you!",
      pfp: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "David",
      review: "The bounty system is genius.",
      pfp: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Eve",
      review: "Lost & Found saved me so much stress.",
      pfp: "https://via.placeholder.com/150",
    },
  ];

  // State for active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll-triggered animations
  useEffect(() => {
    gsap.from(".animate-on-scroll", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".animate-on-scroll",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-poppins">
      {/* Header: Topbar Component */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-8">
        {/* Dashboard Title and Subheading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500">Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Overview of lost items, bounties, and community activity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Leaderboard */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center">
              <FaTrophy className="mr-2" /> Top Finders
            </h2>
            <div className="space-y-4">
              {topFinders.map((finder) => (
                <div
                  key={finder.id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 mr-2" />
                    <p className="text-lg">{finder.name}</p>
                  </div>
                  <p className="text-gray-400">
                    {finder.bountiesClaimed} Bounties
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Metrics, Charts, and Activity */}
          <div className="lg:col-span-2">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-red-500 mb-2">
                  Reports Posted
                </h2>
                <p className="text-3xl">{metrics.reportsPosted}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-red-500 mb-2">
                  Bounties Claimed
                </h2>
                <p className="text-3xl">{metrics.bountiesClaimed}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-red-500 mb-2">
                  ETH in Escrow
                </h2>
                <p className="text-3xl">{metrics.ethInEscrow} ETH</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-red-500 mb-2">
                  Active Bounties
                </h2>
                <p className="text-3xl">{metrics.activeBounties}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bounty Distribution Pie Chart */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  Bounty Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={bountyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {bountyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bounties Over Time Bar Chart */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                  Bounties Over Time
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bountyOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bounties" fill="#FF6384" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center">
                <FaChartLine className="mr-2" /> Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-gray-700 p-4 rounded-lg"
                  >
                    <p className="text-lg">{activity.item}</p>
                    <p className="text-gray-400">Bounty: {activity.bounty} ETH</p>
                    <p className="text-gray-400">Date: {activity.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-red-500 mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="flex justify-center items-center relative h-96">
            {testimonials.map((testimonial, index) => {
              const position = index - activeIndex;
              const isActive = position === 0;
              const isLeft = position === -1 || (activeIndex === 0 && index === testimonials.length - 1);
              const isRight = position === 1 || (activeIndex === testimonials.length - 1 && index === 0);

              return (
                <div
                  key={testimonial.id}
                  className={`absolute transition-all duration-500 ease-in-out transform ${
                    isActive
                      ? "scale-110 opacity-100 z-10"
                      : isLeft || isRight
                      ? "scale-90 opacity-50 blur-sm z-0"
                      : "scale-75 opacity-0 blur-md -z-10"
                  }`}
                  style={{
                    left: `calc(50% + ${position * 200}px)`,
                    transform: `translateX(-50%)`,
                  }}
                >
                  <div className="bg-gray-800 p-6 rounded-lg w-80 text-center">
                    <img
                      src={testimonial.pfp}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg font-bold">{testimonial.name}</p>
                    <p className="text-gray-400">{testimonial.review}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardPage;