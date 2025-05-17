import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  
  // Define animations
  const styles = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse {
      0% { opacity: 0.6; transform: scale(0.95); }
      50% { opacity: 1; transform: scale(1); }
      100% { opacity: 0.6; transform: scale(0.95); }
    }
    
    @keyframes blob {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
    
    .float {
      animation: float 6s ease-in-out infinite;
    }
    
    .pulse {
      animation: pulse 4s ease-in-out infinite;
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
  `;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950">
      {/* Add the style tag for custom animations */}
      <style>{styles}</style>
      
      {/* Decorative background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 dark:bg-blue-900 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 opacity-20 rounded-full blur-3xl translate-x-1/3 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 dark:bg-purple-900 opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/4 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Navigation */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              FlashMaster
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#features">Features</a>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#testimonials">Testimonials</a>
            <a className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#faq">FAQ</a>
            <button 
              onClick={() => navigate('/login')} 
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-gray-700 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-16 relative">
          {/* Floating badge */}
          <div className="absolute right-10 top-0 transform -translate-y-1/2 hidden md:block">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full py-2 px-4 border border-blue-100 dark:border-blue-900 pulse">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                New: AI-powered learning paths
              </span>
            </div>
          </div>
          
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Master Any Subject
              </span> 
              <br />with Spaced Repetition
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              The science-backed flashcard system that helps you learn more efficiently
              and remember information longer.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Get Started Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                onClick={() => {
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </motion.button>
            </div>
            
            {/* Floating metrics */}
            <div className="mt-12 flex space-x-4">
              <div className="py-1 px-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full text-xs text-indigo-700 dark:text-indigo-300 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                10x Faster Learning
              </div>
              <div className="py-1 px-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs text-blue-700 dark:text-blue-300 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                95% Retention Rate
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative float">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-400 dark:from-blue-600 dark:to-indigo-700 rounded-xl transform rotate-3 shadow-xl"></div>
              
              {/* Device frame */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                <div className="h-6 bg-gray-100 dark:bg-gray-700 flex items-center px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <img 
                  src="/images/flashcard-demo.png" 
                  alt="Flashcard Demo" 
                  className="relative w-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/500x300/e2e8f0/2d3748?text=Flashcard+Demo";
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-300 dark:bg-yellow-500 rounded-full opacity-20 blur-xl pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-300 dark:bg-blue-500 rounded-full opacity-20 blur-xl pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16">
          {[
            { number: "10x", text: "Faster Learning", icon: "⚡" },
            { number: "95%", text: "Retention Rate", icon: "🧠" },
            { number: "500k+", text: "Flashcards Created", icon: "📚" },
            { number: "4.8/5", text: "User Rating", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="mb-2 text-2xl">{stat.icon}</div>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{stat.number}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div id="features" className="py-16">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our Flashcard System?
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Our platform combines proven learning techniques with modern technology to create the most effective study experience.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Spaced Repetition Algorithm",
                description: "Our intelligent algorithm schedules reviews at optimal intervals to maximize retention while minimizing study time.",
                icon: "🧠",
                color: "from-blue-500 to-indigo-500"
              },
              {
                title: "Achievement System",
                description: "Stay motivated with our gamified achievement system that rewards consistent study and mastery.",
                icon: "🏆",
                color: "from-indigo-500 to-purple-500"
              },
              {
                title: "Progress Tracking",
                description: "Visualize your learning progress with detailed statistics and insights on your knowledge growth.",
                icon: "📈",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 bg-gradient-to-br ${feature.color}`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials" className="py-16">
          <motion.h2 
            className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Join thousands of students, professionals, and lifelong learners who have revolutionized their study habits.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "This app completely changed how I study for my medical exams. The spaced repetition system is incredibly effective!",
                name: "Dr. Sarah Johnson",
                role: "Medical Student",
                avatar: "https://i.pravatar.cc/150?img=1"
              },
              {
                text: "I've tried many flashcard apps, but this one's achievement system keeps me coming back day after day.",
                name: "Michael Chen",
                role: "Language Learner",
                avatar: "https://i.pravatar.cc/150?img=3"
              },
              {
                text: "The progress tracking helps me visualize my learning journey. It's so satisfying to see those mastery percentages go up!",
                name: "Emma Rodriguez",
                role: "University Student",
                avatar: "https://i.pravatar.cc/150?img=5"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="mb-4 text-indigo-400 text-3xl">"</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow italic">{testimonial.text}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-200 dark:border-blue-900"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 opacity-10 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 dark:bg-indigo-700 rounded-full opacity-10 blur-2xl"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 dark:bg-blue-700 rounded-full opacity-10 blur-2xl"></div>
          
          <motion.div 
            className="p-12 bg-white dark:bg-gray-800 rounded-2xl text-center shadow-xl border border-gray-100 dark:border-gray-700 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Ready to Transform Your Learning?
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students, professionals, and lifelong learners who have revolutionized their study habits with our spaced repetition system.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}              
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all"
              onClick={() => {
                // Navigate to login page
                navigate('/login');
              }}
            >
              Get Started Now — It's Free
            </motion.button>
            
            <div className="mt-8 flex justify-center space-x-8 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Updates</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Beta Program</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Documentation</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Media</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Cookies</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                FlashMaster
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} Spaced Repetition Flashcard Engine. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
