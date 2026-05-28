import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { user } = useContext(AuthContext);

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
    },
    {
      label: "Users",
      path: "/users",
      roles: ["ADMIN"],
    },
    {
      label: "Team",
      path: "/team",
      roles: ["MANAGER"],
    },
    {
      label: "Tasks",
      path: "/tasks",
      roles: ["ADMIN", "MANAGER"],
    },
    {
      label: "My Tasks",
      path: "/my-tasks",
      roles: ["EMPLOYEE"],
    },
    {
      label: "Profile",
      path: "/profile",
      roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  return (
    <div
      className={`
    ${isSidebarOpen ? "w-64" : "w-15"}
    min-h-screen
    bg-gray-900
    text-white
    p-5
    transition-all
    duration-300
  `}
    >
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="mb-8 text-xl"
      >
        ☰
      </button>

      <div
        className={`
          transition-all
          duration-300
          overflow-hidden
          whitespace-nowrap
          ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}
        `}
      >
        <h1 className="text-3xl font-bold mb-10">Staffy</h1>
        <ul className="flex flex-col gap-5">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center
                p-3
                rounded-lg
                transition
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"}
                `
              }
            >
              <li className="hover:text-blue-400 cursor-pointer transition">
                {item.label}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
