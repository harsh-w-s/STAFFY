import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, UserCheck, Calendar, Clock } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getTaskById } from "../services/taskService";
import StatusDropdown from "../components/StatusDropdown";
import { updateTaskStatus } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function TaskDetails() {
  const { user } = useContext(AuthContext);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [task, setTask] = useState(null);

  const my_task = location.pathname.startsWith("/my-tasks");

  useEffect(() => {
    fetchTask();
    if (user?.role !== "EMPLOYEE" && my_task) {
      navigate(-1);
    }
  }, []);

  const fetchTask = async () => {
    try {
      const data = await getTaskById(taskId);
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "IN_PROGRESS":
        return "bg-sky-50 text-sky-800 border border-sky-200";
      case "IN_REVIEW":
        return "bg-violet-50 text-violet-800 border border-violet-200";
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-800 border border-emerald-200";
      case "DONE":
        return "bg-green-50 text-green-800 border border-green-200";
      case "CLOSED":
        return "bg-gray-100 text-gray-600 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  if (!task) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <p className="text-sm text-gray-400">Loading task...</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);

      await fetchTask();
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

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-6"
        >
          <ArrowLeft size={14} /> Back to tasks
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {task.title}
            </h1>
            <p className="text-sm text-gray-400 mt-1">Task #{task.id}</p>
          </div>
          {my_task && (
            <StatusDropdown
              status={task.status}
              onChange={(newStatus) => handleStatusUpdate(task.id, newStatus)}
              getStatusColor={getStatusColor}
            />
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Description */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
              Description
            </p>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit space-y-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Task info
            </p>

            {[
              {
                icon: <User size={15} />,
                label: "Assigned to",
                value: task.assignedEmployeeName,
              },
              {
                icon: <UserCheck size={15} />,
                label: "Assigned by",
                value: task.assignedByName,
              },
              {
                icon: <Calendar size={15} />,
                label: "Deadline",
                value: task.deadline,
                warn: true,
              },
              {
                icon: <Clock size={15} />,
                label: "Status",
                value: task.status,
              },
            ].map(({ icon, label, value, warn }) => (
              <div
                key={label}
                className="flex items-start gap-3 pt-4 border-t border-gray-100 first:border-0 first:pt-0"
              >
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p
                    className={`text-sm font-medium ${warn ? "text-amber-700" : "text-gray-800"}`}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TaskDetails;
