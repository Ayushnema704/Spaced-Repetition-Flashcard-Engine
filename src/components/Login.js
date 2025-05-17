import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Basic validation
      if (!email.trim() || !password.trim()) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }
      
      if (!isLogin && !name.trim()) {
        setError('Name is required');
        setLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      
      if (!isValidEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
        if (isLogin) {
        // Login
        const success = login(email, password);
        if (!success) {
          setError('Invalid email or password');
        } else {
          // Navigate to flashcards page after successful login
          navigate('/flashcards');
        }
      } else {
        // Register
        const result = register(name, email, password);
        if (!result.success) {
          setError(result.message);
        } else {
          // Navigate to flashcards page after successful registration
          navigate('/flashcards');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
    
    setLoading(false);
  };
  
  // Email validation function
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setError('');
  };
  
  return (    <div className="w-full max-w-md mx-auto">
      <Link to="/" className="block text-blue-600 dark:text-blue-400 mb-4 text-center hover:underline">
        ← Back to Home
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your password"
              required
            />
          </div>
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </span>
            ) : (
              isLogin ? 'Login' : 'Register'
            )}
          </motion.button>
        </form>
          <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
        
        <div className="mt-6 text-center border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={() => {
              // Create a demo account if it doesn't exist
              const users = JSON.parse(localStorage.getItem('flashcardUsers') || '[]');
              const demoEmail = 'demo@example.com';
              let demoUser = users.find(u => u.email === demoEmail);
              
              if (!demoUser) {
                demoUser = {
                  id: 'demo-user',
                  name: 'Demo User',
                  email: demoEmail,
                  password: 'demo123',
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
                localStorage.setItem('flashcardUsers', JSON.stringify([...users, demoUser]));
              }
              
              const success = login(demoEmail, 'demo123');
              if (success) {
                navigate('/flashcards');
              }
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            Try Demo Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
