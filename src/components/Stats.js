import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function Stats({ stats, onComplete }) {
  const progress = (stats.known / stats.total) * 100;
  
  // Check if all cards are known (progress is 100%)
  useEffect(() => {
    if (progress === 100 && stats.total > 0) {
      // Trigger achievement notification after a small delay to allow the progress bar to animate
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [progress, stats.total, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Progress</h2>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
        <motion.div
          className="bg-blue-500 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-1">Total Cards</p>
          <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-1">Known</p>
          <p className="text-2xl font-bold text-green-500">{stats.known}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-1">Unknown</p>
          <p className="text-2xl font-bold text-red-500">{stats.unknown}</p>
        </motion.div>
      </div>

      {/* Level distribution */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Card Levels</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">New</p>
            <p className="text-xl font-bold text-blue-500">{stats.new}</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Learning</p>
            <p className="text-xl font-bold text-yellow-500">{stats.learning}</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Mastered</p>
            <p className="text-xl font-bold text-purple-500">{stats.mastered}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(Stats); 