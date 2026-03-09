import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Routine, RoutineForm, WeeklySchedule } from "../../types/routine";
import {
  useGetMyRoutineQuery,
  useUpdateMyRoutineMutation,
} from "../../../../redux/features/APIEndpoints/routinesApi/routinesApi";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";
import { toast } from "react-toastify";
import moment from "moment";

const weekdays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const EditRoutineSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        {/* Header */}
        <div className="h-8 w-48 bg-gray-200 dark:bg-neutral-700 rounded mb-6 animate-pulse"></div>

        <div className="space-y-5">
          {/* Start Date Skeleton */}
          <div className="w-full h-12 bg-gray-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>

          {/* Weekly Schedule Section */}
          <div>
            <div className="flex justify-between mb-3">
              <div className="h-6 w-36 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3">
              {/* Schedule Item 1 */}
              <div className="grid md:grid-cols-4 gap-3 items-center">
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>

              {/* Schedule Item 2 */}
              <div className="grid md:grid-cols-4 gap-3 items-center">
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>

              {/* Schedule Item 3 */}
              <div className="grid md:grid-cols-4 gap-3 items-center">
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <div className="w-1/2 h-12 bg-gray-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
            <div className="w-1/2 h-12 bg-gray-200 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditRoutine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: isLoadingRoutine } = useGetMyRoutineQuery(id);
  const routine: Routine = data;

  const [
    updateRoutine,
    { isLoading: isUpdating, isError: isUpdatingError, error: updateError },
  ] = useUpdateMyRoutineMutation();

  useEffect(() => {
    if (!isUpdating && isUpdatingError && updateError) {
      showApiErrorToast(updateError);
    }
  }, [isUpdating, isUpdatingError, updateError]);

  useEffect(() => {
    if (routine && routine._id) {
      setForm({
        startDate: routine.startDate,
        studentId: routine.studentId._id,
        weeklySchedule: routine.weeklySchedule,
      });
    }
  }, [routine, isLoadingRoutine]);

  const [form, setForm] = useState<RoutineForm>({
    studentId: "",
    startDate: "",
    weeklySchedule: [],
  });

  const handleScheduleChange = (
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => {
    const updated = [...form.weeklySchedule];
    // Create a new object instead of trying to modify the existing one
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, weeklySchedule: updated });
  };

  const removeSchedule = (index: number) => {
    const updated = [...form.weeklySchedule];
    updated.splice(index, 1);
    setForm({ ...form, weeklySchedule: updated });
  };

  const addSchedule = () => {
    setForm({
      ...form,
      weeklySchedule: [
        ...form.weeklySchedule,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated:", form);
    await updateRoutine({ id, data: form }).unwrap();
    toast.success("Routine is updated successfully!");
    navigate(-1);
  };

  if (isLoadingRoutine) {
    return <EditRoutineSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Edit Routine</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Start Date */}
          <input
            type="date"
            value={moment(form.startDate).format("YYYY-MM-DD")}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-neutral-800"
          />

          {/* Weekly Schedule */}
          <div>
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-green-600">Weekly Schedule</h2>

              <button
                type="button"
                onClick={addSchedule}
                className="text-green-600 flex items-center gap-1"
              >
                <Icon icon="mdi:plus" width="18" />
                Add Day
              </button>
            </div>

            <div className="space-y-3">
              {form.weeklySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-4 gap-3 items-center"
                >
                  <select
                    value={schedule.day}
                    onChange={(e) =>
                      handleScheduleChange(index, "day", e.target.value)
                    }
                    className="p-2 border rounded dark:bg-neutral-800"
                  >
                    <option value="">Day</option>

                    {weekdays.map((day) => (
                      <option key={day}>{day}</option>
                    ))}
                  </select>

                  <input
                    value={schedule.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "startTime", e.target.value)
                    }
                    placeholder="Start Time"
                    className="p-2 border rounded dark:bg-neutral-800"
                  />

                  <input
                    value={schedule.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "endTime", e.target.value)
                    }
                    placeholder="End Time"
                    className="p-2 border rounded dark:bg-neutral-800"
                  />

                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="text-red-500"
                  >
                    <Icon icon="mdi:delete" width="20" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate("/routines")}
              className="w-1/2 border py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-1/2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              {isUpdating && <Icon icon="eos-icons:loading" width="20" />}
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoutine;
