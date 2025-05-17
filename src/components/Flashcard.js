import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Flashcard({ card, isFlipped, onFlip, onResponse, onStart }) {
  // Animation state removed as per requirement
  const [showMasteredAnimation, setShowMasteredAnimation] = useState(false);
  
  // Mastered animation disabled - effect kept for consistency but never shows animation
  useEffect(() => {
    // Animation disabled - do nothing when card is mastered
    // This keeps the component structure intact while disabling the visual animation
  }, [card]);if (!card) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)"
          }}
          className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-800 rounded-xl shadow-lg p-6 flex items-center justify-center cursor-pointer transition-all"
          onClick={onStart}
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2
              }}
            >
              <p className="text-3xl font-bold text-white mb-3">
                Ready to Learn?
              </p>
              <p className="text-xl text-blue-100">
                Click to Start!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Only allow flipping from question to answer
  const handleCardClick = () => {
    if (!isFlipped) {
      onFlip();
    }
  };  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Card mastered animation overlay - disabled as per requirement */}
      <AnimatePresence>
        {/* Animation component kept for structure but never rendered */}
        {false && showMasteredAnimation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.2, 1], 
                rotate: [0, 5, -5, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 1.5, times: [0, 0.5, 1] }}
              className="bg-green-500 px-6 py-4 rounded-lg shadow-lg text-white text-center"
            >
              <span className="text-4xl block mb-1">🎓</span>
              <p className="text-xl font-bold">Card Mastered!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div 
        className="w-full h-64 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleCardClick}
      >
        <motion.div
          className="relative w-full h-full"
          initial={false}          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            scale: 1, // Removed pulsing animation for mastered cards
            boxShadow: card.level === 3 ? "0px 0px 15px rgba(139, 216, 99, 0.3)" : "none" // Reduced glow effect but kept some subtle indication
          }}          transition={{ 
            duration: 0.6, 
            type: "spring", 
            stiffness: 100
            // Removed all animation repeat patterns
          }}
          style={{ transformStyle: "preserve-3d" }}
        >          {/* Front of card - Question */}
          <motion.div
            className={`absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-center ${
              card.level === 3 ? 'border-2 border-green-400 dark:border-green-500' : ''
            }`}
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            {card.level === 3 && (
              <div className="absolute top-2 right-2">
                <span role="img" aria-label="mastered" className="text-lg">✓</span>
              </div>
            )}
            <p className="text-xl text-center font-medium dark:text-white">{card.question}</p>
          </motion.div>

          {/* Back of card - Answer and Buttons */}
          <motion.div
            className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl text-center mb-8 font-medium dark:text-white">{card.answer}</p>              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onResponse(true);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition-colors shadow-md flex items-center gap-2 font-medium"
                >
                  <span className="text-lg">✅</span> Know
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onResponse(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-colors shadow-md flex items-center gap-2 font-medium"
                >
                  <span className="text-lg">❌</span> Don't Know
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default React.memo(Flashcard);