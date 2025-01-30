import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelStoryCard from "./TravelStoryCard";
import { FaBars as Menu, FaPlusCircle, FaUser, FaSignOutAlt } from "react-icons/fa";

const UserHome = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  // Used to get users travel stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/get-all-stories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStories(data.stories || []);
        } else {
          setError(data.message || "Failed to fetch stories");
        }
      } catch (err) {
        setError("An error occurred while fetching stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Add a new story
  const handleAddStory = () => {
    closeMenu();
    navigate("/add-story");
  };

  // Edit a story
  const handleEditStory = (story) => {
    closeMenu();
    navigate(`/edit-story/${story._id}`, { state: { story } });
  };

  // Delete a story
  const handleDeleteStory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/delete-story/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStories(stories.filter((story) => story._id !== id)); // Remove the story from the backend
      } else {
        setError("Failed to delete story");
      }
    } catch (err) {
      setError("An error occurred while deleting the story");
    }
  };

  // Need to complete profile
  const handleProfile = () => {
    closeMenu();
    navigate("/profile");
  };

  // Logout
  const handleLogout = () => {
    closeMenu();
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Toggle sidebar visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Close sidebar when clicking outside or on a link
  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('http://localhost:8000/uploads/1738127043962.jpg')" }}
    >
      {/* Menu Button */}
      <button
        className="absolute top-4 left-4 p-2 rounded-full text-black shadow-lg z-50"
        onClick={toggleMenu}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {menuVisible && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50 ${
          menuVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "256px" }}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Travel Story</h1>
        <button
          className="w-full px-4 py-2 font-medium rounded-lg shadow-lg hover:bg-gray-100 hover:scale-120 transition duration-300 flex items-center justify-center"
          onClick={handleAddStory}
        >
          <FaPlusCircle className="mr-2" /> Add New Story
        </button>
        <button
          className="w-full px-4 py-2 font-medium rounded-lg shadow-lg hover:bg-gray-100 hover:scale-120 transition duration-300 flex items-center justify-center"
          onClick={handleProfile}
        >
          <FaUser className="mr-2" /> Profile
        </button>
        <button
          className="w-full px-4 py-2 font-medium rounded-lg shadow-lg hover:bg-gray-100 hover:scale-120 transition duration-300 flex items-center justify-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className={`p-6 sm:p-12 transition-all duration-300 ${menuVisible ? "ml-64" : "ml-0"}`}>
        <h1 className="text-4xl font-light font-serif text-black text-center mb-8">Your Amazing Travel Stories</h1>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {stories.length === 0 ? (
          // Message when no stories exist
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-1xl font-lightrounded-lg shadow-lg hover:bg-gray-100 hover:scale-120 transition duration-300">
            <p>Add Your Memorable Journey's</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Travel story cards */}
            {stories.map((story) => (
              <TravelStoryCard
                key={story._id}
                story={story}
                onEdit={() => handleEditStory(story)}
                onDelete={() => handleDeleteStory(story._id)}
                showImage={story?.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
