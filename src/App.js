import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Flashcard from './components/Flashcard';
import Stats from './components/Stats';
import Controls from './components/Controls';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import WelcomeMessage from './components/WelcomeMessage';
import Achievement from './components/Achievement';
import LandingPage from './components/LandingPage';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { SAMPLE_CARDS, CARD_LEVELS } from './data/cards';
import { checkForNewAchievements } from './data/achievements';
import './App.css';

function AppContent() {
  const { currentUser, updateUserData } = useAuth();
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [reviewHistory, setReviewHistory] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [streakDays, setStreakDays] = useState(1);
  const [reviewCount, setReviewCount] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState(null);  const [stats, setStats] = useState({
    total: 0,
    known: 0,
    unknown: 0,
    new: 0,
    learning: 0,
    mastered: 0
  });  // Track whether completion achievement has been displayed
  const [completionAchievementShown, setCompletionAchievementShown] = useState(
    () => JSON.parse(localStorage.getItem('completionAchievementShown') || 'false')
  );
  // Check and update learning streak
  const updateLearningStreak = () => {
    // Get the last login date from localStorage
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
    
    if (!lastLoginDate) {
      // First time login
      localStorage.setItem('lastLoginDate', today);
      localStorage.setItem('streakDays', '1');
      setStreakDays(1);
      return;
    }
    
    // Calculate date difference
    const lastDate = new Date(lastLoginDate);
    const currentDate = new Date(today);
    const diffTime = currentDate - lastDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let currentStreak = parseInt(localStorage.getItem('streakDays') || '1');
    
    if (diffDays === 0) {
      // Same day login, do nothing
    } else if (diffDays === 1) {
      // Consecutive day login, increase streak
      currentStreak += 1;
      localStorage.setItem('streakDays', currentStreak.toString());
      localStorage.setItem('lastLoginDate', today);
    } else {
      // Streak broken
      currentStreak = 1;
      localStorage.setItem('streakDays', '1');
      localStorage.setItem('lastLoginDate', today);
    }
    
    setStreakDays(currentStreak);
    
    return currentStreak;
  };
  // Load preferences and user data from localStorage
  useEffect(() => {    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    
    // Load user cards if logged in
    if (currentUser && currentUser.cards && currentUser.cards.length > 0) {
      setCards(currentUser.cards);
      if (currentUser.stats) {
        setStats(currentUser.stats);
      }
      if (currentUser.reviewCount !== undefined) {
        setReviewCount(currentUser.reviewCount);
      }
      
      // Update streak for logged in users
      updateLearningStreak();
    }
  }, [currentUser]);
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  // Save completion achievement shown state to localStorage
  useEffect(() => {
    localStorage.setItem('completionAchievementShown', JSON.stringify(completionAchievementShown));
  }, [completionAchievementShown]);

  // Update dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update statistics based on card states
  const updateStats = (cardList) => {
    const newStats = {
      total: cardList.length,
      known: cardList.filter(card => card.level === CARD_LEVELS.MASTERED).length,
      unknown: cardList.filter(card => card.level !== CARD_LEVELS.MASTERED).length,
      new: cardList.filter(card => card.level === CARD_LEVELS.NEW).length,
      learning: cardList.filter(card => card.level === CARD_LEVELS.LEARNING).length,
      mastered: cardList.filter(card => card.level === CARD_LEVELS.MASTERED).length
    };
    setStats(newStats);
  };
  // Start the flashcards
  const handleStart = () => {
    // If user is logged in and has cards, use those, otherwise use sample cards
    if (currentUser && currentUser.cards && currentUser.cards.length > 0) {
      setCards(currentUser.cards);
      if (currentUser.stats) {
        setStats(currentUser.stats);
      }
    } else {
      const initialCards = SAMPLE_CARDS.map(card => ({
        ...card,
        level: CARD_LEVELS.NEW,
        lastReviewed: null,
        reviewCount: 0
      }));
      setCards(initialCards);
      updateStats(initialCards);
      
      // If user is logged in, save these cards to their account
      if (currentUser) {
        updateUserData(initialCards, stats);
      }
    }
    setIsFlipped(false);
  };

  // Handle card flip
  const handleCardFlip = () => {
    if (cards.length > 0) {
      setIsFlipped(!isFlipped);
    }
  };

  // Handle card response
  const handleCardResponse = (isKnown) => {
    const updatedCards = [...cards];
    const currentCard = updatedCards[currentCardIndex];
    
    currentCard.lastReviewed = new Date().toISOString();
    currentCard.reviewCount += 1;
      // Update card level based on response
    if (isKnown) {
      currentCard.level = Math.min(currentCard.level + 1, CARD_LEVELS.MASTERED);
    } else {
      currentCard.level = CARD_LEVELS.NEW;
    }

    // Add to review history
    const updatedReviewHistory = [{
      question: currentCard.question,
      isKnown,
      timestamp: new Date().toISOString()
    }, ...reviewHistory].slice(0, 50); // Keep last 50 reviews
    
    setReviewHistory(updatedReviewHistory);

    setCards(updatedCards);    // Update stats
    const updatedStats = {
      total: updatedCards.length,
      known: updatedCards.filter(card => card.level === CARD_LEVELS.MASTERED).length,
      unknown: updatedCards.filter(card => card.level !== CARD_LEVELS.MASTERED).length,
      new: updatedCards.filter(card => card.level === CARD_LEVELS.NEW).length,
      learning: updatedCards.filter(card => card.level === CARD_LEVELS.LEARNING).length,
      mastered: updatedCards.filter(card => card.level === CARD_LEVELS.MASTERED).length
    };
    
    updateStats(updatedCards);
    
    // Update review count
    const updatedReviewCount = reviewCount + 1;
    setReviewCount(updatedReviewCount);
    
    // Check for any new achievements
    const { newAchievements, hasNewAchievements } = checkForNewAchievements(
      updatedStats, 
      streakDays, 
      updatedReviewCount, 
      currentUser?.achievements || {}
    );
      // If a new achievement is earned, show achievement modal
    if (hasNewAchievements) {
      // Get the first new achievement key
      const newAchievementId = Object.keys(newAchievements)[0];
      
      // Only show achievements that haven't been displayed yet
      const userAchievements = currentUser?.achievements || {};
      const achievementData = userAchievements[newAchievementId] || newAchievements[newAchievementId];
      
      // If the achievement hasn't been displayed or doesn't have the displayed flag
      if (!achievementData.displayed) {
        // Set as current achievement to be displayed
        setCurrentAchievement(newAchievementId);
        setShowAchievement(true);
        
        // Mark it as displayed
        if (userAchievements[newAchievementId]) {
          userAchievements[newAchievementId].displayed = true;
        }
      }
    }
    
    // Update user data if logged in
    if (currentUser) {
      // Save achievement info along with user data
      const userDataToSave = {
        cards: updatedCards,
        stats: updatedStats,
        reviewCount: updatedReviewCount,
        achievements: {
          ...currentUser.achievements || {},
          ...newAchievements
        }
      };
      
      updateUserData(updatedCards, updatedStats, userDataToSave.achievements, updatedReviewCount);
    }

    // Move to next card and reset flip state
    setIsFlipped(false);
    const nextIndex = (currentCardIndex + 1) % cards.length;
    setCurrentCardIndex(nextIndex);
  };  // Reset all progress
  const handleReset = () => {
    setCards([]);
    const emptyStats = {
      total: 0,
      known: 0,
      unknown: 0,
      new: 0,
      learning: 0,
      mastered: 0
    };
    setStats(emptyStats);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setReviewHistory([]);
    setShowAchievement(false); // Reset achievement state
    setCompletionAchievementShown(false); // Reset completion achievement flag
    
    // If user is logged in, update their data
    if (currentUser) {
      updateUserData([], emptyStats);
    }
  };

  // Shuffle cards
  const handleShuffle = () => {
    if (cards.length > 0) {
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };
  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Expose the handleReset function to the global window for Achievement component's "Continue Learning" button
  useEffect(() => {
    // Create a function that will reset cards and shuffle them
    window.resetCards = () => {
      if (cards.length > 0) {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setCurrentCardIndex(0);
        setIsFlipped(false);
      }
    };
    
    return () => {
      // Clean up when component unmounts
      delete window.resetCards;
    };
  }, [cards]);return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-200"
    >      {/* Achievement Modal */}
      <Achievement 
        isVisible={showAchievement} 
        onClose={() => setShowAchievement(false)}
        stats={stats}
        streakDays={streakDays}
        achievementId={currentAchievement}
      />
      
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-center mb-8 dark:text-white"
        >
          Spaced Repetition Flashcards
        </motion.h1>        {currentUser ? (
          <>
            <UserProfile />
            
            {cards.length === 0 && (
              <WelcomeMessage name={currentUser.name} />
            )}
              <Controls
              isDarkMode={isDarkMode}
              onToggleDarkMode={handleToggleDarkMode}
              onReset={handleReset}
              onShuffle={handleShuffle}
              reviewHistory={reviewHistory}
            />            <Stats
              stats={stats}
              onComplete={() => {
                // Only show completion achievement if it hasn't been shown before
                if (!completionAchievementShown) {
                  setCurrentAchievement('master_all');
                  setShowAchievement(true);
                  setCompletionAchievementShown(true);
                }
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Flashcard
                card={cards[currentCardIndex]}
                isFlipped={isFlipped}
                onFlip={handleCardFlip}
                onResponse={handleCardResponse}
                onStart={handleStart}
              />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Login />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Loading component for initial app load
function AppLoading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading your flashcards...</p>
      </div>
    </div>
  );
}

// Wrap the app with AuthProvider
function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <AppLoading />;
  }
  
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

// Component that uses auth context
function AppWithAuth() {
  const { currentUser } = useAuth();
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          currentUser ? <Navigate to="/flashcards" /> : <LandingPage />
        } />
        <Route path="/flashcards" element={<AppContent />} />
        <Route path="/login" element={<Login />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;