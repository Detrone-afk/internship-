"use client";
import React,{useEffect,useState} from "react";
import Image from "next/image";
import { FaCar, FaShieldAlt, FaWallet, FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const About = () => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FaCar className="text-3xl text-blue-500 dark:text-blue-400" />,
      title: "Wide Range of Vehicles",
      description: "Choose from bikes, sedans, SUVs, and luxury cars for every need and budget."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-500 dark:text-green-400" />,
      title: "Safe Rides",
      description: "Verified drivers, real-time tracking, and emergency features for your safety."
    },
    {
      icon: <FaWallet className="text-3xl text-purple-500 dark:text-purple-400" />,
      title: "Cashless Payments",
      description: "Secure in-app payments with multiple options including cards, UPI, and wallets."
    },
    {
      icon: <FaStar className="text-3xl text-yellow-500 dark:text-yellow-400" />,
      title: "Rated Drivers",
      description: "Only highly-rated drivers with excellent service records."
    },
    {
      icon: <FaClock className="text-3xl text-red-500 dark:text-red-400" />,
      title: "Quick Pickups",
      description: "Average wait time of just 3 minutes in most cities."
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl text-orange-500 dark:text-orange-400" />,
      title: "Live Tracking",
      description: "Real-time tracking of your ride with accurate ETAs."
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <img src="/loading.gif" alt="Loading..." className="h-80 w-80 object-contain" />
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DETRONE</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Revolutionizing urban mobility with safe, affordable, and reliable rides at your fingertips
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transform skew-y-1 -mb-8"></div>
      </div>

      {/* App Showcase */}
      <div className="container mx-auto px-4 py-16 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Founded in 2023, DETRONE began with a simple mission: to make transportation reliable, affordable, and safe
              for everyone. What started as a small team with big dreams has now transformed into one of the fastest-growing
              mobility platforms in the region.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We leverage cutting-edge technology to connect riders with drivers, creating seamless experiences that get you
              where you need to go with just a few taps.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 font-bold">10,000+</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Daily Rides</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                <p className="text-green-600 dark:text-green-400 font-bold">500+</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Verified Drivers</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
                <p className="text-purple-600 dark:text-purple-400 font-bold">4.9★</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-80 flex justify-center bg-gray-100 dark:bg-gray-700">
            <Image
              src="/detrone.png"
              alt="DETRONE"
              fill
              className="object-scale-down p-4"
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Why Choose DETRONE?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
            We're committed to providing the best ride-hailing experience with these standout features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-md dark:hover:shadow-gray-700/50 transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">What Our Riders Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Daily Commuter",
                text: "DETRONE has transformed my daily commute. The drivers are always polite and the rides are super affordable!",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "Business Traveler",
                text: "As a frequent traveler, I rely on DETRONE for punctual airport transfers. Never been late to a flight!",
                rating: 5
              },
              {
                name: "Arjun Mehta",
                role: "Night Shift Worker",
                text: "The safety features give me peace of mind when traveling late at night. Highly recommended!",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm dark:shadow-gray-600/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download DETRONE now and experience the future of urban mobility
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Download on App Store
            </button>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get it on Google Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;