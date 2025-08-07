// components/AnimatedMenuItem.jsx
import React from 'react';
import { motion } from 'framer-motion';

const animations = {
  explore: {
    whileHover: {
      backgroundColor: '#f1f5f9', // subtle gray on hover
      scale: 1.03,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  },
  learn: {
    whileHover: {
      backgroundColor: '#fef3c7', // soft yellow
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  donate: {
    whileHover: {
      backgroundColor: '#fee2e2', // light red
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  messages: {
    whileHover: {
      backgroundColor: '#d1fae5', // mint green
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  careers: {
    whileHover: {
      backgroundColor: '#fce7f3', // soft rose
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
};

const AnimatedMenuItem = ({ label, link, animationKey }) => (
  <motion.li
    className="menu-item"
    {...(animations[animationKey] || {})}
  >
    <a href={link || '#'} className="animated-link">
      {label}
    </a>
  </motion.li>
);

export default AnimatedMenuItem;
