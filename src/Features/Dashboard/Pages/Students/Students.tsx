import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import {
  useDeleteMyStudentMutation,
  useGetMyStudentsQuery,
} from "../../../../redux/features/APIEndpoints/studentsApi/studentsApi";
import { Student } from "../../types/student";
import { showApiErrorToast } from "../../../../utils/showApiErrorToast";

const Students = () => {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | boolean>(false);
  const { data: students } = useGetMyStudentsQuery(undefined);
  const [
    deleteMyStudent,
    { isLoading: isDeleting, isError: isDeleteError, error: deleteError },
  ] = useDeleteMyStudentMutation(undefined);

  useEffect(() => {
    if (!isDeleting && isDeleteError && deleteError) {
      showApiErrorToast(deleteError);
    }
  }, [isDeleting, isDeleteError, deleteError]);

  const filteredStudents = students?.filter((student: Student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteStudent = async (studentId: string) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    setDeletingId(studentId);
    await deleteMyStudent(studentId).unwrap();
    setDeletingId(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold text-green-600">Students</h1>

        <Link
          to="create"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <Icon icon="mdi:plus" width="20" />
          Create Student
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Icon
          icon="mdi:magnify"
          width="20"
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4">Name</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Salary</th>
              <th>Address</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents?.map((student: Student) => (
              <tr
                key={student._id}
                className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="p-4 font-medium">{student.name}</td>

                <td>{student.phone}</td>

                <td>{student.subject}</td>

                <td className="text-green-600 font-semibold">
                  {student.salaryPerMonth}
                </td>

                <td className="max-w-[200px] truncate">{student.address}</td>

                <td className="flex justify-center gap-3 py-4">
                  <Link
                    to={`view/${student._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Icon icon="mdi:eye" width="22" />
                  </Link>

                  <Link
                    to={`edit/${student._id}`}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <Icon icon="mdi:pencil" width="22" />
                  </Link>

                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isDeleting}
                  >
                    {isDeleting && deletingId == student._id ? (
                      <Icon icon="eos-icons:loading" width="22" />
                    ) : (
                      <Icon icon="mdi:delete" width="22" />
                    )}
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
