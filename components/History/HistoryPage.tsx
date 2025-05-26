"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

interface Ride {
  id: number;
  pickup: string;
  dropoff: string;
  car: string;
  fare: string;
  date: string;
  status: string;
}

interface Payment {
  id: string;
  amount: string;
  cardName?: string; 
  method?: string;
  status: string;
  date: string;
}

export default function HistoryPage() {
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const safeJsonParse = <T,>(jsonString: string | null): T[] => {
    if (!jsonString) return [];
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("JSON parse error:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      const userRideHistory = safeJsonParse<Ride>(
        localStorage.getItem(`rideHistory_${user.id}`)
      );
      const userPaymentHistory = safeJsonParse<Payment>(
        localStorage.getItem(`paymentHistory_${user.id}`)
      );
      setRideHistory(userRideHistory);
      setPaymentHistory(userPaymentHistory);
    }
  }, [isLoaded, isSignedIn, router, user?.id]);

  const handleSignOut = () => {
    if (user?.id) {
      localStorage.removeItem(`rideHistory_${user.id}`);
      localStorage.removeItem(`paymentHistory_${user.id}`);
    }
    signOut(() => router.push("/"));
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "Unknown date";
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <img src="/loading.gif" alt="Loading..." className="h-80 w-80 object-contain" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="p-2 sm:p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient-to-r from-green-600 to-green-100 dark:text-gray-100">
            Your Ride History
          </h1>
          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Ride History */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Past Rides
          </h2>
          {rideHistory.length > 0 ? (
            <div className="flex flex-col gap-4">
              {rideHistory.map((ride) => (
                <div
                  key={ride.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between transition-colors"
                >
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="font-medium text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                      <span>{ride.pickup}</span>
                      <span className="text-base text-gray-400 dark:text-gray-500">→</span>
                      <span>{ride.dropoff}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(ride.date)}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {ride.car}
                    </div>
                  </div>
                  <div className="flex items-end sm:items-center justify-between sm:flex-col gap-2 mt-3 sm:mt-0 sm:ml-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${
                        ride.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {ride.status}
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 text-lg sm:text-base">
                      {ride.fare}₹
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No ride history found
            </p>
          )}
        </section>

        {/* Payment History */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Payment History
          </h2>
          {paymentHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex flex-col justify-between transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Payment #{payment.id.slice(-6)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(payment.date)}
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${
                        payment.status === "completed"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {payment.status}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-xs font-medium flex-1 text-right mr-3">
                      {payment.method || "Card"} • {payment.cardName || "Visa"}
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400 text-lg">
                      {payment.amount}₹
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No payment history found
            </p>
          )}
        </section>
      </div>
    </div>
  );
}