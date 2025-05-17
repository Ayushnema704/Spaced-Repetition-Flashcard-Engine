import React from 'react';
import { motion } from 'framer-motion';

function WelcomeMessage({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">
        {name ? `Welcome, ${name}!` : 'Welcome to Spaced Repetition Flashcards!'}
      </h2>
      <p className="text-blue-700 dark:text-blue-300">
        This application uses spaced repetition to help you memorize information more effectively.
        Cards you find difficult will appear more frequently, while cards you know well will appear less often.
      </p>
      <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-md">
        <h3 className="font-bold text-gray-800 dark:text-white mb-2">How to use:</h3>
        <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
          <li>Click "Start" to begin with the flashcards</li>
          <li>Click on a card to reveal the answer</li>
          <li>Rate your knowledge by selecting "Know" or "Don't Know"</li>
          <li>Your progress is automatically saved to your account</li>
        </ol>
      </div>
    </motion.div>
  );
}

export default WelcomeMessage;
