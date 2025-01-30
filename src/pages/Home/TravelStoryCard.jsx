import React from "react";
import { useNavigate } from "react-router-dom";

const TravelStoryCard = ({ story, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // Handle card click to navigate to the detailed story page
  const handleCardClick = () => {
    navigate(`/view-story/${story._id}`, { state: { story } });
  };

  // Handle View button click
  const handleViewClick = (e) => {
    e.stopPropagation(); // Prevent the card's click event from firing
    navigate(`/view-story/${story._id}`, { state: { story } });
  };

  return (
    <div
      className="max-w-sm mx-auto bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick} // Make the card clickable
    >
      <div className="relative">
        <img
          src={story.imageUrl || "http://localhost:8000/assets/placeholder.webp"}
          alt={story.title}
          className="w-full h-60 object-cover rounded-t-lg shadow-md"
        />
        <div className="absolute bottom-4 left-4 text-white bg-opacity-50 px-4 py-2 rounded-md">
          <h2 className="text-2xl font-bold">{story.title}</h2>
        </div>
      </div>
      <div className="p-6 space-y-4 bg-white rounded-b-lg shadow-md">
        <p className="text-gray-700 text-lg">{story.story}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onEdit(story);
            }}
            className="px-4 py-2 font-mono bg-red-400 text-white font-semibold  hover:bg-red-800 hover:scale-105 transition-transform duration-200"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onDelete();
            }}
            className="px-2 py-2 font-mono bg-blue-400 text-white font-semibold  hover:bg-blue-800 hover:scale-105 transition-transform duration-200"
          >
            Delete
          </button>
        </div>
        {/* Add a View button */}
        <div className="flex justify-center mt-4">
          {/* <button
            onClick={handleViewClick}
            className="px-2 py-2 bg-green-400 text-white font-semibold rounded-lg hover:bg-gray-800 hover:scale-105 transition-transform duration-200"
          >
            View Story
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;