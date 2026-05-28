import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <p className="mt-4 text-xl">Welcome, {user?.name}</p>

      <p className="text-lg text-gray-600">Role: {user?.role}</p>
    </DashboardLayout>
  );
}

export default Dashboard;
