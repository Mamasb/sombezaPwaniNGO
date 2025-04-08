import { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Mock data for now (Replace with Flask API call)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    
    const mockStudent = {
      name: "John Doe",
      grade: "Grade 5",
      parentContact: "+123456789",
      subjects: [
        { name: "Mathematics", marks: 85, comment: "Great work!" },
        { name: "English", marks: 78, comment: "Needs improvement in grammar." },
        { name: "Science", marks: 90, comment: "Excellent performance!" },
      ],
    };

    setStudent(mockStudent);
  }, []);

  if (!student) return <Typography variant="h5">Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{student.name}'s Portal</Typography>
      <Typography variant="h6">Grade: {student.grade}</Typography>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Teacher's Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.subjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.marks}</TableCell>
                <TableCell>{subject.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default StudentDashboard;
