"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background GIF (full screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/money.gif" // Your background GIF path
          alt="Background Animation"
          fill // Makes it full-screen
          className="object-cover" // Ensures it covers the whole area
          quality={100}
          unoptimized={true} // For GIF optimization
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content (positioned above background) */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 text-center">
        {/* Success GIF */}
        <Image
          src="/success.gif"
          alt="Payment Success"
          width={350}
          height={350}
          className="object-contain"
        />

        {/* Payment Done Message */}
        <h1 className="text-3xl font-bold text-white mt-5 drop-shadow-lg">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-100 mt-2 text-lg drop-shadow-md">
          Thank you for your payment. Your transaction was successful.
        </p>

        {/* Return to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg transition-all duration-300 hover:scale-105"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}