"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaInfoCircle, FaHistory, FaCommentAlt } from "react-icons/fa";
import {
  FaCar,
  FaDesktop,
  FaBell,
  FaWrench,
  FaEnvelopeOpenText,
  FaSignOutAlt,
  FaDownload,
  FaEye,
  FaCamera,
  FaSave,
  FaTimes,
  FaGlobe,
  FaUsers
} from "react-icons/fa";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AdminUsers from "@/components/AdminUsers";

type DashboardView = 'dashboard' | 'messages';

const stats = [
  { icon: <FaGlobe size={26} />, label: "Locations", value: 138, color: "bg-yellow-400" },
  { icon: <FaUsers size={26} />, label: "Employees", value: 50, color: "bg-blue-700 text-white" },
  { icon: <FaCar size={26} />, label: "Riders Feet", value: 100, color: "bg-green-600 text-white" },
];

const preferredLocations = [
  { title: "New Delhi", company: "India Gate", time: "20mins ago" },
  { title: "Kolkata", company: "Gol Market", time: "10mins ago" },
  { title: "Mumbai", company: "Marine Drive", time: "5mins ago" },
];

const employees = [
  { name: "----", role: "----" },
  { name: "----", role: "----" },
  { name: "----", role: "----" },
];

const candidates = [
  { name: "Chennai Route", role: "", score: 80 },
  { name: "Pune Route", role: "", score: 30 },
  { name: "Gurgaon Route", role: "", score: 65 },
];

const locationTraffic = [
  { name: "New Delhi", salary: "High Traffic", status: "Peak", color: "bg-green-500" },
  { name: "Mumbai", salary: "Medium Traffic", status: "Moderate", color: "bg-yellow-400" },
  { name: "Bangalore", salary: "High Traffic", status: "Peak", color: "bg-green-500" },
];

function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState(user?.firstName || '');
  const [tempLastName, setTempLastName] = useState(user?.lastName || '');
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push('/sign-in');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      await user.update({
        firstName: tempFirstName,
        lastName: tempLastName,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempFirstName(user?.firstName || '');
    setTempLastName(user?.lastName || '');
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      try {
        await user.setProfileImage({ file });
        toast.success("Profile photo updated!");
      } catch (err) {
        toast.error("Error updating photo");
        console.error(err);
      }
    }
  };

  const dashboardNavLinks = [
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/feedback", label: "Feedback" },
   ];

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-gray-900 flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed z-30 md:static
          bg-[#131F4B] dark:bg-gray-800
          flex flex-col justify-between py-4 px-2
          w-4/5 max-w-xs md:w-56
          h-screen
          transition-all duration-300
          ${sidebarOpen ? "left-0" : "-left-full"} md:left-0
        `}
        style={{ top: 0 }}
      >
        <div>
          <div className="flex items-center space-x-2 mb-5">
            <div className="relative">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }} 
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
                  <FaCamera size={12} />
                  <input 
                    id="profile-photo-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoUpload}
                  />
                </label>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    value={tempFirstName}
                    onChange={(e) => setTempFirstName(e.target.value)}
                    className="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700 text-sm"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={tempLastName}
                    onChange={(e) => setTempLastName(e.target.value)}
                    className="w-full p-1 rounded text-black dark:text-white bg-white dark:bg-gray-700 text-sm"
                    placeholder="Last name"
                  />
                </div>
              ) : (
                <>
                  <div className="font-semibold text-white dark:text-gray-100 text-base">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-sm text-gray-300 dark:text-gray-400 break-all">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Edit profile buttons */}
          {isEditing ? (
            <div className="flex space-x-2 mb-4">
              <button 
                onClick={handleSaveProfile}
                className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-sm px-2 py-1 rounded"
              >
                <FaSave size={12} /> Save
              </button>
              <button 
                onClick={handleCancelEdit}
                className="flex items-center justify-center gap-1 bg-gray-500 hover:bg-gray-600 text-white text-sm px-2 py-1 rounded"
              >
                <FaTimes size={12} /> Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className={`flex items-center px-3 py-2 ${
                currentView === 'dashboard' 
                  ? 'bg-yellow-400 text-[#131F4B]' 
                  : 'text-gray-100 dark:text-gray-200 hover:bg-[#182962] dark:hover:bg-gray-900'
              } font-semibold rounded mb-1 text-base`}
            >
              <span className="mr-2">
                <svg className="inline" width={16} height={16}>
                  <rect width='16' height='16' fill='none'/>
                  <rect x='2' y='4' width='12' height='2' rx='1' fill='currentColor'/>
                  <rect x='2' y='8' width='12' height='2' rx='1' fill='currentColor'/>
                  <rect x='2' y='12' width='12' height='2' rx='1' fill='currentColor'/>
                </svg>
              </span>
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('messages')}
              className={`flex items-center gap-2 px-3 py-1.5 ${
                currentView === 'messages' 
                  ? 'bg-yellow-400 text-[#131F4B]' 
                  : 'text-gray-100 dark:text-gray-200 hover:bg-[#182962] dark:hover:bg-gray-900'
              } rounded text-base`}
            >
              <FaEnvelopeOpenText />
              Admin Panel
              <span className="ml-auto bg-red-500 text-sm rounded-full px-1"></span>
            </button>
            
            <div className="mt-3 text-gray-400 dark:text-gray-300 text-xs px-3 mb-1">Developer</div>
            <button 
              onClick={() => window.location.href = ""}
              className="flex items-center gap-2 px-3 py-1.5 text-gray-100 dark:text-gray-200 hover:bg-[#182962] dark:hover:bg-gray-900 rounded text-base"
            >
              <FaDesktop /><a href="https://www.linkedin.com/in/anupam-anand05/">Anupam Anand</a>
            </button>
            {/* Navigation Links */}
           <div className="mt-3 text-gray-400 dark:text-gray-300 text-xs px-3 mb-1">Quick Links</div>
            {dashboardNavLinks.map((link) => (
             <Link
             key={link.href}
             href={link.href}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-100 dark:text-gray-200 hover:bg-[#182962] dark:hover:bg-gray-900 rounded text-base"
              >
           {link.label === "About" && <FaInfoCircle />}
          {link.label === "History" && <FaHistory />}
          {link.label === "Feedback" && <FaCommentAlt />}
          {link.label}
           </Link>
            ))}
            
          </nav>
        </div>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center justify-center ${
            isLoggingOut ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
          } text-white font-semibold py-2 rounded text-base`}
        >
          <FaSignOutAlt className="mr-1" />
          {isLoggingOut ? 'Logging out...' : 'Log Out'}
        </button>
      </aside>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black/30 z-20 md:hidden transition-opacity duration-200 ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Dashboard */}
      <main className="flex-1 px-2 py-2 md:px-6 md:py-3 ml-0 md:ml-0 flex flex-col h-screen overflow-hidden">
        {currentView === 'dashboard' ? (
          <>
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-3 flex-shrink-0">
              <button
                className="md:hidden"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Open sidebar"
              >
                <svg width={24} height={24}>
                  <rect width='24' height='24' fill='none'/>
                  <rect x='4' y='9' width='16' height='2' rx='1' fill='currentColor'/>
                  <rect x='4' y='13' width='16' height='2' rx='1' fill='currentColor'/>
                </svg>
              </button>
              <div className="flex gap-2 flex-1 md:flex-initial md:ml-0 ml-1">
                <select className="bg-white dark:bg-gray-800 dark:text-white rounded px-3 py-2 font-semibold shadow border-0 w-32 md:w-36 text-sm md:text-base">
                  <option>All Locations</option>
                  <option>New Delhi</option>
                  <option>Mumbai</option>
                  <option>Kolkata</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                </select>
                <input 
                  className="ml-2 px-3 py-2 rounded border-0 shadow bg-white dark:bg-gray-800 dark:text-white w-28 md:w-56 text-sm md:text-base" 
                  placeholder="Search cities..." 
                />
              </div>
              <div className="flex gap-2 md:gap-3 items-center ml-2">
                <button className="relative">
                  <FaBell size={20} className="text-blue-700 dark:text-blue-400" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">4</span>
                </button>
                <button className="relative">
                  <FaWrench size={20} className="text-yellow-400 dark:text-yellow-300" />
                </button>
                <button className="relative">
                  <FaEnvelopeOpenText size={20} className="text-green-600 dark:text-green-400" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">12</span>
                </button>
              </div>
            </div>

            {/* Dashboard Title */}
            <h2 className="text-lg md:text-2xl font-bold mb-3 flex-shrink-0 text-gray-900 dark:text-gray-100">Dashboard</h2>

            {/* Statistics */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-3 flex-shrink-0">
              {stats.map((s, idx) => (
                <div key={idx} className={`flex-1 flex items-center gap-4 rounded px-4 md:px-5 py-4 shadow ${s.color}`}>
                  <div>{s.icon}</div>
                  <div>
                    <div className="text-lg md:text-2xl font-bold">{s.value}</div>
                    <div className="text-base md:text-lg font-semibold">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-grow overflow-hidden min-h-0">

  {/* Most Preferred Locations */}
  <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col min-h-0">
    <div className="font-bold mb-2 text-base md:text-lg text-gray-900 dark:text-white">Most Preferred Locations</div>
    <div className="space-y-2 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
      {preferredLocations.map((loc, idx) => (
        <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-gray-700 px-3 py-2 rounded">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-base text-gray-900 dark:text-white">{loc.title}</div>
              <div className="text-sm text-gray-400 dark:text-gray-300">{loc.company}</div>
            </div>
          </div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{loc.time}</div>
        </div>
      ))}
    </div>
  </div>

  {/* routes */}
  <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col min-h-0">
    <div className="font-bold mb-2 text-base md:text-lg text-gray-900 dark:text-white">Your Routes</div>
    <div className="space-y-2 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
      {employees.map((emp, idx) => (
        <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-gray-700 px-3 py-2 rounded">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-base text-gray-900 dark:text-white">{emp.name}</div>
              <div className="text-xs md:text-sm text-gray-400 dark:text-gray-300">Sector: {emp.role}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white rounded-full p-1">
              <FaEye size={14} />
            </button>
            <button className="bg-blue-600 text-white rounded-full p-1">
              <FaDownload size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Most Preferred Routes */}
  <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col min-h-0">
    <div className="font-bold mb-2 text-base md:text-lg text-gray-900 dark:text-white">Most Preferred Routes</div>
    <div className="space-y-2 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
      {candidates.map((c, idx) => (
        <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-gray-700 px-3 py-2 rounded">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-base text-gray-900 dark:text-white">{c.name}</div>
              <div className="text-xs md:text-sm text-gray-400 dark:text-gray-300">Industry: {c.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-200 dark:bg-gray-800 text-xs md:text-sm px-2 rounded font-bold">{c.score}</span>
            <span className="text-slate-400 dark:text-gray-300 text-xs md:text-sm">Score</span>
            <button className="bg-green-500 text-white rounded-full p-1 ml-1">
              <FaEye size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* High Location Traffic */}
  <div className="bg-white dark:bg-gray-800 rounded shadow p-3 flex flex-col min-h-0">
    <div className="font-bold mb-2 text-base md:text-lg text-gray-900 dark:text-white">High Location Traffic</div>
    <div className="space-y-2 flex-1 overflow-auto [&::-webkit-scrollbar]:hidden">
      {locationTraffic.map((p, idx) => (
        <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-gray-700 px-3 py-2 rounded">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold text-base text-gray-900 dark:text-white">{p.name}</div>
              <div className="text-xs md:text-sm text-gray-400 dark:text-gray-300">Status: {p.salary}</div>
            </div>
          </div>
          <span className={`text-xs md:text-sm px-3 py-1 rounded font-bold ${p.color}`}>
            {p.status}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
          </>
        ) : (
          <AdminUsers />
        )}
      </main>
    </div>
  );
}

export default Dashboard;