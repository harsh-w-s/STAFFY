import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
