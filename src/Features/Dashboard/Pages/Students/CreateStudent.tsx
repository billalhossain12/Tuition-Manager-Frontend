import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { handleKeyDown } from "../../../../utils/handleKeyDown";
import { useCreateStudentMutation } from "../../../../redux/features/APIEndpoints/studentsApi/studentsApi";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";
import { toast } from "react-toastify";

interface StudentForm {
  name: string;
  phone: string;
  subject: string;
  salaryPerMonth: string;
  address: string;
}

const CreateStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StudentForm>({
    name: "",
    phone: "",
    subject: "",
    salaryPerMonth: "",
    address: "",
  });
  const { name, phone, address, salaryPerMonth, subject } = formData;

  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "salaryPerMonth" ? Number(value) : value,
    });
  };

  const [createStudent, { isLoading, isError, error }] =
    useCreateStudentMutation();

  useEffect(() => {
    if (!isLoading && isError && error) {
      showApiErrorToast(error);
    }
  }, [isLoading, isError, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address || !salaryPerMonth || !subject) {
      return setShowError(true);
    }

    console.log("Student Data:", formData);

    await createStudent(formData).unwrap();
    toast.success("Student is created successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700"
          >
            <Icon icon="mdi:arrow-left" width="22" />
          </button>

          <h1 className="text-2xl font-bold text-green-600">Create Student</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Student Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!name && showError && (
              <p className="text-red-500 font-semibold text-sm mt-1">
                This field is required*
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!phone && showError && (
              <p className="text-red-500 font-semibold text-sm mt-1">
                This field is required*
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Mathematics / Physics / English"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!subject && showError && (
              <p className="text-red-500 font-semibold text-sm mt-1">
                This field is required*
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Salary
            </label>

            <input
              type="number"
              name="salaryPerMonth"
              value={formData.salaryPerMonth}
              onChange={handleChange}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="5000"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!salaryPerMonth && showError && (
              <p className="text-red-500 font-semibold text-sm mt-1">
                This field is required*
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>

            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Student home address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {!address && showError && (
              <p className="text-red-500 font-semibold text-sm mt-1">
                This field is required*
              </p>
            )}
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
              disabled={isLoading}
              className="w-1/2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              {isLoading && <Icon icon="eos-icons:loading" width="20" />}
              Create Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
