"use client";
import React from "react";
import FeedbackPage from "@/components/Feedback"; // ✅ Import Feedback Form

export default function Feedback() {
  return (
    <div 
      className="min-h-screen bg-gray-100 p-5 flex justify-center items-center"
      style={{
        backgroundImage: "url('/feedback.jpg')", // ✅ Background Image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-3">
          DETRONE 📢 Feedback
        </h1>

        {/* ✅ Feedback Form Appears Here */}
        <FeedbackPage />
      </div>
    </div>
  );
}
