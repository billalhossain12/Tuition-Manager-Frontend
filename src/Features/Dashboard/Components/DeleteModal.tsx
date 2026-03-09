import { useParams, useNavigate } from "react-router-dom";

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Deleted:", id);
    navigate("/students");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Delete Student</h2>

        <p className="mb-6">Are you sure you want to delete this student?</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded text-white"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
