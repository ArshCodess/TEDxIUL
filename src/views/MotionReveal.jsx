"use client";
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  }
};

export function PremiumScrollReveal({ 
  children, 
  variant = 'slideUp', 
  delay = 0, 
  duration = 0.8, 
  className = "" 
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[variant] || variants.slideUp}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.25, 0.1, 0.25, 1], // Custom premium easing (cubic-bezier)
      }}
    >
      {children}
    </motion.div>
  );
}
