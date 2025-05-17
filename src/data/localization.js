// Localization support for the Flashcard app

// Supported languages
export const LANGUAGES = {
  EN: 'en',  // English
  ES: 'es',  // Spanish
  FR: 'fr',  // French
  DE: 'de',  // German
  JA: 'ja',  // Japanese
  ZH: 'zh'   // Chinese
};

// Achievement translations
export const ACHIEVEMENT_TRANSLATIONS = {
  // English (default)
  [LANGUAGES.EN]: {
    'master_all': {
      title: 'Master of Flashcards',
      description: 'Master all 15 flashcards'
    },
    'master_half': {
      title: 'Halfway Hero',
      description: 'Master at least half of the flashcards'
    },
    'three_day_streak': {
      title: 'Consistent Learner',
      description: 'Maintain a learning streak of 3 days'
    },
    'seven_day_streak': {
      title: 'Weekly Warrior',
      description: 'Maintain a learning streak of 7 days'
    },
    'review_count_50': {
      title: 'Dedicated Learner',
      description: 'Complete 50 card reviews'
    },
    'review_count_100': {
      title: 'Learning Machine',
      description: 'Complete 100 card reviews'
    },
    // Generic messages
    'achievement_unlocked': 'Achievement Unlocked',
    'congratulations': 'Congratulations!',
    'dedication_message': 'Your dedication to learning has paid off.'
  },
  
  // Spanish
  [LANGUAGES.ES]: {
    'master_all': {
      title: 'Maestro de Tarjetas',
      description: 'Dominar todas las 15 tarjetas'
    },
    'master_half': {
      title: 'Héroe a Medio Camino',
      description: 'Dominar al menos la mitad de las tarjetas'
    },
    'three_day_streak': {
      title: 'Aprendiz Constante',
      description: 'Mantener una racha de aprendizaje de 3 días'
    },
    'seven_day_streak': {
      title: 'Guerrero Semanal',
      description: 'Mantener una racha de aprendizaje de 7 días'
    },
    'review_count_50': {
      title: 'Estudiante Dedicado',
      description: 'Completar 50 revisiones de tarjetas'
    },
    'review_count_100': {
      title: 'Máquina de Aprendizaje',
      description: 'Completar 100 revisiones de tarjetas'
    },
    // Generic messages
    'achievement_unlocked': 'Logro Desbloqueado',
    'congratulations': '¡Felicidades!',
    'dedication_message': 'Tu dedicación al aprendizaje ha dado sus frutos.'
  },
  
  // French
  [LANGUAGES.FR]: {
    'master_all': {
      title: 'Maître des Cartes',
      description: 'Maîtriser les 15 cartes'
    },
    'master_half': {
      title: 'Héros à Mi-chemin',
      description: 'Maîtriser au moins la moitié des cartes'
    },
    'three_day_streak': {
      title: 'Apprenant Constant',
      description: 'Maintenir une série d\'apprentissage de 3 jours'
    },
    'seven_day_streak': {
      title: 'Guerrier Hebdomadaire',
      description: 'Maintenir une série d\'apprentissage de 7 jours'
    },
    'review_count_50': {
      title: 'Apprenant Dévoué',
      description: 'Compléter 50 révisions de cartes'
    },
    'review_count_100': {
      title: 'Machine d\'Apprentissage',
      description: 'Compléter 100 révisions de cartes'
    },
    // Generic messages
    'achievement_unlocked': 'Succès Débloqué',
    'congratulations': 'Félicitations !',
    'dedication_message': 'Votre dévouement à l\'apprentissage a porté ses fruits.'
  }
};

// Function to get localized text
export const getLocalizedText = (key, language = LANGUAGES.EN, subKey = null) => {
  // Default to English if the requested language isn't available
  const translations = ACHIEVEMENT_TRANSLATIONS[language] || ACHIEVEMENT_TRANSLATIONS[LANGUAGES.EN];
  
  if (!translations) {
    return key; // Fallback to key if no translations found
  }
  
  if (subKey && translations[key]) {
    return translations[key][subKey] || key;
  }
  
  return translations[key] || key;
};
