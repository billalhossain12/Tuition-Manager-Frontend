export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://tuition-manager-server.vercel.app/api/v1";
