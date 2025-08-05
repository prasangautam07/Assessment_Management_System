import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { logoBase64 } from "./LogoUrl";

export const generateMarksheetPDF = (
  username,
  program,
  semester,
  semesterData,
  name
) => {
  const yearPartMap = {
    1: "1/1",
    2: "1/2",
    3: "2/1",
    4: "2/2",
    5: "3/1",
    6: "3/2",
    7: "4/1",
    8: "4/2",
  };

  const doc = new jsPDF();
  const yearPart = yearPartMap[semester.toString()] || "Unknown";

  // Logo
  try {
    doc.addImage(logoBase64, "PNG", 35, 13, 30, 30);
  } catch (e) {
    console.warn("Failed to load logo image:", e.message);
  }

  // University headers
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Tribhuvan University", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.text("Institute of Engineering", 105, 28, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Thapathali Campus", 105, 35, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Internal Assessment", 105, 52, { align: "center" });

  doc.setDrawColor(0);
  doc.rect(65, 56, 80, 8); 
  doc.setFontSize(12);
  doc.text("STATEMENT OF MARKS", 105, 62, { align: "center" });

  // Student Info
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const infoStartY = 75;
  const lineSpacing = 6;

  // Left Column
  doc.text("Name:-", 14, infoStartY);
  doc.text(name, 45, infoStartY);

  doc.text("Level:-", 14, infoStartY + lineSpacing);
  doc.text("Bachelor", 45, infoStartY + lineSpacing);

  doc.text("Year/Part:-", 14, infoStartY + lineSpacing * 2);
  doc.text(yearPartMap[semester], 45, infoStartY + lineSpacing * 2);

  doc.text("Program:-", 14, infoStartY + lineSpacing * 3);
  doc.text(program, 45, infoStartY + lineSpacing * 3);

  // Right Column
  const rightColX = 110;
  doc.text("Exam Roll No:-", rightColX, infoStartY);
  doc.text(username, 140, infoStartY);

  doc.text("Campus:-", rightColX, infoStartY + lineSpacing);
  doc.text("Thapathali campus", 140, infoStartY + lineSpacing);

  // Table
  autoTable(doc, {
    startY: infoStartY + lineSpacing * 4 + 6,
    head: [["SN", "Subject","Full Marks", "Obtained Marks", "Remarks"]],
    body: semesterData.map((item, index) => [
      index + 1,
      item.subject,
      20,
      item.marks,
      item.marks >= 8 ? "Passed" : "Failed",
    ]),
    margin: { left: 14, right: 14 },
    styles: {
      halign: "center",
      fontSize: 11,
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    didParseCell: function (data) {
      if (
        data.section === "body" &&
        (data.column.index === 2 || data.column.index === 3)
      ) {
        const marks = Number(data.row.raw[2]);
        if (marks < 8) {
          data.cell.styles.textColor = [220, 38, 38];
        }
      }
    },
  });

  const dateStr = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${dateStr}`, 14, doc.internal.pageSize.height - 10);

  doc.save(`${username}_semester${semester}_marksheet.pdf`);
};
