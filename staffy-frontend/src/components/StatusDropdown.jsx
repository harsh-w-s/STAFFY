import { useState } from "react";

function StatusDropdown({ status, onChange, getStatusColor }) {
  const [open, setOpen] = useState(false);

  const allowedTransitions = {
    OPEN: ["IN_PROGRESS"],

    IN_PROGRESS: ["OPEN", "IN_REVIEW"],

    IN_REVIEW: ["IN_PROGRESS", "RESOLVED"],

    RESOLVED: ["DONE"],

    DONE: ["CLOSED"],

    CLOSED: [],
  };

  const nextStatuses = allowedTransitions[status] || [];

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition ${getStatusColor(status)}`}
      >
        {status}
        <span className="text-[10px] opacity-60">▼</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />

          <div className="absolute left-0 top-8 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 min-w-[130px]">
            {nextStatuses.map((s) => (
              <button
                key={s}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(s);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-gray-50 transition"
              >
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(s)}`}
                >
                  {s}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StatusDropdown;
