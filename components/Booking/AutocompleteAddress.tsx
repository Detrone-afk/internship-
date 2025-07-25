"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

const locations = [
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
];

const destinations = [
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhopal",
];

function AutocompleteAddress({ onConfirm }: { onConfirm: () => void }) {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmSelection = () => {
    if (!location || !destination) {
      toast.error("⚠️ Please select both Location and Destination!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('pickup', location);
    localStorage.setItem('dropoff', destination);

    setError("");
    toast.success(`🚗 Booking from ${location} to ${destination}!`, {
      position: "top-center",
      theme: "colored",
    });

    setConfirmed(true);
    onConfirm();
  };

  return (
    <div className="mt-5">
      <div className="mb-3">
        <label className="text-green-500 font-semibold flex items-center gap-2 text-lg">
          <span className="bg-orange-100 p-1 rounded-full">
            <FaMapMarkerAlt className="text-orange-500 animate-pulse" />
          </span>
          Choose Location
        </label>        
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-white dark:bg-black dark:text-white p-2 border-[1px] w-full rounded-md outline-none focus:border-blue-500"
          required
        >
          <option value="">Select your location *</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-green-500 font-semibold flex items-center gap-2 text-lg">
          <FaLocationArrow className="text-orange-400 animate-pulse" />
          Choose Destination
        </label>        
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-white dark:bg-black dark:text-white p-2 border-[1px] w-full rounded-md outline-none focus:border-blue-500"
          required
        >
          <option value="">Select your destination *</option>
          {destinations.map((dest, index) => (
            <option key={index} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

      {!confirmed && (
        <button
          onClick={handleConfirmSelection}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Confirm Selection
        </button>
      )}
    </div>
  );
}

export default AutocompleteAddress;