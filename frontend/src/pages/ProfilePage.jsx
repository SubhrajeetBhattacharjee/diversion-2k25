import React, { useState } from "react";
import Topbar from "../components/Topbar"; // Import the Topbar
import Footer from "../components/Footer"; // Import the Footer
import { Twitter, Linkedin, Github, Instagram, Facebook } from "lucide-react"; // Social media icons

const ProfilePage = () => {
  // Mock user data (replace with actual data from backend)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "I love exploring new technologies and building cool stuff!",
    location: "New York, USA",
    social: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "", // Added GitHub
      instagram: "", // Added Instagram
      facebook: "", // Added Facebook
    },
    pfp: "https://via.placeholder.com/150", // Profile picture
    banner: "https://via.placeholder.com/800x200", // Banner image
  });

  const [editMode, setEditMode] = useState(false); // Toggle edit mode
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [twitter, setTwitter] = useState(user.social.twitter);
  const [linkedin, setLinkedin] = useState(user.social.linkedin);
  const [github, setGithub] = useState(user.social.github); // GitHub state
  const [instagram, setInstagram] = useState(user.social.instagram); // Instagram state
  const [facebook, setFacebook] = useState(user.social.facebook); // Facebook state

  // Handle save changes
  const handleSaveChanges = () => {
    setUser({
      ...user,
      name,
      bio,
      location,
      social: { twitter, linkedin, github, instagram, facebook },
    });
    setEditMode(false);
    console.log("Changes saved:", {
      name,
      bio,
      location,
      twitter,
      linkedin,
      github,
      instagram,
      facebook,
    });
  };

  // Mock achievements
  const achievements = [
    { id: 1, title: "First Post", description: "Posted your first lost item.", completed: true, stars: 3, credits: 15 },
    { id: 2, title: "Helper", description: "Helped find 5 lost items.", completed: true, stars: 2, credits: 10 },
    { id: 3, title: "Community Star", description: "Received 10 upvotes on your posts.", completed: false, stars: 1, credits: 5 },
    { id: 4, title: "Explorer", description: "Visited 10 different locations.", completed: true, stars: 3, credits: 20 },
    { id: 5, title: "Master Finder", description: "Found 20 lost items.", completed: false, stars: 1, credits: 5 },
    { id: 6, title: "Top Contributor", description: "Top contributor of the month.", completed: true, stars: 3, credits: 25 },
    { id: 7, title: "Active User", description: "Active for 30 days.", completed: true, stars: 2, credits: 15 },
    { id: 8, title: "Social Butterfly", description: "Connected with 10 users.", completed: false, stars: 1, credits: 5 },
    { id: 9, title: "Early Bird", description: "Posted an item before 8 AM.", completed: true, stars: 2, credits: 10 },
    { id: 10, title: "Night Owl", description: "Posted an item after 10 PM.", completed: true, stars: 1, credits: 5 },
  ];

  // Mock trophies
  const trophies = [
    { id: 1, title: "Gold Trophy", icon: "🏆", description: "Top contributor of the year." },
    { id: 2, title: "Silver Trophy", icon: "🏆", description: "Found 50 lost items." },
    { id: 3, title: "Bronze Trophy", icon: "🏆", description: "Active for 100 days." },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-8">
        {/* Banner */}
        <div className="relative h-48 w-full">
          <img
            src={user.banner}
            alt="Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <label
            htmlFor="banner-upload"
            className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            Change Banner
            <input
              type="file"
              id="banner-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUser({ ...user, banner: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>

        {/* Profile Picture and Info */}
        <div className="flex flex-col items-center -mt-20">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={user.pfp}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-gray-800"
            />
            <label
              htmlFor="pfp-upload"
              className="absolute bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-gray-700 transition duration-300"
            >
              ✏️
              <input
                type="file"
                id="pfp-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUser({ ...user, pfp: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>

          {/* Name and Bio */}
          <div className="text-center mt-4">
            {editMode ? (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your name"
                  required
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your bio"
                  rows="4"
                  required
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your location"
                  required
                />
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your Twitter link"
                />
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your LinkedIn link"
                />
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your GitHub link"
                />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your Instagram link"
                />
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your Facebook link"
                />
                <button
                  onClick={handleSaveChanges}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-400 mt-2">{user.bio}</p>
                <p className="text-gray-400 mt-2">{user.location}</p>
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mt-4">
                  {user.social.twitter && (
                    <a
                      href={user.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition duration-300"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {user.social.linkedin && (
                    <a
                      href={user.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition duration-300"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {user.social.github && (
                    <a
                      href={user.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition duration-300"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {user.social.instagram && (
                    <a
                      href={user.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition duration-300"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {user.social.facebook && (
                    <a
                      href={user.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-400 transition duration-300"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-600 transition duration-300"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>

        {/* Trophies Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Trophies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trophies.map((trophy) => (
              <div
                key={trophy.id}
                className="bg-gray-800 p-6 rounded-lg text-center"
              >
                <span className="text-4xl">{trophy.icon}</span>
                <h3 className="text-xl font-bold mt-4">{trophy.title}</h3>
                <p className="text-gray-400 mt-2">{trophy.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-gray-800 p-6 rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <p className="text-gray-400">{achievement.description}</p>
                  <p className="text-gray-400 mt-2">
                    Credits: {achievement.credits}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-2xl ${
                        index < achievement.stars
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;