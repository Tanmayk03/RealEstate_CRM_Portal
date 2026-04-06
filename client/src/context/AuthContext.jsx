import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "crm_portal_auth";

/** In dev, use same-origin + Vite proxy unless VITE_API_URL is set. Production needs VITE_API_URL. */
function getApiBase() {
  const fromEnv = import.meta.env.VITE_API_URL;
  if (fromEnv && String(fromEnv).trim() !== "") {
    return String(fromEnv).replace(/\/$/, "");
  }
  if (import.meta.env.DEV) {
    return "";
  }
  return "http://127.0.0.1:8088";
}

const API_BASE = getApiBase();

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    const parsed = JSON.parse(raw);
    if (!parsed?.token || !parsed?.user?.email) {
      localStorage.removeItem(STORAGE_KEY);
      return { user: null, token: null };
    }
    return { user: parsed.user, token: parsed.token };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { user: null, token: null };
  }
}

function writeStorage(user, token) {
  if (!user || !token) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const initial = readStorage();
  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(async (email, password) => {
    let res;
    try {
      res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {
      const hint =
        API_BASE === ""
          ? "Start the backend on port 8088 (npm start in /backend), then restart Vite (npm run dev). Test: http://127.0.0.1:8088/health"
          : `Cannot reach API at ${API_BASE}. Start the backend or fix VITE_API_URL.`;
      throw new Error(hint);
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const joi = data.error?.details?.map((d) => d.message.replace(/"/g, "")).join(" ");
      throw new Error(data.message || joi || `Login failed (${res.status})`);
    }
    if (!data.jwtToken || !data.user) {
      throw new Error("Invalid server response");
    }
    setUser(data.user);
    setToken(data.jwtToken);
    writeStorage(data.user, data.jwtToken);
    return data.user;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    let res;
    try {
      res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
    } catch {
      const hint =
        API_BASE === ""
          ? "Start the backend on port 8088 (npm start in /backend), then restart Vite. Test: http://127.0.0.1:8088/health"
          : `Cannot reach API at ${API_BASE}. Start the backend or fix VITE_API_URL.`;
      throw new Error(hint);
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const joi = data.error?.details?.[0]?.message;
      throw new Error(joi || data.message || "Sign up failed");
    }
    if (!data.jwtToken || !data.user) {
      throw new Error("Invalid server response");
    }
    setUser(data.user);
    setToken(data.jwtToken);
    writeStorage(data.user, data.jwtToken);
    return data.user;
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      login,
      signup,
      logout,
      apiBase: API_BASE,
    }),
    [user, token, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
