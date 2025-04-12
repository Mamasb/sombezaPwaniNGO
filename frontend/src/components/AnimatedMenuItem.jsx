// components/AnimatedMenuItem.jsx
import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  explore: {
    whileHover: {
      rotate: 360,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  },
  learn: {
    whileHover: {
      scale: 1.2,
      borderRadius: "50%",
      backgroundColor: "#facc15", // yellow highlight
      transition: { duration: 0.3 },
    },
  },
  donate: {
    whileHover: {
      x: 10,
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  },
  messages: {
    whileHover: {
      rotate: -10,
      backgroundColor: "#34d399", // green
      transition: { type: "spring", stiffness: 250 },
    },
  },
  careers: {
    whileHover: {
      scale: 1.05,
      color: "#e11d48", // rose
      textShadow: "0px 0px 8px rgba(255, 0, 0, 0.8)",
      transition: { duration: 0.3 },
    },
  },
};

const AnimatedMenuItem = ({ label, link, animationKey }) => (
  <motion.li
    className="menu-item"
    {...animations[animationKey]}
  >
    {link ? <a href={link}>{label}</a> : label}
  </motion.li>
);

export default AnimatedMenuItem;
