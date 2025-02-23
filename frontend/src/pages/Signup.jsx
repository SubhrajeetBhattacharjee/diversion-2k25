import React, { useState } from "react";
import { Link } from "react-router-dom";
import OTPInput from "otp-input-react"; // For OTP input
import Topbar from "../components/Topbar"; // Import the Topbar component

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false); // Toggle OTP input
  const [otp, setOtp] = useState(""); // OTP value
  const [progress, setProgress] = useState(0); // Progress bar value

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate OTP verification
    setShowOTP(true);
    setError("");
  };

  const handleOTPSubmit = () => {
    // Simulate OTP verification logic
    if (otp.length === 6) {
      console.log("OTP verified. Signing up with:", name, email, password);
      setError("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Update progress bar based on form completion
  const updateProgress = () => {
    let progressValue = 0;
    if (name) progressValue += 25;
    if (email) progressValue += 25;
    if (password) progressValue += 25;
    if (confirmPassword) progressValue += 25;
    setProgress(progressValue);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Topbar Component */}
      <Topbar />

      <div className="flex items-center justify-center pt-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Progress Bar at the Top */}
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
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    updateProgress();
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    updateProgress();
                  }}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
              >
                Sign Up
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
            Already have an account?{" "}
            <Link to="/signin" className="text-red-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;