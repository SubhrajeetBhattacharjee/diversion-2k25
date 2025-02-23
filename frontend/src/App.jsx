import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import FindLostItems from "./pages/FindLostItems";
import PostLostItems from "./pages/PostLostItems";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import "./styles/global.css";

const App = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/find-lost-items" element={<FindLostItems />} />
        <Route path="/post-lost-items" element={<PostLostItems />} />
      </Route>

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;