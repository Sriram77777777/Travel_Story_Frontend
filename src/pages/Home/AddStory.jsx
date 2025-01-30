import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/image-upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch {
      setError("An error occurred while uploading the image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title || !story || !visitedLocation || !visitedDate) {
      setError("All fields are required except image URL.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/add-travel-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          story,
          visitedLocation,
          imageUrl,
          visitedDate: new Date(visitedDate).getTime(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/user-home");
      } else {
        setError(data.message || "Failed to add story");
      }
    } catch {
      setError("An error occurred while adding the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('http://localhost:8000/uploads/1738129413599.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 sm:p-12 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Travel Story
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
            
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title"
              className="mt-1 w-full px-4 py-2  border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="story" className="block text-sm font-medium text-gray-700">
              Story
            </label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share your travel story"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="5"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="visitedLocation" className="block text-sm font-medium text-gray-700">
              Visited Location
            </label>
            <input
              type="text"
              id="visitedLocation"
              value={visitedLocation}
              onChange={(e) => setVisitedLocation(e.target.value)}
              placeholder="Enter the location you visited"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          {imageUrl && (
            <div className="mb-4">
              <p className="text-sm text-gray-700">Uploaded Image Preview:</p>
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="visitedDate" className="block text-sm font-medium text-gray-700">
              Visited Date
            </label>
            <input
              type="date"
              id="visitedDate"
              value={visitedDate}
              onChange={(e) => setVisitedDate(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-medium rounded-lg transition ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Adding..." : "Add Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStory;
