"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
export { PageTemplate };
