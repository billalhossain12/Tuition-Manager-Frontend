// Modal for pdf file
import { baseUrl } from "../../api/apiConstant";
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export const PrintModal = ({ title }: { title: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agreed: false,
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDarkMode = document.documentElement.classList.contains("dark");
  const primaryColor = isDarkMode ? "#52ab98" : "#2b6777";
  const secondaryColor = isDarkMode ? "#3d8a7a" : "#1a4d5a";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      agreed: false,
    });
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSendEmail = async () => {
    // Validate fields
    if (
      !formData.email.trim() ||
      !formData.name.trim() ||
      !formData.phone.trim()
    ) {
      return setShowError(true);
    }
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      return setShowError(true);
    }
    if (!formData.agreed) {
      return setShowError(true);
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${baseUrl}/report-downloaded-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          downloadedFileName: title,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || "Something went wrong!";
        return toast.error(message, { position: "top-center" });
      }
      setIsModalOpen(false);
      setShowError(false);
      toast.success("Thank you. Your report is being prepared...", {
        position: "top-center",
        autoClose: 1500, // Auto close after 1.5 seconds
        onClose: () => {
          // Trigger print after toast closes
          setTimeout(() => {
            window.print();
          }, 100);
        },
      });
    } catch (error: unknown) {
      console.error("Email sending failed:", error);
      const errorMessage = "Unexpected error occurred";
      toast.error(`Failed to generate report: ${errorMessage}`, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setShowError(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
          colorLink: primaryColor,
          colorLinkHover: secondaryColor,
          borderRadius: 12,
          wireframe: false,
        },
        components: {
          Modal: {
            paddingContentHorizontal: 0,
          },
        },
      }}
    >
      <button
        type="button"
        className="bg-brand-navy text-text-white hover:bg-brand-navyHover active:scale-95 rounded-button px-6 py-3 transition font-bold w-full"
        onClick={showModal}
        disabled={isLoading}
        aria-label="Export as PDF"
      >
        Print / Save PDF
      </button>

      <Modal
        open={isModalOpen}
        closeIcon={null}
        footer={null}
        className="premium-modal"
        onCancel={handleCancel}
        centered
        width={520}
        styles={{
          content: {
            padding: 0,
            background: isDarkMode
              ? "linear-gradient(145deg, #1e1e2d, #2a2a3a)"
              : "linear-gradient(145deg, #ffffff, #f9f9ff)",
            border: "none",
            boxShadow: isDarkMode
              ? "0 10px 25px rgba(0,0,0,0.3)"
              : "0 10px 25px rgba(43, 103, 119, 0.15)",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <div className="relative">
          {/* Decorative header */}
          <div
            className={`h-2 w-full ${
              isDarkMode ? "bg-[#1a4d5a]" : "bg-[#2b6777]"
            } rounded-t-xl`}
          ></div>

          {/* Close button */}
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl cursor-pointer transition-colors bg-transparent border-none z-10"
            aria-label="Close modal"
          >
            <Icon icon="ion:close" className="text-current" />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-[#1a4d5a]/30" : "bg-[#c8d8e4]"
                } ${isDarkMode ? "text-[#52ab98]" : "text-[#2b6777]"}`}
              >
                <Icon icon="mdi:file-document" className="text-2xl" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-[#2b6777]"
                  }`}
                >
                  Download Your Report
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your details to download the PDF
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.name.trim()
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="text"
                    placeholder="John Doe"
                    onChange={handleInputChange}
                    value={formData.name}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:account-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.name.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your name
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError &&
                      (!formData.email.trim() ||
                        !emailRegex.test(formData.email))
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="email"
                    placeholder="john@example.com"
                    onChange={handleInputChange}
                    value={formData.email}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:email-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.email.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your email
                  </p>
                )}
                {showError &&
                  formData.email.trim() &&
                  !emailRegex.test(formData.email) && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <Icon
                        icon="mdi:alert-circle-outline"
                        className="text-sm"
                      />
                      Please enter a valid email address
                    </p>
                  )}
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1.5 ${
                    isDarkMode ? "text-gray-300" : "text-[#2b6777]"
                  }`}
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      showError && !formData.phone.trim()
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 ${
                      isDarkMode
                        ? "focus:ring-[#52ab98]"
                        : "focus:ring-[#2b6777]"
                    } focus:border-transparent transition-all pl-11`}
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    onChange={handleInputChange}
                    value={formData.phone}
                    aria-required="true"
                  />
                  <Icon
                    icon="mdi:phone-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
                  />
                </div>
                {showError && !formData.phone.trim() && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <Icon icon="mdi:alert-circle-outline" className="text-sm" />
                    Please enter your phone number
                  </p>
                )}
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border ${
                      formData.agreed
                        ? `${
                            isDarkMode
                              ? "bg-[#52ab98] border-[#52ab98]"
                              : "bg-[#2b6777] border-[#2b6777]"
                          }`
                        : "border-gray-300 dark:border-gray-600"
                    } flex items-center justify-center transition-colors mt-0.5`}
                  >
                    {formData.agreed && (
                      <Icon icon="mdi:check" className="text-white text-sm" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{" "}
                      <Link
                        className={`${
                          isDarkMode
                            ? "text-[#52ab98] hover:text-[#3d8a7a]"
                            : "text-[#2b6777] hover:text-[#1a4d5a]"
                        } font-medium hover:underline transition-colors`}
                        to="/terms-and-condition"
                        target="_blank"
                      >
                        Terms and Conditions
                      </Link>
                    </span>
                    {showError && !formData.agreed && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <Icon
                          icon="mdi:alert-circle-outline"
                          className="text-sm"
                        />
                        Please accept the terms and conditions
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              {isLoading ? (
                <div
                  className={`flex items-center justify-center gap-3 py-3 px-6 rounded-lg bg-gray-100 dark:bg-gray-800 ${
                    isDarkMode ? "text-[#52ab98]" : "text-[#2b6777]"
                  }`}
                  aria-live="polite"
                >
                  <Icon icon="svg-spinners:ring-resize" className="text-xl" />
                  <span>Preparing your report...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSendEmail}
                   className="bg-brand-navy text-text-white hover:bg-brand-blue active:scale-95 rounded-button px-6 py-3 transition font-bold"
                    disabled={isLoading}
                  >
                    Download PDF Report
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full py-2.5 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors border border-gray-300 dark:border-gray-600"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};
