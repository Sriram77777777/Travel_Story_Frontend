import React from "react";
import { Link, useNavigate } from "react-router-dom";
import travelStoryImage from "../../assets/images/Background_Login2.jpg";

const Home = () => {
  const navigate = useNavigate();

  const HandleLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="bg-light bg-green-100 h-screen flex">
      
      

      
      <div className="flex-grow flex items-center justify-center">
        <div className="relative w-[90%] md:w-[80%] h-[80%] bg-white rounded-3xl shadow-lg overflow-hidden">
         
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-start px-8 md:px-24 text-white"
            style={{ backgroundImage: `url(${travelStoryImage})` }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white hover:scale-105 transition-transform duration-100">
              Welcome to Travel Story
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-gray-200 hover:scale-105 transition-transform duration-100">
              A place where you can share your travel experiences
            </p>
            <div className="space-x-4">
              <button
                onClick={HandleLogin}
                className="px-6 py-3 bg-white text-black font-semibold hover:scale-120 rounded-lg shadow-md hover:bg-gray-100"
              >
                Login
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
