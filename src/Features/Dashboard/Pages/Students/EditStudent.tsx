import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMyStudentQuery,
  useUpdateMyStudentMutation,
} from "../../../../redux/features/APIEndpoints/studentsApi/studentsApi";
import { Student } from "../../types/student";
import { toast } from "react-toastify";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";
import { Icon } from "@iconify/react/dist/iconify.js";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetMyStudentQuery(id);
  const student: Student = data;

  const [
    updateStudent,
    { isLoading: isUpdating, isError: isUpdatingError, error: updateError },
  ] = useUpdateMyStudentMutation();

  useEffect(() => {
    if (!isUpdating && isUpdatingError && updateError) {
      showApiErrorToast(updateError);
    }
  }, [isUpdating, isUpdatingError, updateError]);

  useEffect(() => {
    if (student && student._id) {
      setForm(student);
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    address: "",
    salaryPerMonth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated student:", form);
    await updateStudent({ id, data: form }).unwrap();
    toast.success("Student is updated successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Edit Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            placeholder="Student Name"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <input
            name="subject"
            value={form.subject}
            placeholder="Subject"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <input
            name="address"
            value={form.address}
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <input
            name="salaryPerMonth"
            value={form.salaryPerMonth}
            placeholder="Salary Per Month"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
          >
            {isUpdating && <Icon icon="eos-icons:loading" width="20" />}
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
