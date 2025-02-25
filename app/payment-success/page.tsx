"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5 text-center">
      {/* ✅ GIF Instead of Image (Fix: Added width & height) */}
      <Image
        src="/success.gif"
        alt="Payment Success"
        width={350}  // ✅ Required in Next.js
        height={350} // ✅ Required in Next.js
        className="object-contain"
      />

      {/* ✅ Payment Done Message */}
      <h1 className="text-3xl font-bold text-green-600 mt-5">✅ Payment Done!</h1>
      <p className="text-gray-700 mt-2">Thank you for your payment. Your transaction was successful.</p>

      {/* ✅ Return to Home Button */}
      <button
        onClick={() => router.push("/")} // ✅ Redirects to Home Page
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
      >
        Return to Home
      </button>
    </div>
  );
}
