import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = "";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await fetch("http://localhost:8000/get-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.message || "Failed to fetch user details");
        }
      } catch (err) {
        setError("An error occurred while fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);


  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="fixed top-0 left-0 h-full w-80 bg-gray-100 shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-500 overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300 text-3xl flex items-center justify-center h-full">
                👤
              </span>
            )}
          </div>
        </div>
        <br></br>

        <div className="text-center">
        {/* Username with Icon */}
        <h2 className="text-gray-600 text-left font-bold hover:scale-110 flex items-center justify-center space-x-2">
          <FaUser className="text-lg" />
          <span>Username: {user?.fullName}</span>
        </h2>

        {/* Email with Icon */}
        <p className="text-gray-600 font-bold hover:scale-110 flex items-center justify-center space-x-2">
          <FaEnvelope className="text-lg" />
          <span>Email: {user?.email}</span>
        </p>
      </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/user-home")}
          className="mt-auto w-full py-2 font-mono bg-gray-200 text-black hover:bg-gray-400 hover:scale-110 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
