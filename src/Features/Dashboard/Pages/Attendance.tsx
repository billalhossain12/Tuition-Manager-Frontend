import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useGetMyAttendancesQuery } from "../../../redux/features/APIEndpoints/attendanceApi/attendanceApi";
import { DatePicker } from "antd";
import moment from "moment";

interface Attendance {
  _id: string;
  date: string;
  status: "present" | "absent";
  note?: string;
  routineId: {
    _id: string;
    weeklySchedule: { day: string; startTime: string; endTime: string }[];
  };
  studentId: {
    name: string;
    subject: string;
  };
}

export default function Attendance() {
  const [filtered, setFiltered] = useState<Attendance[]>([]);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | null>("");
  const [endDate, setEndDate] = useState<string | null>("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isSuccess } = useGetMyAttendancesQuery(undefined);

  // 🔍 Search filter
  useEffect(() => {
    if (!isLoading && isSuccess && data.length > 0) {
      let result = [...data];

      // 1️⃣ Filter by student name
      if (search) {
        result = result.filter((item) =>
          item.studentId.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      // 2️⃣ Date Range Filter
      if (startDate || endDate) {
    result = result.filter((item) => {
      const itemDate = new Date(item.date)
        .toISOString()
        .split("T")[0]; // YYYY-MM-DD

      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate;
      }

      if (startDate && !endDate) {
        return itemDate >= startDate;
      }

      if (!startDate && endDate) {
        return itemDate <= endDate;
      }

      return true;
    });
  }

      // 3️⃣ Filter by status
      if (status) {
        result = result.filter((item) => item.status === status);
      }

      setFiltered(result);
    }
  }, [search, startDate, endDate, status, data]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black md:p-6 p-3">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <Icon icon="mdi:clipboard-list-outline" />
            Attendance Records
          </h1>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          {/* Date Filter */}
          {/* Start Date */}
          <DatePicker
            format="DD/MM/YY"
            onChange={(date) =>
              setStartDate(date ? date.format("YYYY-MM-DD") : null)
            }
            className="w-full"
            placeholder="Start Date"
          />

          {/* End Date */}
          <DatePicker
            format="DD/MM/YY"
            onChange={(date) =>
              setEndDate(date ? date.format("YYYY-MM-DD") : null)
            }
            className="w-full"
            placeholder="End Date"
          />

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStartDate("");
              setEndDate("");
              setStatus("");
            }}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b dark:border-gray-700">
              <tr className="text-gray-600 dark:text-gray-300 text-sm">
                <th className="py-2">Student</th>
                <th>Date</th>
                <th>Status</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered?.map((item) => (
                <tr
                  key={item._id}
                  className="border-b dark:border-gray-800 text-sm"
                >
                  <td className="py-3 font-medium dark:text-white">
                    {item.studentId.name}
                  </td>

                  <td className="text-gray-600 dark:text-gray-300">
                    {moment(item.date).format('DD/MM/YYYY')}
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === "present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "present" ? "✔ Present" : "✖ Absent"}
                    </span>
                  </td>

                  <td className="text-gray-500">{item.note || "-"}</td>

                  <td>
                    <button className="text-blue-500 hover:text-blue-600">
                      <Icon icon="mdi:pencil" width="20" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
