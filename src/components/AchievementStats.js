import React from 'react';
import { motion } from 'framer-motion';

function AchievementStats({ stats, streakDays }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 my-4"
    >
      <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">Your Learning Stats</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Cards</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Mastered</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.mastered}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Streak</p>
          <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">{streakDays} days</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Accuracy</p>
          <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
            {stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%
          </p>
        </div>
      </div>
      
      <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Mastery Progress</p>
          <p className="text-sm font-semibold">{stats.mastered}/{stats.total}</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${stats.total > 0 ? (stats.mastered / stats.total) * 100 : 0}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default AchievementStats;
