import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FindLostItems from "./pages/FindLostItems";
import PostLostItems from "./pages/PostLostItems";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound"; // Optional: Add a 404 page
import "./styles/global.css";


const App = () => {
  return (
    <Routes>
      {/* Default Route: Loads DashboardPage first */}
      <Route path="/" element={<DashboardPage />} />

      {/* Other Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/find-lost-items" element={<FindLostItems />} />
      <Route path="/post-lost-items" element={<PostLostItems />} />

      {/* Optional: 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;