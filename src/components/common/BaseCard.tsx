"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

const BaseCard = ({ children, className = "" }: BaseCardProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative", zIndex: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default BaseCard;
