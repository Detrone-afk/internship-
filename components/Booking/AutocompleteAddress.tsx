"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [confirmed, setConfirmed] = useState(false); // ✅ Track if selection is confirmed

  const handleConfirmSelection = () => {
    if (!location || !destination) {
      toast.error("⚠️ Please select both Location and Destination!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    setError(""); // ✅ Clear error if both are selected
    toast.success(`🚗 Booking from ${location} to ${destination}!`, {
      position: "top-center",
      theme: "colored",
    });

    setConfirmed(true); // ✅ Make the button disappear
    onConfirm(); // ✅ Notify `Booking.tsx` to show next options
  };

  return (
    <div className="mt-5">
      {/* Location Field */}
      <div className="mb-3">
        <label className="text-orange-500 font-semibold">Your Location</label>
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

      {/* Destination Field */}
      <div>
        <label className="text-orange-500 font-semibold">Your Destination</label>
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

      {/* Error Message */}
      {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

      {/* Button: Vanishes after clicking */}
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
