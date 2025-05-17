import React from 'react';
import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center my-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}

export default LoadingSpinner;
