import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../../redux/features/APIEndpoints/authApi/authApi";
import { toast } from "react-toastify";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";

interface RegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  bio: string;
  subjects: string[];
  file: File | null;
}

export default function Register() {
  const [subjectInput, setSubjectInput] = useState("");

  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    bio: "",
    subjects: [],
    file: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const addSubject = () => {
    if (subjectInput.trim() === "") return;

    setForm({
      ...form,
      subjects: [...form.subjects, subjectInput],
    });

    setSubjectInput("");
  };

  const removeSubject = (index: number) => {
    const updated = form.subjects.filter((_, i) => i !== index);
    setForm({ ...form, subjects: updated });
  };

  const [register, { isLoading, isError, error: registerError }] =
    useRegisterMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "data",
      JSON.stringify({
        tutor: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          address: form.address,
          subjects: form.subjects,
          bio: form.bio,
        },
      }),
    );

    if (form.file) {
      formData.append("file", form.file);
    }

    console.log(formData);
    // call API
    await register(formData).unwrap();
    toast.success("Registration success!");
    navigate("/");
  };

  useEffect(() => {
    if (!isLoading && isError && registerError) {
      showApiErrorToast(registerError);
    }
  }, [isLoading, isError, registerError]);

  return (
    <div className="py-6 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black md:px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-lg rounded-xl md:p-8 p-3">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <textarea
            name="bio"
            placeholder="Tutor Bio"
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          {/* Subject Input */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Subjects
            </label>

            <div className="flex md:flex-row flex-col gap-2 mt-1">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                placeholder="Add subject"
                className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />

              <button
                type="button"
                onClick={addSubject}
                className="bg-green-600 text-white px-3 rounded-lg md:py-0 py-2"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {form.subjects.map((sub, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {sub}
                  <button type="button" onClick={() => removeSubject(index)}>
                    <Icon icon="mdi:close" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Upload Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link to="/" className="text-green-600 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
