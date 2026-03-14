import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Routine } from "../../types/routine";
import {
  useDeleteMyRoutineMutation,
  useGetMyRoutinesQuery,
} from "../../../../redux/features/APIEndpoints/routinesApi/routinesApi";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";
import dayjs from "dayjs";
import AttendanceNoteModal from "./AttendanceNoteModal";
import {
  useCreateAttendanceMutation,
  useGetMyTodayAttendancesQuery,
} from "../../../../redux/features/APIEndpoints/attendanceApi/attendanceApi";
import { toast } from "react-toastify";

// Types
interface Attendance {
  routineId: string;
  status: "present" | "absent";
  note?: string;
}

const Routines = () => {
  const [deletingId, setDeletingId] = useState<string | boolean>(false);
  const { data: routines } = useGetMyRoutinesQuery(undefined);
  const [
    deleteMyRoutine,
    { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
  ] = useDeleteMyRoutineMutation(undefined);

  useEffect(() => {
    if (!isDeleting && isDeleteError && deleteError) {
      showApiErrorToast(deleteError);
    }
  }, [isDeleting, isDeleteError, deleteError]);

  const handleDeleteRoutine = async (routineId: string) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    setDeletingId(routineId);
    await deleteMyRoutine(routineId).unwrap();
    setDeletingId(false);
  };

  // New Addition
  const [
    createAttendance,
    {
      isLoading: isAttending,
      isError: isAttendingError,
      error: attendingError,
    },
  ] = useCreateAttendanceMutation();
  useEffect(() => {
    if (!isAttending && isAttendingError && attendingError) {
      showApiErrorToast(attendingError);
    }
  }, [isAttending, isAttendingError, attendingError]);

  const [todayRoutines, setTodayRoutines] = useState<Routine[]>([]);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const filtered = routines?.filter((routine: Routine) =>
      routine.weeklySchedule.some((s) => s.day === today),
    );
    setTodayRoutines(filtered);
  }, [today, routines]);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //  Attendance
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);

  const openAttendanceModal = (routine: any) => {
    setSelectedRoutine(routine);
    setOpenModal(true);
  };

  const submitAttendance = async (data: any) => {
    try {
      const saved = await createAttendance(data).unwrap();
      toast.success("Attendance created successfully!");
      setAttendanceMap((prev) => ({
        ...prev,
        [saved.data.routineId]: saved.data,
      }));
    } catch (err) {
      // showApiErrorToast(err);
    }
  };

  // Todays Routine
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, Attendance>
  >({});
  const { data, isLoading: isLoadingTodayAttendances } =
    useGetMyTodayAttendancesQuery(undefined);

  useEffect(() => {
    const map: Record<string, Attendance> = {};
    data?.forEach((item: any) => {
      map[item.routineId] = item;
    });

    setAttendanceMap(map);
  }, [data, isLoadingTodayAttendances]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      {/* ================= TODAY'S CLASSES ================= */}

      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-6">
          <Icon icon="mdi:calendar-today" width="22" />
          Today's Classes ({today})
        </h2>

        {todayRoutines?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No classes scheduled today
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayRoutines?.map((routine) =>
              routine.weeklySchedule
                .filter((s) => s.day === today)
                .map((schedule, index) => {
                  // Get attendance for this specific routine
                  const currentRoutineAttendance = attendanceMap[routine._id];

                  return (
                    <div
                      key={index}
                      className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                    >
                      <p className="font-semibold text-lg dark:text-white">
                        {routine.studentId?.name || "Unknown"}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {dayjs(schedule.startTime, "HH:mm").format("hh:mm A")} -{" "}
                        {dayjs(schedule.endTime, "HH:mm").format("hh:mm A")}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {routine.studentId?.subject}
                      </p>

                      {currentRoutineAttendance ? (
                        <span
                          className={`px-2 py-1 text-xs rounded inline-block cursor-pointer mt-2 ${
                            currentRoutineAttendance.status === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                          onClick={() => openAttendanceModal(routine)}
                        >
                          {currentRoutineAttendance.status === "present"
                            ? "✔ Present"
                            : "✖ Absent"}
                          {currentRoutineAttendance.note && (
                            <span className="ml-1 text-xs opacity-75">
                              (Note: {currentRoutineAttendance.note})
                            </span>
                          )}
                        </span>
                      ) : (
                        <button
                          onClick={() => openAttendanceModal(routine)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors mt-2"
                        ></button>
                      )}
                    </div>
                  );
                }),
            )}
          </div>
        )}

        {selectedRoutine && (
          <AttendanceNoteModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            routineId={selectedRoutine._id}
            studentId={selectedRoutine.studentId._id}
            studentName={selectedRoutine?.studentId?.name}
            isAttending={isAttending}
            onSubmit={submitAttendance}
          />
        )}
      </section>

      {/* ================= WEEKLY ROUTINE ================= */}

      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-6">
          <Icon icon="mdi:calendar-week" width="22" />
          Weekly Routine
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {days?.map((day) => {
            const dayRoutines = routines?.filter((routine: Routine) =>
              routine.weeklySchedule.some((s) => s.day === day),
            );

            return (
              <div
                key={day}
                className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="font-semibold text-green-600 mb-3">{day}</h3>

                {dayRoutines?.length === 0 ? (
                  <p className="text-sm text-gray-500">No classes</p>
                ) : (
                  <div className="space-y-2">
                    {dayRoutines?.map((routine: Routine, index: number) => {
                      const schedule = routine.weeklySchedule.find(
                        (s) => s.day === day,
                      );

                      return (
                        <div key={index} className="text-sm dark:text-gray-300">
                          {routine.studentId?.name}
                          <span className="text-gray-500 ml-1">
                            (
                            {dayjs(schedule?.startTime, "HH:mm").format(
                              "hh:mm A",
                            )}
                            )
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ALL ROUTINES ================= */}

      <section className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-green-600 flex items-center gap-2">
            <Icon icon="mdi:format-list-bulleted" width="22" />
            All Routines
          </h2>

          <Link
            to="create"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            <Icon icon="mdi:plus" width="20" />
            Create Routine
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b dark:border-gray-700">
              <tr className="text-gray-600 dark:text-gray-300 text-sm">
                <th className="py-2">Student</th>
                <th>Subject</th>
                <th>Days</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {routines?.map((routine: Routine) => (
                <tr
                  key={routine._id}
                  className="border-b dark:border-gray-800 text-sm"
                >
                  <td className="py-3 font-medium dark:text-white">
                    {routine.studentId?.name || "Unknown"}
                  </td>

                  <td className="text-gray-600 dark:text-gray-300">
                    {routine.studentId?.subject}
                  </td>

                  <td className="text-gray-600 dark:text-gray-300">
                    {routine.weeklySchedule.map((s, idx: number) => {
                      return (
                        <div
                          key={`${routine._id}-${s.day}-${idx}`}
                          className="my-2"
                        >
                          <span className="mr-1">{s.day}</span>
                          <span>
                            ({dayjs(s.startTime, "HH:mm").format("hh:mm A")})
                          </span>
                        </div>
                      );
                    })}
                  </td>

                  <td className="flex gap-2 py-2">
                    <Link
                      to={`view/${routine._id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Icon icon="mdi:eye" width="22" />
                    </Link>

                    <Link
                      to={`edit/${routine._id}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Icon icon="mdi:pencil" width="22" />
                    </Link>

                    <button
                      onClick={() => handleDeleteRoutine(routine._id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={isDeleting}
                    >
                      {isDeleting && deletingId == routine._id ? (
                        <Icon icon="eos-icons:loading" width="22" />
                      ) : (
                        <Icon icon="mdi:delete" width="22" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Routines;
