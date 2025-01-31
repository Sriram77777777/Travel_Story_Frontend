import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const EditStory = () => {
  const { state } = useLocation(); // Access the story data passed via navigate
  const navigate = useNavigate();
  const { id } = useParams(); // Get the story ID from the URL

  const [title, setTitle] = useState(state?.story?.title || "");
  const [story, setStory] = useState(state?.story?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(state?.story?.visitedLocation || "");
  const [imageUrl, setImageUrl] = useState(state?.story?.imageUrl || "");
  const [visitedDate, setVisitedDate] = useState(
    state?.story?.visitedDate
      ? new Date(state.story.visitedDate).toISOString().split("T")[0]
      : ""
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const payload = {
        title,
        story,
        visitedlocation: visitedLocation,
        imageUrl,
        visitedDate: new Date(visitedDate).getTime(),
      };

      const response = await fetch(`http://localhost:8000/edit-story/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/user-home"); // Redirect after saving
      } else {
        setError(data.message || "Failed to update story.");
      }
    } catch {
      setError("An error occurred while updating the story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
      style={{
        backgroundImage: `url('http://localhost:8000/uploads/1738129413599.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 sm:p-12 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Travel Story
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
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
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL (Don't Change)
            </label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
              disabled
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-4 max-h-40 rounded-lg border"
              />
            )}
          </div>
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
            {loading ? "Updating..." : "Update Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStory;
