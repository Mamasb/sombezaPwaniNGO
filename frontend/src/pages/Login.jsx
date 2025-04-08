import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Select, MenuItem } from "@mui/material";

function Login() {
  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ role, email }));

      if (role === "learner") navigate("/learner-dashboard");
      else if (role === "teacher") navigate("/teacher-dashboard");
      else if (role === "parent") navigate("/parent-dashboard");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Student Portal Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Select
          fullWidth
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        >
          <MenuItem value="learner">Learner</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="parent">Parent</MenuItem>
        </Select>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
