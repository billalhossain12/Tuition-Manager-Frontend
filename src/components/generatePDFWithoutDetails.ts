import html2pdf from "html2pdf.js";
import siteLogo from "../assets/Dollar-logo.svg";
export const generatePDFWithoutDetails = (
  fileName: string
): void => {
  const element = document.getElementById("report") as HTMLDivElement | null;
 
 // Create a temporary div to hold the header and content
 const tempDiv = document.createElement('div');

 // Create the dynamic header
 const headerHTML = `
   <div style="box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10); padding: 20px; display: flex; justify-content: space-between; align-items: center;">
     <img src="${siteLogo}" alt="Logo Image" style="width: 150px; height: 150px; margin-left:2.2rem" />
   </div>
 `;

 // Set the inner HTML of the temporary div
 tempDiv.innerHTML = headerHTML + (element ? element.innerHTML : ''); // Replace with actual content

 const pdfOptions = {
   filename: `${fileName}.pdf`,
   jsPDF: { unit: "px", format: [3500, 1900], orientation: "portrait" },
   html2canvas: { scale: 1 },
   pagebreak: { mode: ["css", "legacy"] },
   margin: [20, 30, 30, 30],
 };

 // Generate the PDF
 html2pdf(tempDiv, pdfOptions);
};

