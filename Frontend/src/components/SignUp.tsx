// src/components/Signup.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = "a281600e92e14dc6a0e08c8663345d92"; // Replace with your API key
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );

          // @ts-expect-error data
          const locationData = response.data.results[0].components;
          const city = locationData.city || locationData.town;
          const country = locationData.country;
          setLocation(`${city}, ${country}`);
        } catch (err) {
          setError("Failed to fetch location details.");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location.");
        console.log(err);
        setIsFetchingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        name,
        email,
        password,
        phone,
        location,
      });

      if (response.status === 201 || response.status === 200) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center blur-sm brightness-75 z-0" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        {error && (
          <p className="p-2 text-center text-red-600 bg-red-100 rounded-md">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              disabled={isFetchingLocation}
            />
            {isFetchingLocation && (
              <p className="text-sm text-gray-500">Fetching location...</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Signup
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
