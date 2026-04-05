import React, { useState } from 'react';

const LoginPage = () => {
  const [language, setLanguage] = useState('English');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log({ language, email, password, rememberMe });
  };

  const handleRegister = () => {
    // Redirect to register page or logic here
    console.log('Register clicked');
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page or logic here
    console.log('Forgot Password clicked');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-50 py-4 px-6 flex items-center justify-between">
        <div>
          <img 
            src="https://d2zy81zzvz45yj.cloudfront.net/decryptweb/DarconNew/darcon-logo.svg" 
            alt="DARCON Logo" 
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <button
            type="button"
            className="hover:underline bg-transparent border-none p-0 text-gray-700 cursor-pointer"
            onClick={() => { /* Add logic for Knowledge Base click if needed */ }}
          >
            Knowledge Base
          </button>
          <button
            type="button"
            className="hover:underline bg-transparent border-none p-0 text-gray-700 cursor-pointer"
            onClick={() => { /* Add logic for Schedule Appointment click if needed */ }}
          >
            Schedule Appointment
          </button>
          <button
            type="button"
            onClick={handleRegister}
            className="hover:underline bg-transparent border-none p-0 text-gray-700 cursor-pointer"
          >
            Register
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A7.5 7.5 0 1119.07 6.192m-1.632 7.213a7.5 7.5 0 01-6.098 1.611" />
            </svg>
            <span>Login</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 2a6 6 0 00-6 6c0 3.31 3.582 7.162 5.292 8.584a1 1 0 001.416 0C12.418 15.162 16 11.31 16 8a6 6 0 00-6-6z" />
            </svg>
            <span>Broker Portal</span>
          </button>
        </nav>
      </header>

      {/* Main Login Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h2 className="text-gray-800 font-semibold text-lg mb-4">Please login or register</h2>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-md shadow-md p-6 w-full max-w-md space-y-4"
        >
          {/* Language selector */}
          <div>
            <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-1">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option>English</option>
              {/* Add other language options if needed */}
            </select>
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="block w-full rounded-md border border-gray-300 bg-blue-50 px-3 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="block w-full rounded-md border border-gray-300 bg-blue-50 px-3 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Buttons */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-semibold py-2 rounded hover:bg-gray-800 focus:outline-none"
            >
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleRegister}
              className="w-full border border-gray-300 font-semibold py-2 rounded hover:bg-gray-50 focus:outline-none"
            >
              Register
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-gray-500 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
