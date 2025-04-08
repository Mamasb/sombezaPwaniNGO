import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Paper, TableContainer, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function TeacherDashboard() {
  const [grade, setGrade] = useState("Playgroup");
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem(`students_${grade}`)) || [];
    setStudents(savedStudents);
  }, [grade]);

  const subjectsByGrade = {
    "Grade 9": ["Math", "Eng", "Kisw", "SST", "Agr_Nut", "PRE_TECH", "C/A", "INT_SCI", "RE"],
    "Grade 8": ["math", "eng", "kisw", "sci_tech", "agr_nut", "sst", "re", "cas", "pre_tech"],
    "Grade 7": ["Mathematics", "English", "Kiswahili", "SCI_TECH", "AGR_NUT", "PTR", "CAS", "SST", "RE"],
    "Grade 6": ["Math", "Eng", "Kisw", "Sci_Tech", "Agr_Nut", "SST", "RE", "CAS"],
    "Grade 5": ["Math", "Eng", "Kisw", "Sci_Tech", "Agr_Nut", "SST", "RE", "CAS"],
    "Grade 4": ["Math", "Eng", "Kisw", "Sci", "Agr_Nut", "CAS", "SST", "RE"],
	"Grade 3": ["Math", "English", "Kiswahili", "Environmental", "Religious", "Creative Arts"],
	"PP2": ["Math", "Eng", "Kisw", "Environment Activities", "CREATIVE ACTIVITIES", "Religious Activities"], 
	"PP1 ": ["Math", "LANGUAGE", "READING", "RELIGIOUS ACTIVITIES", "CREATIVE ACTIVITIES", "ENVIRONMENTAL"],
    "Playgroup": ["Math", "LANGUAGE", "READING", "RELIGIOUS ACTIVITIES", "CREATIVE ACTIVITIES", "ENVIRONMENTAL"], // Just an example, adjust with actual subjects
  };

  const exportIndividualPDF = (student, grade) => {
    const doc = new jsPDF();

    // Define colors
    const primaryColor = '#2C3E50';
    const tableHeaderColor = '#2980B9';
    const lightGray = '#BDC3C7';
    const backgroundColor = '#ECF0F1';
    const headerBackgroundColor = '#3498DB';

    // Set document background color
    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // HEADER
    const headerHeight = 50;
    doc.setFillColor(headerBackgroundColor);
    doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, 'F');

    // School Info Section
    doc.setFontSize(16);
    doc.setTextColor('#FFFFFF');
    doc.setFont('helvetica', 'bold');
    doc.text("ADAMS JUNIOR ACADEMY", doc.internal.pageSize.width / 2, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("P.O BOX 179 01100", doc.internal.pageSize.width / 2, 30, { align: 'center' });
    doc.text("CONTACT: 0712674789", doc.internal.pageSize.width / 2, 35, { align: 'center' });
    doc.text("www.adamsjunioracademy.com", doc.internal.pageSize.width / 2, 40, { align: 'center' });

    // Title Section
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor);
    doc.text("End of Term Performance Report", doc.internal.pageSize.width / 2, 60, { align: 'center' });

    // Learner Information Section
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.text(`Learner's Name: ${student.name || 'N/A'}`, 20, 80);
    doc.text(`Admission No: ${student.admissionNo || 'N/A'}`, 20, 90);
    doc.text(` ${grade || 'N/A'}`, 20, 100);

    // Subject Performance Table Title
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text("Subjects and Performance Levels", doc.internal.pageSize.width / 2, 120, { align: 'center' });

    // Set up table structure
    const tableStartY = 130;
    let yPosition = tableStartY;

    // Add table headers
    doc.setFontSize(12);
    doc.setFillColor(tableHeaderColor);
    doc.setTextColor('#FFFFFF');
    doc.rect(20, yPosition, doc.internal.pageSize.width - 40, 10, 'F');
    doc.text("Subject", 25, yPosition + 7);
    doc.text("Marks", doc.internal.pageSize.width / 2, yPosition + 7, { align: 'center' });

    yPosition += 12;

    // List subjects and their marks
    subjectsByGrade[grade].forEach((subject, index) => {
        // Retrieve marks or fallback to 'N/A'
        const score = student[subject] !== undefined && student[subject] !== null ? String(student[subject]) : '0';

        // Alternate row color
        doc.setFillColor(index % 2 === 0 ? lightGray : '#FFFFFF');
        doc.rect(20, yPosition, doc.internal.pageSize.width - 40, 10, 'F');

        // Display the subject and marks
        doc.setTextColor(primaryColor);
        doc.text(subject, 25, yPosition + 7);
        doc.text(score, doc.internal.pageSize.width / 2, yPosition + 7, { align: 'center' });

        yPosition += 12;
    });

    // Footer Section
    doc.setFontSize(10);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text("For inquiries, please contact Adams Junior Academy", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, { align: 'center' });
    doc.text("www.adamsjunioracademy.com", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });

    // Save the PDF
    doc.save(`End_of_Term_Report_${student.admissionNo}.pdf`);
  };

  const calculateTotal = (student) => {
    const selectedSubjects = subjectsByGrade[grade] || [];
    return selectedSubjects.reduce((sum, subject) => sum + (parseInt(student[subject]) || 0), 0);
  };

  const handleAddStudent = () => {
    const newStudent = {
      id: Date.now(),
      admissionNo: "",
      name: "",
      ...Object.fromEntries((subjectsByGrade[grade] || []).map(sub => [sub, "0"])) ,
      total: 0,
    };
    newStudent.total = calculateTotal(newStudent);
    setStudents((prev) => [...prev, newStudent]);
    localStorage.setItem(`students_${grade}`, JSON.stringify([...students, newStudent]));
  };

  const handleEdit = (id, field, value) => {
    setStudents((prev) => {
      const updatedStudents = prev.map((student) => {
        if (student.id === id) {
          const updatedStudent = { ...student, [field]: value };
          if (subjectsByGrade[grade].includes(field)) {
            updatedStudent.total = calculateTotal(updatedStudent);
          }
          return updatedStudent;
        }
        return student;
      });
      localStorage.setItem(`students_${grade}`, JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(students);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, `Students_${grade}.xlsx`);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setStudents(json);
      localStorage.setItem(`students_${grade}`, JSON.stringify(json));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Teacher Dashboard</h2>
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel>Select Grade</InputLabel>
        <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
          {["Playgroup", "PP1", "PP2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"].map((g) => (
            <MenuItem key={g} value={g}>{g}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <Button variant="contained" color="primary" onClick={handleAddStudent}>Add Student</Button>
        <Button variant="contained" color="secondary" onClick={handleExport}>Export</Button>
        <input type="file" accept=".xlsx,.xls" onChange={handleImport} style={{ display: "none" }} id="import-file" />
        <label htmlFor="import-file">
          <Button variant="contained" component="span">Import</Button>
        </label>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Admission No</TableCell>
              <TableCell>Name</TableCell>
              {subjectsByGrade[grade]?.map((subject, index) => (
                <TableCell key={index}>{subject}</TableCell>
              ))}
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {students.map((student) => (
    <TableRow key={student.id}>
      {/* Editable Admission Number */}
      <TableCell>
        <TextField
          value={student.admissionNo}
          onChange={(e) => handleEdit(student.id, "admissionNo", e.target.value)}
          size="small"
        />
      </TableCell>

      {/* Editable Name */}
      <TableCell>
        <TextField
          value={student.name}
          onChange={(e) => handleEdit(student.id, "name", e.target.value)}
          size="small"
        />
      </TableCell>

      {/* Editable Subjects */}
      {subjectsByGrade[grade]?.map((subject) => (
        <TableCell key={subject}>
          <TextField
            value={student[subject]}
            onChange={(e) => handleEdit(student.id, subject, e.target.value)}
            size="small"
          />
        </TableCell>
      ))}

      {/* Display Total Marks */}
      <TableCell>{student.total}</TableCell>

      {/* Export to PDF Button */}
      <TableCell>
        <Button variant="outlined" onClick={() => exportIndividualPDF(student, grade)}>
          Export PDF
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}
