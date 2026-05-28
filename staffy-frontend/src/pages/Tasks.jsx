import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAssignedTasks } from "../services/taskService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CreateTaskModal from "../components/CreateTaskModal";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const canAddTask = ["MANAGER", "ADMIN"].includes(user?.role);

  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      const data = await getAssignedTasks(page);

      setTasks(data.content);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";

      case "IN_REVIEW":
        return "bg-purple-100 text-purple-800";

      case "RESOLVED":
        return "bg-cyan-100 text-cyan-800";

      case "DONE":
        return "bg-green-100 text-green-800";

      case "CLOSED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          {canAddTask && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              + New Task
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left font-medium text-gray-500">
                  Title
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500">
                  Employee
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500">
                  Status
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <td className="px-5 py-3.5 font-medium text-gray-800">
                    {task.title}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {task.assignedEmployeeName}
                  </td>
                  <td className="p-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusColor(task.status)}
                        `}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-gray-500">
            Page {page + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
    </DashboardLayout>
  );
}

export default Tasks;
