import React from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../data/localization';

function LanguageSelector({ currentLanguage, onLanguageChange }) {
  // Language options with their display names and flags
  const languageOptions = [
    { code: LANGUAGES.EN, name: 'English', flag: '🇺🇸' },
    { code: LANGUAGES.ES, name: 'Español', flag: '🇪🇸' },
    { code: LANGUAGES.FR, name: 'Français', flag: '🇫🇷' },
    { code: LANGUAGES.DE, name: 'Deutsch', flag: '🇩🇪' },
    { code: LANGUAGES.JA, name: '日本語', flag: '🇯🇵' },
    { code: LANGUAGES.ZH, name: '中文', flag: '🇨🇳' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-4"
    >
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
        Language / Idioma / Langue
      </h3>
      <div className="flex flex-wrap gap-2">
        {languageOptions.map(lang => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${
              currentLanguage === lang.code 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => onLanguageChange(lang.code)}
          >
            <span role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
            {lang.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default LanguageSelector;
