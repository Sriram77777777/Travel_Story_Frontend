import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../../assets/images/Background_Login2.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.accessToken); // Save the token
        alert("Login Successful!");
        navigate("/user-home"); // Redirect to User Home Page
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col lg:flex-row bg-white bg-opacity-90 rounded-lg shadow-lg w-11/12 max-w-4xl">


        {/* Left Panel */}
        <div
          className="lg:w-1/2 p-6 flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "60vh",
          }}
        >
          <div className="absolute text-center text-white px-6 py-12">
            <h1 className="text-4xl font-bold mb-4">Capture Your Journeys</h1>
            <p className="text-lg">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>



        {/* Right Panel */}
        <div className="lg:w-1/2 p-6 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 text-white rounded-md focus:outline-none ${
                  loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account? {" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;