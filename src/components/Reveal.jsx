import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Reveal = ({ children, className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  // Respect reduced motion preference
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;