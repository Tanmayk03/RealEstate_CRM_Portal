import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-64 bg-white border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            {/* Brand name */}
            <span className="text-lg font-semibold text-blue-600">
              ImageReality
            </span>
            {/* Close button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={22} className="text-gray-700" />
            </button>
          </div>
          {/* Navigation */}
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu Button - Shows only when sidebar is closed */}
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu size={22} className="text-gray-700" />
                </button>
              )}
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search now"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Bell className="text-gray-600 cursor-pointer" size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              {/* Profile */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">D</span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Decrypton
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Pages render here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;