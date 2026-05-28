import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h2 className="text-3xl font-semibold">{user?.name}</h2>

              <p className="text-gray-500 text-lg">@{user?.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-xl p-5">
              <p className="text-gray-500 mb-2">Role</p>

              <h3 className="text-xl font-semibold">{user?.role}</h3>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <p className="text-gray-500 mb-2">Username</p>

              <h3 className="text-xl font-semibold">{user?.username}</h3>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
