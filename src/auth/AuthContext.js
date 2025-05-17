import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('flashcardUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // User login function
  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('flashcardUsers') || '[]');
    
    // Find user by email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Don't store password in session
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      
      // Set current user in state and localStorage
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('flashcardUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  // User registration function
  const register = (name, email, password) => {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('flashcardUsers') || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return { success: false, message: "Email already registered" };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      cards: [],
      stats: {
        total: 0,
        known: 0,
        unknown: 0,
        new: 0,
        learning: 0,
        mastered: 0
      }
    };
    
    // Save updated users list
    const updatedUsers = [...users, newUser];
    localStorage.setItem('flashcardUsers', JSON.stringify(updatedUsers));
    
    // Login the user (without password in session)
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('flashcardUser', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  // User logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('flashcardUser');
  };  // Update user data (cards, stats, achievements, reviewCount)
  const updateUserData = (cards, stats, achievements = null, reviewCount = null) => {
    if (!currentUser) return;

    // Update current user state
    const updatedUser = {
      ...currentUser,
      cards,
      stats,
      // Only update achievements if provided, otherwise keep existing
      ...(achievements !== null && { achievements }),
      // Only update reviewCount if provided, otherwise keep existing
      ...(reviewCount !== null && { reviewCount })
    };
    
    setCurrentUser(updatedUser);
    
    // Update in localStorage session
    localStorage.setItem('flashcardUser', JSON.stringify(updatedUser));
    
    // Update in users database
    const users = JSON.parse(localStorage.getItem('flashcardUsers') || '[]');
    const updatedUsers = users.map(user => {      if (user.id === currentUser.id) {
        // Keep the password from the original user
        const updatedUserData = { 
          ...user, 
          cards, 
          stats,
          ...(achievements !== null && { achievements }),
          ...(reviewCount !== null && { reviewCount })
        };
        return updatedUserData;
      }
      return user;
    });
    
    localStorage.setItem('flashcardUsers', JSON.stringify(updatedUsers));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
