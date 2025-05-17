import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthContext';

function UserProfile() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium dark:text-white">{currentUser.name}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{currentUser.email}</p>
          </div>
        </div>        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Logout
        </motion.button>
      </div>
    </div>
  );
}

export default UserProfile;
