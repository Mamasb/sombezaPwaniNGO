import React from 'react';
import { motion, easeOut } from 'framer-motion';

type AnimationKey = 'explore' | 'learn' | 'donate' | 'messages' | 'careers';

const animations: Record<AnimationKey, {
  whileHover: {
    backgroundColor: string;
    scale: number;
    transition: {
      duration: number;
      ease?: (t: number) => number;
    };
  };
}> = {
  explore: {
    whileHover: {
      backgroundColor: '#f1f5f9',
      scale: 1.03,
      transition: { duration: 0.2, ease: easeOut },
    },
  },
  learn: {
    whileHover: {
      backgroundColor: '#fef3c7',
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  donate: {
    whileHover: {
      backgroundColor: '#fee2e2',
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  messages: {
    whileHover: {
      backgroundColor: '#d1fae5',
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
  careers: {
    whileHover: {
      backgroundColor: '#fce7f3',
      scale: 1.03,
      transition: { duration: 0.2 },
    },
  },
};

interface AnimatedMenuItemProps {
  label: string;
  link?: string;
  animationKey: AnimationKey;
}

const AnimatedMenuItem: React.FC<AnimatedMenuItemProps> = ({
  label,
  link = '#',
  animationKey,
}) => (
  <motion.li className="menu-item" {...animations[animationKey]}>
    <a href={link} className="animated-link">
      {label}
    </a>
  </motion.li>
);

export default AnimatedMenuItem;
