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
import { TimePicker } from "antd";
import dayjs from "dayjs";

const weekdays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const EditRoutine = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetMyRoutineQuery(id!);
  const routine: Routine = data;

  const [updateRoutine, { isLoading: isUpdating }] =
    useUpdateMyRoutineMutation();

  const [form, setForm] = useState<RoutineForm>({
    studentId: "",
    startDate: "",
    weeklySchedule: [],
  });

  useEffect(() => {
    if (routine?._id) {
      setForm({
        startDate: routine.startDate,
        studentId: routine.studentId._id,
        weeklySchedule: routine.weeklySchedule,
      });
    }
  }, [routine]);

  const handleScheduleChange = (
    index: number,
    field: keyof WeeklySchedule,
    value: string,
  ) => {
    const updated = [...form.weeklySchedule];
    updated[index] = { ...updated[index], [field]: value };

    setForm({
      ...form,
      weeklySchedule: updated,
    });
  };

  const removeSchedule = (index: number) => {
    const updated = [...form.weeklySchedule];
    updated.splice(index, 1);

    setForm({
      ...form,
      weeklySchedule: updated,
    });
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

    try {
      await updateRoutine({
        id: id!,
        data: form,
      }).unwrap();

      toast.success("Routine updated successfully!");
      navigate(-1);
    } catch (err) {
      showApiErrorToast(err);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Edit Routine</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Start Date */}
          <input
            type="date"
            value={dayjs(form.startDate).format("YYYY-MM-DD")}
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
                  {/* Day */}
                  <div>
                    <label className="block">Day</label>

                    <select
                      value={schedule.day}
                      onChange={(e) =>
                        handleScheduleChange(index, "day", e.target.value)
                      }
                      className="p-2 border rounded dark:bg-neutral-800 w-full"
                    >
                      <option value="">Select</option>

                      {weekdays.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Time */}
                  <div>
                    <label>Start Time</label>

                    <TimePicker
                      format="h:mm A"
                      style={{ height: 40, width: "100%" }}
                      value={
                        schedule.startTime
                          ? dayjs(schedule.startTime, "HH:mm")
                          : null
                      }
                      onChange={(time) => {
                        handleScheduleChange(
                          index,
                          "startTime",
                          time ? dayjs(time).format("HH:mm") : "",
                        );
                      }}
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label>End Time</label>

                    <TimePicker
                      format="h:mm A"
                      style={{ height: 40, width: "100%" }}
                      value={
                        schedule.endTime
                          ? dayjs(schedule.endTime, "HH:mm")
                          : null
                      }
                      onChange={(time) => {
                        handleScheduleChange(
                          index,
                          "endTime",
                          time ? dayjs(time).format("HH:mm") : "",
                        );
                      }}
                    />
                  </div>

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

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
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
              Update Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoutine;
