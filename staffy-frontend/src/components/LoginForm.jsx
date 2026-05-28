import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  UsersIcon,
  UserIcon,
  LockIcon,
  ArrowRightIcon,
  BuildingIcon,
} from "lucide-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      console.log("Logged in: ", data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-sm shadow-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white">
            <UsersIcon size={18} />
          </div>
          <span className="text-2xl font-medium tracking-tight">Staffy</span>
        </div>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sign in to your workspace
        </p>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Username
          </label>
          <div className="relative">
            <UserIcon
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-1">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Password
          </label>
          <div className="relative">
            <LockIcon
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 pl-9 pr-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Forgot */}
        <div className="flex justify-end mb-5">
          <button className="text-xs text-blue-700 hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Login */}
        <button
          onClick={handleLogin}
          className="w-full h-10 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition active:scale-[0.98]"
        >
          Sign in <ArrowRightIcon size={15} />
        </button>

        {/* SSO */}
        <div className="flex items-center gap-2.5 my-5 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />
          or
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button className="w-full h-10 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 transition">
          <BuildingIcon size={15} /> Continue with SSO
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
