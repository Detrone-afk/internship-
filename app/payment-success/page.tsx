"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function PaymentSuccess() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    const paymentData = {
      id: `pay_${Date.now()}`,
      userId: user.id,
      amount: localStorage.getItem('fare') || '0',
      dropoff: localStorage.getItem('dropoff') || 'Unknown',
      method: 'Card',
      status: 'completed',
      date: new Date().toISOString()
    };

    const payments = JSON.parse(localStorage.getItem(`paymentHistory_${user.id}`) || '[]');
    localStorage.setItem(`paymentHistory_${user.id}`, JSON.stringify([...payments, paymentData]));
  }, [user?.id]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background GIF (full screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/money.gif"
          alt="Background Animation"
          fill
          className="object-cover"
          quality={100}
          unoptimized={true}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 text-center">
        <Image
          src="/success.gif"
          alt="Payment Success"
          width={350}
          height={350}
          className="object-contain"
        />

        <h1 className="text-3xl font-bold text-white mt-5 drop-shadow-lg">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-100 mt-2 text-lg drop-shadow-md">
          Thank you for your payment. Your transaction was successful.
        </p>

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