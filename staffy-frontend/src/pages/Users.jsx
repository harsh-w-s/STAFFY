import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/authService";

function Users() {
  const [users, setUsers] = useState([]);

  // When the Users page loads, we want to fetch the list of all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600">{user.role}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Users;
