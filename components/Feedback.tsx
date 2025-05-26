"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaCheck, FaLock } from "react-icons/fa";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("🚀 Feedback Submitted Successfully!", {
        position: "top-center",
        theme: "colored",
      });
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Thoughts</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Help us improve your DETRONE experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-gray-700/50 p-8 max-w-4xl mx-auto">
          <ToastContainer />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            <FaPaperPlane className="inline mr-2 text-blue-500 dark:text-blue-400" />
            Send Us Feedback
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">
            <div className="relative">
              <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
                <FaUser className="inline mr-2 text-blue-500 dark:text-blue-400" />
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
                <FaEnvelope className="inline mr-2 text-blue-500 dark:text-blue-400" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">
                <FaComment className="inline mr-2 text-blue-500 dark:text-blue-400" />
                Your Feedback
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="What can we improve? What do you love? Share your thoughts..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <FaPaperPlane className="inline mr-2" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Box 1 */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 dark:bg-blue-800/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <FaLock className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">End-to-End Encrypted</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  Your feedback is securely transmitted and stored with military-grade encryption
                </p>
              </div>
              
              {/* Box 2 */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800/50">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 dark:bg-purple-800/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <FaCheck className="text-purple-600 dark:text-purple-400 text-xl" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Direct Impact</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  Your suggestions directly influence our product development roadmap
                </p>
              </div>
            </div>
            
            {/* Box 3 */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800/50">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 dark:bg-green-800/30 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <FaComment className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">Quick Responses</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 ml-16">
                  Our team reviews all feedback and responds within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 mb-2">
            © 2025 DETRONE. All Rights Reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Developed by Anupam Anand
          </p>
        </div>
      </div>
    </div>
  );
}