import { Outlet } from "react-router-dom";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";

export default function AdminLayout() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <main className="flex dark:bg-gray-900 dark:text-gray-100">
      <AdminHeader />
      <MobileHeader setIsVisible={setIsVisible} isVisible={isVisible} />

      <AdminSidebar />
      <MobileSidebar setIsVisible={setIsVisible} isVisible={isVisible} />
      <section className="mt-20 md:ml-60 bg-gray-50 dark:bg-gray-800 w-full md:p-5 p-2 rounded-md duration-300">
        <Outlet />
      </section>
    </main>
  );
}
