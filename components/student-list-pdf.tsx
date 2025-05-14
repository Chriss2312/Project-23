'use client';

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Student } from "@/lib/api";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

interface ExportButtonProps {
  students: Student[];
}

export function ExportButton({ students }: ExportButtonProps) {
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Student Attendance Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 25);

    // Define the table data
    const tableData = students.map(student => [
      student.student_id,
      student.name,
      student.department || 'N/A',
      `${student.attendance_rate}%`,
      `${student.classes_attended}/${student.total_classes}`,
      student.status,
      student.last_attendance ? new Date(student.last_attendance).toLocaleDateString() : 'Never'
    ]);

    // Add the table
    autoTable(doc, {
      head: [['Student ID', 'Name', 'Department', 'Attendance Rate', 'Classes', 'Status', 'Last Present']],
      body: tableData,
      startY: 35,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Student ID
        1: { cellWidth: 35 }, // Name
        2: { cellWidth: 35 }, // Department
        3: { cellWidth: 25 }, // Attendance Rate
        4: { cellWidth: 20 }, // Classes
        5: { cellWidth: 25 }, // Status
        6: { cellWidth: 25 }, // Last Present
      },
    });

    // Add summary statistics
    const totalStudents = students.length;
    const lowAttendance = students.filter(s => s.attendance_rate < 75).length;
    const perfectAttendance = students.filter(s => s.attendance_rate >= 90).length;

    const finalY = (doc as any).lastAutoTable.finalY || 35;
    
    doc.setFontSize(10);
    doc.text('Summary Statistics:', 14, finalY + 10);
    doc.text(`Total Students: ${totalStudents}`, 14, finalY + 20);
    doc.text(`Low Attendance (<75%): ${lowAttendance}`, 14, finalY + 30);
    doc.text(`Perfect Attendance (≥90%): ${perfectAttendance}`, 14, finalY + 40);

    // Save the PDF
    doc.save('student-attendance-report.pdf');
  };

  return (
    <Button variant="outline" onClick={exportToPDF}>
      <Download className="mr-2 h-4 w-4" />
      Export List
    </Button>
  );
} 