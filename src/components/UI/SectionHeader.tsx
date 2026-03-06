/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react/dist/iconify.js";
import DownloadModal from "../DownloadModal";
import { useAppSelector } from "../../redux/hooks";
import React from "react";

export default function SectionHeader({
  title,
  id,
  PdfComponent,
}: {
  title: string;
  id: string;
  PdfComponent: React.FC<any>;
}) {
  const {
    annualInterestRate,
    // years,
    initialInvestment,
    compoundingFrequency,
    yearByYearBreakdown,
  } = useAppSelector((state) => state.compoundInterest);
  const calculatorData = {
    annualInterestRate,
    // years,
    initialInvestment,
    compoundingFrequency,
    yearByYearBreakdown,
  };
  return (
    <div className="border-b-[1px] border-[#0000001A] pb-5 mb-[3rem]">
      <div className="flex justify-between items-center flex-wrap">
        <h3 className="text-[1.5rem] font-bold md:mb-0 mb-3">{title}</h3>
        <div className="flex items-center flex-wrap gap-5">
          <div className="flex items-center md:gap-2 gap-1 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer">
            {/* <Icon className="w-[1.5rem] h-[1.5rem]" icon="mdi:dollar" /> */}
            <p>$</p>
            <p>CAD</p>
            <Icon
              className="w-[1.5rem] h-[1.5rem]"
              icon="iconamoon:arrow-down-2"
            />
          </div>
          <DownloadModal
            calculatorData={calculatorData}
            fileName={title}
            id={id}
            PdfComponent={PdfComponent}
          />
        </div>
      </div>
    </div>
  );
}
