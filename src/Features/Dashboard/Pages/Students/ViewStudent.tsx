import { useParams } from "react-router-dom";
import { useGetMyStudentQuery } from "../../../../redux/features/APIEndpoints/studentsApi/studentsApi";
import { Student } from "../../types/student";
import moment from "moment";

const ViewStudent = () => {
  const { id } = useParams();
  const { data } = useGetMyStudentQuery(id);
  const student: Student = data;
  const {
    _id,
    address,
    createdAt,
    name,
    phone,
    salaryPerMonth,
    subject,
    updatedAt,
  } = student || {};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Student Details
        </h2>

        <div className="space-y-3">
          <p>
            <strong>ID:</strong> {_id}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Subject:</strong> {subject}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Salary:</strong> {salaryPerMonth}/Month
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {moment(createdAt).format("MMMM Do YYYY, h:mm A")}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {moment(updatedAt).format("MMMM Do YYYY, h:mm A")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
