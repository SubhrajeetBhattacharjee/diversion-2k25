import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Spline from "@splinetool/react-spline";

const Dashboard = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Spline 3D Background */}
      <Spline
        scene="https://prod.spline.design/ZR1FiG0-jUguQ6qB/scene.splinecode"
        className="absolute inset-0 w-full h-full object-cover scale-[1.2] z-0"
        onError={(error) => console.error("Spline failed to load:", error)}
        renderOnDemand={false}
        pixelRatio={window.devicePixelRatio || 1}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Topbar />

        {/* Floating Text */}
        <div className="absolute inset-0 flex items-center justify-between px-20">
          {/* Left Side - HELP OTHERS */}
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-6xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-float select-none cursor-default">
              HELP
            </h2>
            <h2 className="text-6xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-float-delay select-none cursor-default">
              OTHERS
            </h2>
          </div>

          {/* Right Side - GET REWARDED */}
          <div className="flex flex-col items-end">
            <h2 className="text-6xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-float text-right select-none cursor-default">
              GET
            </h2>
            <h2 className="text-6xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-float-delay select-none cursor-default">
              REWARDED
            </h2>
          </div>
        </div>

        {/* Main Content */}
        
      </div>

      {/* Fixed Transparent Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;