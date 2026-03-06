import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../shared/Footer";


export default function MainLayout() {
  return (
    <main id="report" className="max-w-7xl mx-auto">
      <Header />
      <div>
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </main>
  );
}
