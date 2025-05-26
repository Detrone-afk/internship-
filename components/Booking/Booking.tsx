"use client";
import React, { useState, useEffect } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AutocompleteAddress from "./AutocompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import { useUser } from "@clerk/nextjs";

function Booking() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    // Clear previous booking data
    localStorage.removeItem('pickup');
    localStorage.removeItem('dropoff');
    localStorage.removeItem('selectedCar');
    localStorage.removeItem('fare');

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

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const saveRideToHistory = () => {
    if (!user?.id) return;

    const pickup = localStorage.getItem('pickup');
    const dropoff = localStorage.getItem('dropoff');
    const car = localStorage.getItem('selectedCar');
    const fare = localStorage.getItem('fare');

    if (!pickup || !dropoff || !car || !fare) {
      console.error('Missing booking data');
      return;
    }

    const rideData = {
      id: Date.now(),
      userId: user.id,
      pickup,
      dropoff,
      car,
      fare,
      date: new Date().toISOString(),
      status: 'completed'
    };

    const history = JSON.parse(localStorage.getItem(`rideHistory_${user.id}`) || '[]');
    localStorage.setItem(`rideHistory_${user.id}`, JSON.stringify([...history, rideData]));
  };

  const handleBooking = () => {
    saveRideToHistory();
    
    toast.success("Redirecting to Payment...", {
      position: "top-center",
      theme: "colored",
    });
    setIsBooking(true);
    setTimeout(() => {
      router.push("/payment");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <img src="/loading.gif" alt="Loading..." className="h-80 w-80 object-contain" />
      </div>
    );
  }

  return (
    <div className="relative p-5">
      <ToastContainer />
      
      <button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed top-4 mt-2 left-4 z-50 p-2 text-orange-500 rounded-md bg-white shadow-lg hover:bg-orange-500 hover:text-white dark:bg-orange-500 dark:text-white dark:hover:bg-white dark:hover:text-orange-500"
      >
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-3 w-3 bg-green-500 text-white text-xs font-bold rounded-full z-50 border-2 border-white"></span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="6" width="16" height="2" rx="1" />
          <rect x="4" y="11" width="16" height="2" rx="1" />
          <rect x="4" y="16" width="16" height="2" rx="1" />
        </svg>
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Booking
      </h2>
      
      <div
        className={`border-[1px] p-5 rounded-md transition-all duration-300 overflow-hidden`}
        style={{ height: showOptions ? "auto" : "250px" }}
      >
        <AutocompleteAddress onConfirm={() => setConfirmed(true)} />

        <button
          className="p-3 bg-green-500 w-full mt-5 text-white rounded-lg hover:bg-green-600 hover:text-white"
          onClick={() => setShowOptions(true)}
        >
          Find Rides
        </button>

        {showOptions && confirmed && (
          <>
            <Cars />
            <Cards />
            <button
              className={`text-white w-full p-1 rounded-md mt-4 ${
                isBooking ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleBooking}
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Book Now"}
            </button>
          </>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-3/4 bg-[#131F4B] z-40 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          showDashboard ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-hidden">
          <Dashboard />
        </div>
      </div>

      {showDashboard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
}

export default Booking;