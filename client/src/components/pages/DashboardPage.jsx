import React, { useState, createContext, useContext } from 'react';
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

// Authentication Context
const AuthContext = createContext();

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login Page Component
const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'rahul.sharma@decrypton.in',
    password: '',
    rememberMe: false,
    language: 'English'
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = () => {
    // Simulate login validation
    if (formData.email && formData.password) {
      // Mock user data
      const userData = {
        email: formData.email,
        name: 'Rahul Sharma',
        company: 'Decrypton'
      };
      login(userData);
    } else {
      alert('Please enter both email and password');
    }
  };

  const handleRegister = () => {
    alert('Register functionality - would redirect to registration page');
  };

  const handleForgotPassword = () => {
    alert('Forgot password functionality - would send reset email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Navigation */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-3xl font-bold text-gray-800">
              <span className="text-gray-700">DARC</span>
              <span className="text-orange-500">⚬</span>
              <span className="text-gray-700">N</span>
            </div>
          </div>
          <nav className="flex justify-center space-x-6 text-sm text-gray-600 mb-8 flex-wrap">
            <a href="#" className="hover:text-gray-900 transition-colors">Knowledge Base</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Schedule Appointment</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Register</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              🏠 Broker Portal
            </button>
          </nav>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Please login or register
          </h1>

          <div className="space-y-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Login
            </button>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Register
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Sidebar Component (matching your structure)
const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: 'dashboard', icon: '🏠' },
    { name: 'Customers', path: 'customers', icon: '👥' },
    { name: 'Sales', path: 'sales', icon: '💰' },
    { name: 'Real Estate', path: 'real-estate', icon: '🏢' },
    { name: 'Subscriptions', path: 'subscriptions', icon: '📋' },
    { name: 'Expenses', path: 'expenses', icon: '💳' },
    { name: 'Contracts', path: 'contracts', icon: '📄' },
    { name: 'Projects', path: 'projects', icon: '📊' },
    { name: 'Tasks', path: 'tasks', icon: '✅' },
    { name: 'Support', path: 'support', icon: '🎧' },
    { name: 'Leads', path: 'leads', icon: '🎯' },
    { name: 'Knowledge Base', path: 'knowledge-base', icon: '📚' },
    { name: 'Utilities', path: 'utilities', icon: '🔧' },
    { name: 'Reports', path: 'reports', icon: '📈' },
    { name: 'Setup', path: 'setup', icon: '⚙️' },
  ];

  return (
    <nav className="mt-4">
      <div className="px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 mb-2 text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <span className="mr-3">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

// Dashboard Layout Component (based on your existing structure)
const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    logout();
  };

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
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'D'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.company || 'Decrypton'}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Dashboard!</h1>
            <p className="text-gray-600 mb-6">
              You are now logged in as <strong>{user?.name}</strong> ({user?.email})
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-500 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              
              <div className="bg-green-500 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
                <p className="text-3xl font-bold">56</p>
              </div>
              
              <div className="bg-purple-500 text-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
                <p className="text-3xl font-bold">$78K</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add Customer
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Create Project
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your CRM portal activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-blue-500 p-6 text-white shadow">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="mt-3 text-3xl font-bold">1,234</p>
        </div>
        <div className="rounded-lg bg-green-500 p-6 text-white shadow">
          <h2 className="text-lg font-semibold">Active Projects</h2>
          <p className="mt-3 text-3xl font-bold">56</p>
        </div>
        <div className="rounded-lg bg-purple-500 p-6 text-white shadow">
          <h2 className="text-lg font-semibold">Monthly Revenue</h2>
          <p className="mt-3 text-3xl font-bold">$78K</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
