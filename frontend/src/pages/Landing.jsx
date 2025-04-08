import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Section 1 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="section"
      >
        <Container maxWidth="md" style={{ textAlign: "center", padding: "50px 0" }}>
          <Typography variant="h2">Welcome to the Student Portal</Typography>
          <Typography variant="h6">Manage Student Results Easily</Typography>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Get Started
          </Button>
        </Container>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="section"
      >
        <Container maxWidth="md" style={{ textAlign: "center", padding: "50px 0" }}>
          <Typography variant="h4">For Teachers</Typography>
          <Typography variant="body1">Easily add student marks and send results to parents via WhatsApp, SMS, or PDF.</Typography>
        </Container>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="section"
      >
        <Container maxWidth="md" style={{ textAlign: "center", padding: "50px 0" }}>
          <Typography variant="h4">For Students</Typography>
          <Typography variant="body1">Instantly view your academic performance and progress.</Typography>
        </Container>
      </motion.div>

      {/* Section 4 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="section"
      >
        <Container maxWidth="md" style={{ textAlign: "center", padding: "50px 0" }}>
          <Typography variant="h4">For Parents</Typography>
          <Typography variant="body1">Stay updated on your child's performance with instant notifications.</Typography>
        </Container>
      </motion.div>
    </div>
  );
}

export default Landing;
