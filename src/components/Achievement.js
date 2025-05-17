import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from './Confetti';
import AchievementStats from './AchievementStats';
import ShareAchievement from './ShareAchievement';
import { getAchievementById } from '../data/achievements';

function Achievement({ isVisible, onClose, stats, streakDays = 1, achievementId = 'master_all' }) {
  const [achievementDetails, setAchievementDetails] = useState(null);
  const [isCompletionAchievement, setIsCompletionAchievement] = useState(false);
  
  // Get achievement details when achievementId changes
  useEffect(() => {
    if (achievementId) {
      setAchievementDetails(getAchievementById(achievementId));
      // Check if this is the completion achievement
      setIsCompletionAchievement(achievementId === 'master_all' && stats?.known === stats?.total && stats?.total > 0);
    }
  }, [achievementId, stats]);
  
  // Close achievement modal after 10 seconds (longer for completion achievement)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, isCompletionAchievement ? 15000 : 10000); // Longer timeout for completion achievement
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, isCompletionAchievement]);
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">          {/* Confetti background */}
          <Confetti isIntense={isCompletionAchievement} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: isCompletionAchievement 
                ? ["0px 0px 0px rgba(0,0,0,0.3)", "0px 0px 30px rgba(255, 215, 0, 0.8)", "0px 0px 0px rgba(0,0,0,0.3)"] 
                : "0px 10px 30px rgba(0,0,0,0.3)"
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 15,
              boxShadow: { repeat: isCompletionAchievement ? Infinity : 0, duration: 2 }
            }}
            className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md mx-4 border-8 border-double ${
              isCompletionAchievement ? 'border-yellow-500' : 'border-yellow-400'
            }`}
          >
            {/* Certificate-like design elements */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500 opacity-20">
                <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-500 opacity-20">
                <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
              </svg>
            </div>
            
            {/* Date stamp */}
            <div className="absolute top-4 right-4 rounded-full bg-blue-100 dark:bg-blue-900 p-2 text-xs font-mono text-blue-800 dark:text-blue-200 transform rotate-12 border border-blue-300 dark:border-blue-700">
              {new Date().toLocaleDateString()}
            </div>
            
            <div className="text-center">
              {/* Certificate header */}
              <div className="mb-4 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Achievement Unlocked</div>              <motion.div 
                initial={{ rotate: 0, scale: 0.8 }}
                animate={{ 
                  rotate: isCompletionAchievement ? [0, 15, -15, 15, 0] : [0, 10, -10, 10, 0],
                  scale: isCompletionAchievement ? [1, 1.4, 1, 1.4, 1] : 1.2,
                  y: isCompletionAchievement ? [0, -10, 0] : 0
                }}
                transition={{ 
                  duration: isCompletionAchievement ? 1.5 : 1, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                className="inline-block mb-2"
              >
                <span role="img" aria-label={achievementDetails?.title || "achievement"} className={`${isCompletionAchievement ? 'text-7xl' : 'text-6xl'}`}>
                  {achievementDetails?.icon || (isCompletionAchievement ? "👑" : "🏆")}
                </span>
                {isCompletionAchievement && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <span className="text-7xl" role="img" aria-label="sparkle">✨</span>
                  </motion.div>
                )}
              </motion.div>              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0, scale: isCompletionAchievement ? [1, 1.05, 1] : 1 }}
                transition={{ 
                  scale: { repeat: isCompletionAchievement ? Infinity : 0, duration: 2 }
                }}                className={`${isCompletionAchievement ? 'text-3xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600' : 'text-2xl dark:text-white'} font-bold mb-2`}
              >
                {isCompletionAchievement ? "Complete Mastery Achieved!" : 
                  (achievementId && achievementDetails ? 
                    achievementDetails.title : 
                    "Achievement Unlocked")}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`${isCompletionAchievement ? 'text-lg' : ''} text-gray-600 dark:text-gray-300 mb-4`}
              >                {isCompletionAchievement ? (
                  <>
                    <span className="font-bold">Extraordinary achievement!</span> You've mastered all {stats?.total} flashcards! 
                    Your dedication and perseverance have led to complete mastery of the material.
                  </>
                ) : (
                  <>
                    Congratulations! {" "}
                    {achievementId && achievementDetails ? 
                      achievementDetails.description : 
                      "You've earned an achievement!"} {" "}
                    Your dedication to learning has paid off.
                  </>
                )}
              </motion.p>
              
              {/* Display stats */}
              <AchievementStats stats={stats || {}} streakDays={streakDays} />
                <div className="flex justify-center gap-4 mt-4">                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    // Call onClose to close the modal
                    onClose();
                    // Trigger the reset cards via App component's reset logic
                    if (window.resetCards) {
                      window.resetCards();
                    }
                  }}
                >
                  Continue Learning
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => {
                    // Create a virtual element to trigger a download
                    const element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
                      encodeURIComponent(`ACHIEVEMENT CERTIFICATE
                      
Master of Flashcards

This certifies that you have successfully mastered all 15 flashcards
in the Spaced Repetition Flashcard Engine on ${new Date().toLocaleDateString()}.

Stats:
- Cards Mastered: ${stats ? stats.mastered : 15}/15
- Learning Streak: ${streakDays} days

Congratulations on your achievement!`));
                    element.setAttribute('download', 'flashcard-achievement.txt');
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                >
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Save Certificate
                  </span>
                </motion.button>
              </div>
              
              {/* Share achievement on social media */}
              <ShareAchievement stats={stats} streakDays={streakDays} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Achievement;
