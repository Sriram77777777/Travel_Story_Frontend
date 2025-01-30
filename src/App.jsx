import {BrowserRouter as Router,Routes,Route,Navigate,} from "react-router-dom";
import React from "react";

import AddStory from "./pages/Home/Addstory";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import UserHome from "./pages/Home/UserHome"; 
import Profile from "./pages/Profile/Profile"; 
import EditStory from "./pages/Home/EditStory"; 
import ViewStory from "./pages/Home/ViewStory";

//Login Check
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-story/:id" element={<ViewStory />} />

        <Route
          path="/add-story"
          element={
            <ProtectedRoute>
              <AddStory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-story/:id"
          element={
            <ProtectedRoute>
              <EditStory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;