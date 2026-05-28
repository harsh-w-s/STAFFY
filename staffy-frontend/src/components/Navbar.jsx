import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">Staffy</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
