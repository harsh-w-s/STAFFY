import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getMyTasks, updateTaskStatus } from "../services/taskService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CreateTaskModal from "../components/CreateTaskModal";
import StatusDropdown from "../components/StatusDropdown";
import { useNavigate } from "react-router-dom";

function MyTasks() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const canAddTask = ["MANAGER", "ADMIN"].includes(user?.role);

  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    if (user?.role !== "EMPLOYEE") {
      navigate(-1);
    }
  }, [page]);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks(page);

      setTasks(data.content);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-amber-50 text-amber-700 border border-amber-200";

      case "IN_PROGRESS":
        return "bg-sky-50 text-sky-700 border border-sky-200";

      case "IN_REVIEW":
        return "bg-violet-50 text-violet-700 border border-violet-200";

      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "DONE":
        return "bg-green-50 text-green-700 border border-green-200";

      case "CLOSED":
        return "bg-gray-100 text-gray-600 border border-gray-200";

      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);

      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const allowedTransitions = {
    OPEN: ["IN_PROGRESS"],

    IN_PROGRESS: ["OPEN", "IN_REVIEW"],

    IN_REVIEW: ["IN_PROGRESS", "RESOLVED"],

    RESOLVED: ["DONE"],

    DONE: ["CLOSED"],

    CLOSED: [],
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">My Tasks</h1>
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
        <div className="bg-white border border-gray-200 rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left font-medium text-gray-500">
                  Title
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 w-40">
                  Employee
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 w-40">
                  Status
                </th>
                <th className="px-5 py-3 text-left font-medium text-gray-500 w-40">
                  Deadline
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => navigate(`/my-tasks/${task.id}`)}
                >
                  <td className="px-5 py-3.5 font-medium text-gray-800">
                    {task.title}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 w-60">
                    {task.assignedEmployeeName}
                  </td>
                  <td className="p-4 w-60">
                    <StatusDropdown
                      status={task.status}
                      onChange={(newStatus) =>
                        handleStatusUpdate(task.id, newStatus)
                      }
                      getStatusColor={getStatusColor}
                    />
                  </td>
                  <td className="px-5 py-3.5 text-gray-600  w-60">
                    {task.deadline}
                  </td>
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
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition"
            >
              Previous
            </button>
            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition"
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

export default MyTasks;
