// Achievement definitions for the Flashcard app
// Each achievement has:
// - id: unique identifier
// - title: display name of the achievement
// - description: explanation of how to earn it
// - icon: emoji to represent the achievement
// - condition: function that determines if achievement is earned (provided in the component)

export const ACHIEVEMENT_TYPES = {
  MASTERY: 'mastery',          // For mastering cards
  STREAK: 'streak',            // For maintaining learning streaks
  DEDICATION: 'dedication',     // For number of reviews
  SPEED: 'speed'               // For quick responses
};

export const ACHIEVEMENTS = [
  {
    id: 'master_all',
    type: ACHIEVEMENT_TYPES.MASTERY,
    title: 'Master of Flashcards',
    description: 'Master all 15 flashcards',
    icon: '🏆',
    threshold: 15  // All 15 cards
  },
  {
    id: 'master_half',
    type: ACHIEVEMENT_TYPES.MASTERY,
    title: 'Halfway Hero',
    description: 'Master at least half of the flashcards',
    icon: '🌟',
    threshold: 7  // At least 7 cards (half of 15, rounded down)
  },
  {
    id: 'three_day_streak',
    type: ACHIEVEMENT_TYPES.STREAK,
    title: 'Consistent Learner',
    description: 'Maintain a learning streak of 3 days',
    icon: '🔥',
    threshold: 3  // 3-day streak
  },
  {
    id: 'seven_day_streak',
    type: ACHIEVEMENT_TYPES.STREAK,
    title: 'Weekly Warrior',
    description: 'Maintain a learning streak of 7 days',
    icon: '📅',
    threshold: 7  // 7-day streak
  },
  {
    id: 'review_count_50',
    type: ACHIEVEMENT_TYPES.DEDICATION,
    title: 'Dedicated Learner',
    description: 'Complete 50 card reviews',
    icon: '📚',
    threshold: 50  // 50 reviews
  },
  {
    id: 'review_count_100',
    type: ACHIEVEMENT_TYPES.DEDICATION,
    title: 'Learning Machine',
    description: 'Complete 100 card reviews',
    icon: '🤖',
    threshold: 100  // 100 reviews
  }
];

// Function to check if user has earned an achievement
export const checkAchievement = (achievementId, stats, streakDays, reviewCount) => {
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  
  if (!achievement) return false;
  
  switch (achievement.type) {
    case ACHIEVEMENT_TYPES.MASTERY:
      return stats.mastered >= achievement.threshold;
    
    case ACHIEVEMENT_TYPES.STREAK:
      return streakDays >= achievement.threshold;
    
    case ACHIEVEMENT_TYPES.DEDICATION:
      return reviewCount >= achievement.threshold;
    
    default:
      return false;
  }
};

// Function to get achievement details by ID
export const getAchievementById = (achievementId) => {
  return ACHIEVEMENTS.find(a => a.id === achievementId);
};

// Function to check for newly earned achievements
export const checkForNewAchievements = (stats, streakDays, reviewCount, earnedAchievements = {}) => {
  const newAchievements = {};
  let hasNewAchievements = false;
  
  ACHIEVEMENTS.forEach(achievement => {
    // Skip if already earned
    if (earnedAchievements[achievement.id]) return;
    
    const isAchieved = checkAchievement(achievement.id, stats, streakDays, reviewCount);
    
    if (isAchieved) {
      newAchievements[achievement.id] = {
        date: new Date().toISOString(),
        type: achievement.type,
        displayed: true // Mark that this achievement has been displayed to the user
      };
      hasNewAchievements = true;
    }
  });
  
  return { newAchievements, hasNewAchievements };
};
