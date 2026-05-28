import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getEmployees } from "../services/userService";
import { createTask } from "../services/taskService";

function CreateTaskModal({ isOpen, onClose, onTaskCreated }) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");

  const [assignedEmployeeId, setAssignedEmployeeId] = useState("");

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();

      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      const taskData = {
        title,
        description,
        deadline,
        assignedEmployeeId,
      };

      await createTask(taskData);

      await onTaskCreated();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition h-28 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Assign to
            </label>
            <select
              value={assignedEmployeeId}
              onChange={(e) => setAssignedEmployeeId(e.target.value)}
              className="w-full h-10 px-3 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition"
            >
              <option value="">Select employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTask}
            className="px-4 py-2 text-sm rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskModal;
