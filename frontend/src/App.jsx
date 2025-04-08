import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import Navbar from "./components/Navbar";

// Function to check authentication
const isAuthenticated = () => !!localStorage.getItem("user");

// Backdoor function: If ?dev=true is in the URL, allow access
const isDeveloperMode = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("dev") === "true";
};

// Higher Order Component for Protected Routes
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() || isDeveloperMode() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<ProtectedRoute element={<StudentDashboard />} />} />
        <Route path="/teacher-dashboard" element={<ProtectedRoute element={<TeacherDashboard />} />} />
        <Route path="/parent-dashboard" element={<ProtectedRoute element={<ParentDashboard />} />} />
      </Routes>
    </>
  );
}

export default App;
