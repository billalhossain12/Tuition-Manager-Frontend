export const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/v1"
    : "https://dollarfar-backend-five.vercel.app/api/v1";
