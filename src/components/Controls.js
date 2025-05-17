import React from 'react';
import { motion } from 'framer-motion';

function Controls({ isDarkMode, onToggleDarkMode, onReset, onShuffle, reviewHistory }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-white">Controls</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleDarkMode}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShuffle}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 Shuffle
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🔄 Reset
          </motion.button>
        </div>
      </div>

      {/* Review History */}
      {reviewHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Recent Reviews</h3>
          <div className="space-y-2">
            {reviewHistory.slice(0, 5).map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-700 dark:text-gray-200">{review.question}</span>
                <span className={review.isKnown ? 'text-green-500' : 'text-red-500'}>
                  {review.isKnown ? '✅' : '❌'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default React.memo(Controls); 