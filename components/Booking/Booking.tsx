"use client";
import React, { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";

function Booking() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState(false); // ✅ Track if selection is confirmed
  const [isBooking, setIsBooking] = useState(false); // ✅ Track if booking is in progress
  const router = useRouter();

  useEffect(() => {
    toast.info("🦄 Welcome To DETRONE 🚗 !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }, []);

  // ✅ Handle Booking
  const handleBooking = () => {
    toast.success("Redirecting to Payment...", {
      position: "top-center",
      theme: "colored",
    });

    setIsBooking(true); // ✅ Change button text to "Booking..."

    setTimeout(() => {
      router.push("/payment"); // ✅ Redirect to payment
    }, 2000);
  };

  return (
    <div className="p-5">
      <ToastContainer />
      <h2 className="text-[20px] font-semibold">Booking</h2>

      {/* Adjust height dynamically based on showOptions */}
      <div
        className={`border-[1px] p-5 rounded-md transition-all duration-300 overflow-hidden`}
        style={{ height: showOptions ? "auto" : "250px" }}
      >
        <AutocompleteAddress onConfirm={() => setConfirmed(true)} /> {/* ✅ Pass function */}

        {/* Button to show available rides */}
        <button
          className="p-3 bg-orange-500 w-full mt-5 text-white rounded-lg"
          onClick={() => setShowOptions(true)}
        >
          Find Rides
        </button>

        {/* Conditionally render Cars and Cards components */}
        {showOptions && confirmed && ( // ✅ Show only when selection is confirmed
          <>
            <Cars />
            <Cards />
            <button
              className={`text-white w-full p-1 rounded-md mt-4 ${
                isBooking ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleBooking}
              disabled={isBooking} // ✅ Disable button while booking
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Booking;
