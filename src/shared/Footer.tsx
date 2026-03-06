import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={handleScrollToTop}
          className="fixed md:bottom-6 bottom-2 md:right-6 right-2 z-50 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          <Icon icon="mdi:arrow-up" width={24} />
        </button>
      )}
    </>
  );
};


export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-orange-200 to-teal-50 dark:from-gray-700 dark:to-gray-900 px-6 py-16">
      <ScrollToTopButton/>
      <div className="max-w-7xl mx-auto space-y-6 text-center">
        {/* Row 1: Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6 font-bold">
          <li>
            <Link
              to="/privacy-policy"
              className="hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-and-condition"
              className="hover:underline transition-colors"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              to="/refund-policy"
              className="hover:underline transition-colors"
            >
              Refund Policy
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline transition-colors">
              Contact
            </Link>
          </li>
        </ul>

        {/* Row 2: Copyright */}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          &copy;Copyright All rights reserved by Retirehow? Inc{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
