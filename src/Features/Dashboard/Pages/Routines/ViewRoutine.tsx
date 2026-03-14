import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMyRoutineQuery } from "../../../../redux/features/APIEndpoints/routinesApi/routinesApi";
import dayjs from "dayjs";

interface WeeklySchedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface Student {
  _id: string;
  name: string;
  phone: string;
  subject: string;
  address: string;
}

interface Routine {
  _id: string;
  tutorId: string;
  studentId: Student | null;
  weeklySchedule: WeeklySchedule[];
  monthlySalary: number;
  startDate: string;
  isActive: boolean;
  createdAt: string;
}

export default function ViewRoutine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingRoutine } = useGetMyRoutineQuery(id);
  const routine: Routine = data;

  if (isLoadingRoutine) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Loading routine...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <div className="md:max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md md:p-6 p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-green-600 flex items-center gap-2">
            <Icon icon="mdi:calendar-clock" width="22" />
            Routine Details
          </h1>
        </div>

        {/* Student Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">
              Student Name
            </h2>
            <p className="text-lg font-semibold dark:text-white">
              {routine.studentId?.name || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">Phone</h2>
            <p className="text-lg font-semibold dark:text-white">
              {routine.studentId?.phone || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">
              Subject
            </h2>
            <p className="text-lg font-semibold dark:text-white">
              {routine.studentId?.subject || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">
              Address
            </h2>
            <p className="text-lg font-semibold dark:text-white">
              {routine.studentId?.address || "N/A"}
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            Weekly Schedule
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {routine.weeklySchedule.map((schedule, index) => (
              <div
                key={index}
                className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
              >
                <p className="font-semibold text-gray-800 dark:text-white">
                  {schedule.day}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dayjs(schedule.startTime, "HH:mm").format("hh:mm A")} - {dayjs(schedule.endTime, "HH:mm").format("hh:mm A")}
                </p>
              </div>
            ))}
            <div  className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-sm text-gray-500 dark:text-gray-400">
                Start Date
              </h2>
              <p className="text-lg font-semibold dark:text-white">
                {new Date(routine.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border dark:border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Icon icon="mdi:arrow-left" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
