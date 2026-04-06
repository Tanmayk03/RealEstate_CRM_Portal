import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const rawFrom = location.state?.from;
  const from = typeof rawFrom === "string" && rawFrom.startsWith("/") ? rawFrom : "/dashboard";

  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate(from === "/login" || from === "/signup" ? "/dashboard" : from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password — connect email service later.");
  };

  return (
    <div className="min-h-full flex flex-col bg-gray-100">
      <header className="bg-indigo-50 py-4 px-6 flex items-center justify-between shrink-0">
        <div>
          <img
            src="https://d2zy81zzvz45yj.cloudfront.net/decryptweb/DarconNew/darcon-logo.svg"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <button type="button" className="hover:underline bg-transparent border-none p-0 text-gray-700 cursor-pointer">
            Knowledge Base
          </button>
          <button type="button" className="hover:underline bg-transparent border-none p-0 text-gray-700 cursor-pointer">
            Schedule Appointment
          </button>
          <Link to="/signup" className="hover:underline text-gray-700">
            Register
          </Link>
          <Link
            to="/login"
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <span>Login</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-gray-800 font-semibold text-lg mb-4">Please login or register</h2>

        <form onSubmit={handleLogin} className="bg-white rounded-md shadow-md p-6 w-full max-w-md space-y-4">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">{error}</div>}

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
            </select>
          </div>

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
              autoComplete="email"
              placeholder="you@company.com"
              className="block w-full rounded-md border border-gray-300 bg-blue-50 px-3 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
              autoComplete="current-password"
              placeholder="********"
              className="block w-full rounded-md border border-gray-300 bg-blue-50 px-3 py-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-semibold py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login"}
          </button>

          <Link
            to="/signup"
            className="block w-full text-center border border-gray-300 font-semibold py-2 rounded hover:bg-gray-50"
          >
            Register
          </Link>

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
