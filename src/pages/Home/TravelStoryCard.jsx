import React from "react";
import { useNavigate } from "react-router-dom";

const TravelStoryCard = ({ story, onEdit, onDelete }) => {
  const navigate = useNavigate();

  // Handle card click to navigate to the detailed story page
  const handleCardClick = () => {
    navigate(`/view-story/${story._id}`, { state: { story } });
  };

  return (
    <div
      className="w-80 h-[450px] bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick} // Make the card clickable
    >
      <div className="relative w-full h-[250px]">
        <img
          src={story.imageUrl || "http://localhost:8000/assets/placeholder.webp"}
          alt={story.title}
          className="w-full h-full object-cover rounded-t-lg shadow-md"
        />
        <div className="absolute bottom-4 left-4 text-white bg-opacity-50 px-4 py-2 rounded-md">
          <h2 className="text-xl font-bold">{story.title}</h2>
        </div>
      </div>
      <div className="p-4 space-y-2 bg-white rounded-b-lg shadow-md h-[200px] flex flex-col justify-between">
        <p className="text-gray-700 text-sm line-clamp-3">{story.story}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(story);
            }}
            className="px-4 py-2 bg-red-400 text-black font-semibold rounded-md hover:bg-red-800 hover:scale-105 transition-transform duration-200"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;
