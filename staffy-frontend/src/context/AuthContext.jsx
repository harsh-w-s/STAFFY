import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import { login as loginApi } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // React state is temporary and resets completely whenever the page refreshes.
  // So even if the user was previously logged in, the global `user` state becomes null again.
  //
  // However, the JWT token still exists in localStorage because localStorage persists
  // across refreshes and browser restarts.
  //
  // To restore the authenticated session, when the application starts we:
  //
  // 1. Check if a JWT token already exists in localStorage
  // 2. If token exists, send it to backend through `/users/me` API
  // 3. Backend validates the token and returns current authenticated user details
  // 4. Restore the global auth state using `setUser(currentUser)`
  //
  // This process is called auth/session initialization or auth persistence.
  //
  // We do NOT trust localStorage blindly because the token may be:
  // - expired
  // - invalid
  // - tampered
  //
  // So backend verification is necessary before restoring authentication state.
  //
  // If token validation fails, we remove the invalid token from localStorage
  // and reset user state to null.
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    const data = await loginApi(username, password);

    localStorage.setItem("token", data.token);

    setUser({
      id: data.id,
      name: data.name,
      username: data.username,
      role: data.role,
    });

    return data;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
