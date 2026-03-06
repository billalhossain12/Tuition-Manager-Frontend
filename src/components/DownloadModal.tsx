/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ConfigProvider, theme as antdTheme, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BlobProviderParams, PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import Error from "./UI/Error";
import { toast } from "react-toastify";
import { baseUrl } from "../api/apiConstant";

interface DownloadModalProps {
  calculatorData: any;
  PdfComponent: React.FC<any>;
  fileName: string;
  id: string;
}

const DownloadModal = ({
  calculatorData,
  PdfComponent,
  fileName,
  id,
}: DownloadModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDarkMode = document.documentElement.classList.contains("dark");

  const pdfData = {
    ...calculatorData,
    base64,
    name,
    email,
  };

  useEffect(() => {
    const captureChart = async () => {
      const chartId = document.getElementById(id);
      if (chartId) {
        try {
          const canvas = await html2canvas(chartId as HTMLElement);
          const imgData = canvas.toDataURL("image/png");
          setBase64(imgData);
        } catch (error) {
          console.error("Error capturing chart: ", error);
        }
      }
    };
    captureChart();
  }, [isModalOpen, id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowError(false);
    setChecked(false);
    setIsLoading(false);
    setEmail("");
    setPhone("");
    setName("");
  };

  const sendEmail = async (
    name: string,
    email: string,
    phone: string,
    fileName: string
  ) => {
    try {
      const res = await fetch(
        `${baseUrl}/report-downloaded-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            downloadedFileName: fileName,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || "Something went wrong!";
        return toast.error(message, { position: "top-center" });
      }
      toast.success("PDF Report is Downloaded successfully.", {
        position: "top-center",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("There is something wrong!");
    }
  };

  const handleDownloadPdf = async () => {
    // Validate fields
    if (!email?.trim() || !name?.trim() || !phone?.trim()) {
      return setShowError(true);
    }
    if (email?.trim() && !emailRegex.test(email)) {
      return setShowError(true);
    }
    if (!checked) {
      return setShowError(true);
    }
    setIsLoading(true);
    await sendEmail(name, email, phone, fileName);
    setIsLoading(false);
    setIsModalOpen(false);
    setShowError(false);
    setChecked(false);
  };

  const renderDownloadButton = ({ loading }: BlobProviderParams) =>
    loading ? (
      <button
        className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
        type="button"
        id="download-pdf"
      >
        Generating PDF...
      </button>
    ) : (
      <button
        className={` w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px]  ${
          isLoading ? "bg-gray-300 text-gray-500" : "bg-black text-white"
        }`}
        type="button"
        id="download-pdf"
        disabled={isLoading ? true : false}
        onClick={handleDownloadPdf}
      >
        Download PDF
      </button>
    );

  const handleChecked = () => {
    setChecked(!checked);
  };

  const isFormComplete = checked && base64 && name && email && phone;

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        <div
          onClick={showModal}
          className="flex items-center justify-between gap-2 border-[1px] border-gray-300 dark:text-darkModeHeadingTextColor md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-full cursor-pointer"
          data-html2canvas-ignore
        >
          <p>Download</p>
          <Icon className="text-[1.5rem]" icon="material-symbols:download" />
        </div>
        <Modal
          open={isModalOpen}
          closeIcon={false}
          footer={false}
          className="geist"
        >
          <div className="space-y-[1rem]">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="md:text-[1.5rem] text-[18px] font-bold">
                  Enter your details
                </h3>
                <Icon
                  onClick={handleCancel}
                  className="text-red-500 text-[1.8rem] cursor-pointer"
                  icon="material-symbols:close"
                />
              </div>
            </div>

            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full ${
                  checked && "bg-gray-100 disabled:cursor-not-allowed"
                }`}
                autoFocus
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                disabled={checked}
                value={name}
              />
              {showError && !name?.trim() && (
                <Error message="This field is required" />
              )}
            </div>
            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Email
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full ${
                  checked && "bg-gray-100 disabled:cursor-not-allowed"
                }`}
                type="email"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
                disabled={checked}
                value={email}
              />
              {showError && !email?.trim() && (
                <Error message="This field is required" />
              )}
              {showError && email?.trim() && !emailRegex.test(email) && (
                <Error message="Email is not valid!" />
              )}
            </div>
            <div className="md:text-[1rem] text-[14px]">
              <label className="block font-semibold mb-2" htmlFor="name">
                Phone
              </label>
              <input
                className={`p-[0.8rem] border-[1px] border-[#838383] dark:bg-darkModeBgColor dark:text-darkModeHeadingTextColor rounded-[8px] outline-none w-full ${
                  checked && "bg-gray-100 disabled:cursor-not-allowed"
                }`}
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                disabled={checked}
                value={phone}
              />
              {showError && !phone?.trim() && (
                <Error message="This field is required" />
              )}
            </div>
            <div>
              <div className="text-[12px] flex flex-wrap items-center gap-1 select-none">
                {checked ? (
                  <Icon
                    onClick={handleChecked}
                    className="text-[1.2rem] cursor-pointer"
                    icon="mingcute:checkbox-fill"
                  />
                ) : (
                  <Icon
                    onClick={handleChecked}
                    className="text-[1.2rem] cursor-pointer"
                    icon="mdi:checkbox-blank-outline"
                  />
                )}
                <span className="text-[#838383]">
                  By proceeding, you are agreeing to our
                </span>
                <Link className="hover:underline" to="/terms-and-condition">
                  Terms and Conditions
                </Link>
              </div>
              {showError && !checked && (
                <p className="text-red-500 text-[12px] mt-1">
                  Please check Terms and Conditions
                </p>
              )}
            </div>

            <div>
              {isFormComplete && (
                <PDFDownloadLink
                  document={<PdfComponent data={pdfData} />}
                  fileName={fileName}
                >
                  {renderDownloadButton as unknown as React.ReactNode}
                </PDFDownloadLink>
              )}

              {(!name || !email || !phone || !checked) && (
                <button
                  className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
                  type="button"
                  id="download-pdf"
                  onClick={handleDownloadPdf}
                >
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default DownloadModal;
