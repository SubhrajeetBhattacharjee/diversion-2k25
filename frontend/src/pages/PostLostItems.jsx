import React, { useState } from "react";
import Topbar from "../components/Topbar"; // Import the Topbar component
import Footer from "../components/Footer"; // Import the Footer component
import { FaCheckCircle } from "react-icons/fa";
// Import a checkmark icon

const PostLostItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [countdown, setCountdown] = useState(5); // Countdown timer
  const [images, setImages] = useState([]); // State for uploaded images
  const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

  // Mock function to simulate sending ETH payment
  const sendPayment = async (ethAmount) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    return "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"; // Mock transaction hash
  };

  // Mock function to simulate posting bounty details to the backend
  const postBounty = async (bountyDetails) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    return { success: true, message: "Bounty posted successfully!", data: bountyDetails }; // Mock response
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(event.target);
    const bountyDetails = {
      itemName: formData.get("itemName"),
      description: formData.get("description"),
      location: formData.get("location"),
      ethAmount: parseFloat(formData.get("ethAmount")),
      contact: formData.get("contact"),
      images: images, // Include the uploaded images
    };

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Simulate sending ETH payment
      const txHash = await sendPayment(bountyDetails.ethAmount);

      // Step 2: Simulate posting bounty details to the backend
      const response = await postBounty({ ...bountyDetails, txHash });

      // Step 3: Open the modal
      setIsModalOpen(true);

      // Step 4: Start the countdown
      let timer = 5;
      const interval = setInterval(() => {
        setCountdown(timer);
        timer--;
        if (timer < 0) {
          clearInterval(interval);
          window.location.href = "/find-lost-items"; // Redirect to Find Lost Items page
        }
      }, 1000);
    } catch (error) {
      setError("Failed to post bounty: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    const newImagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newImages.push(file);
      newImagePreviews.push(URL.createObjectURL(file));
    }

    setImages([...images, ...newImages]);
    setImagePreviews([...imagePreviews, ...newImagePreviews]);
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    const newImages = [...images];
    const newImagePreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newImagePreviews.splice(index, 1);

    setImages(newImages);
    setImagePreviews(newImagePreviews);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20 flex-grow z-10">
        {/* Centered Heading and Subheading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-red-500 mb-4">Lost Something?</h1>
          <p className="text-lg text-gray-400">
            Reach Out To Our Community To Increase Your Chances Of Getting It Back.
          </p>
        </div>

        {/* Warning Message */}
        <div className="max-w-md mx-auto bg-yellow-500/20 border-l-4 border-yellow-500 text-yellow-300 p-4 mb-8 rounded-lg">
          <p className="text-sm">
            <span className="font-bold">Warning:</span> The ETH amount you enter will be deducted immediately and held in escrow. It will only be released to the finder once the item is confirmed as found. Please double-check the amount before submitting.
          </p>
        </div>

        {/* Form for Posting Lost Items */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {/* Item Name */}
          <div className="mb-6">
            <label htmlFor="itemName" className="block text-lg font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter the name of the item"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
              placeholder="Provide a detailed description of the item"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-lg font-medium mb-2">
              Location Lost
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter the location where the item was lost"
              required
            />
          </div>

          {/* ETH Amount */}
          <div className="mb-6">
            <label htmlFor="ethAmount" className="block text-lg font-medium mb-2">
              ETH Reward Amount
            </label>
            <input
              type="number"
              id="ethAmount"
              name="ethAmount"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter the ETH amount you're offering as a reward"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <label htmlFor="contact" className="block text-lg font-medium mb-2">
              Contact Information
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email or phone number"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label htmlFor="images" className="block text-lg font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              multiple
              onChange={handleImageUpload}
            />
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Image Previews</label>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleImageRemove(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition duration-300"
          >
            {isLoading ? "Processing..." : "Post Lost Item"}
          </button>

          {/* Error Message */}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </form>
      </div>

      {/* Footer */}
      <Footer />

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            {/* Checkmark Icon */}
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-white mb-4">Form Submitted Successfully!</h2>

            {/* Countdown Message */}
            <p className="text-gray-400">
              Redirecting to Find Lost Items in {countdown} seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostLostItems;