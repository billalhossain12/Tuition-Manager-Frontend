import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { RoutineForm, WeeklySchedule } from "../../types/routine";
import { useCreateRoutineMutation } from "../../../../redux/features/APIEndpoints/routinesApi/routinesApi";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";
import { toast } from "react-toastify";
import { useGetMyStudentsQuery } from "../../../../redux/features/APIEndpoints/studentsApi/studentsApi";
import { Student } from "../../types/student";

const weekdays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const CreateRoutine = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RoutineForm>({
    studentId: "",
    startDate: "",
    weeklySchedule: [],
  });

  const addSchedule = () => {
    setForm({
      ...form,
      weeklySchedule: [
        ...form.weeklySchedule,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const removeSchedule = (index: number) => {
    const updated = [...form.weeklySchedule];
    updated.splice(index, 1);
    setForm({ ...form, weeklySchedule: updated });
  };

  const handleScheduleChange = (
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => {
    const updated = [...form.weeklySchedule];
    updated[index][field] = value;
    setForm({ ...form, weeklySchedule: updated });
  };

  const [
    createRoutine,
    { isLoading: isCreating, isError: isCreateError, error: createError },
  ] = useCreateRoutineMutation();
  const { data: students } = useGetMyStudentsQuery(undefined);

  useEffect(() => {
    if (!isCreating && isCreateError && createError) {
      showApiErrorToast(createError);
    }
  }, [isCreating, isCreateError, createError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    await createRoutine(form).unwrap();
    toast.success("Routine is created successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-6">
          Create Routine
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Student
            </label>

            <select
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              className="w-full p-3 rounded-lg border dark:bg-neutral-800"
            >
              <option value="">Select student</option>
              {students?.map((student: Student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 text-sm font-medium">Start Date</label>

            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="w-full p-3 border rounded-lg dark:bg-neutral-800"
            />
          </div>

          {/* Weekly Schedule */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-green-600">Weekly Schedule</h2>

              <button
                type="button"
                onClick={addSchedule}
                className="flex items-center gap-1 text-green-600"
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
                  {/* Day */}
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

                  {/* Start Time */}
                  <input
                    type="text"
                    placeholder="Start Time"
                    value={schedule.startTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "startTime", e.target.value)
                    }
                    className="p-2 border rounded dark:bg-neutral-800"
                  />

                  {/* End Time */}
                  <input
                    type="text"
                    placeholder="End Time"
                    value={schedule.endTime}
                    onChange={(e) =>
                      handleScheduleChange(index, "endTime", e.target.value)
                    }
                    className="p-2 border rounded dark:bg-neutral-800"
                  />

                  {/* Delete */}
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

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isCreating}
              className="w-1/2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              {isCreating && <Icon icon="eos-icons:loading" width="20" />}
              Create Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoutine;
