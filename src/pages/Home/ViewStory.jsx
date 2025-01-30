import React from "react";
import { useLocation } from "react-router-dom";

const ViewStory = () => {
  const location = useLocation(); // Retrieve the story data passed via navigate
  const { state } = location;

  // If there is no story or connection failed
  if (!state?.story) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Story Not Found</h2>
          <p className="text-lg text-gray-600">
            The story you're looking for isn't available. Please check the URL or try again later.
          </p>
        </div>
      </div>
    );
  }

  const { story } = state; 

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Story Header */}
        <div className="relative">
          <img
            src={story.imageUrl || "http://localhost:8000/assets/placeholder.webp"}
            alt={story.title}
            className="w-full h-96 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-2  bg-opacity-50 text-white p-4 w-full text-left">
            <h1 className="text-3xl font-semibold">{story.title}</h1>
          </div>
        </div>

        {/* Story Content */}
        <div className="p-8 space-y-6">
          <p className="text-lg text-gray-800 leading-relaxed">{story.story}</p>

          <div className="flex justify-center mt-6">
            <a
              href="/user-home"
              className="px-3 py-2 font-mono  bg-black text-white font-semibold  hover:bg-black hover:scale-105 transition-colors"
            >
              Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
