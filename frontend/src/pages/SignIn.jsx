import React, { useState } from "react";
import { Link } from "react-router-dom";
import OTPInput from "otp-input-react"; // For OTP input
import Topbar from "../components/Topbar"; // Import the Topbar

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false); // Toggle OTP input
  const [otp, setOtp] = useState(""); // OTP value
  const [progress, setProgress] = useState(0); // Progress bar value

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate OTP verification
    setShowOTP(true);
    setError("");
  };

  const handleOTPSubmit = () => {
    // Simulate OTP verification logic
    if (otp.length === 6) {
      console.log("OTP verified. Signing in with:", email, password);
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Update progress bar based on form completion
  const updateProgress = () => {
    let progressValue = 0;
    if (email) progressValue += 50;
    if (password) progressValue += 50;
    setProgress(progressValue);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
            Sign In
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="relative h-2 bg-gray-700 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-red-500 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {!showOTP ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    updateProgress();
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    updateProgress();
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
              >
                Sign In
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                />
              </div>
              <button
                onClick={handleOTPSubmit}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
              >
                Verify OTP
              </button>
            </div>
          )}
          <p className="text-center mt-6 text-gray-400">
            New user?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;