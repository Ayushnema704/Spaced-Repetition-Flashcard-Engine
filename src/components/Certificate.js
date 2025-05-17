import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Certificate({ stats, streakDays, username = 'Learner' }) {
  const canvasRef = useRef(null);
  const [certificateImage, setCertificateImage] = useState('');
  
  // Create the certificate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Background
    ctx.fillStyle = '#fcf7e6';
    ctx.fillRect(0, 0, width, height);
    
    // Border
    ctx.strokeStyle = '#c4a547';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, width - 60, height - 60);
    
    // Inner border
    ctx.strokeStyle = '#8c7c3b';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, width - 90, height - 90);
    
    // Title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Achievement', width / 2, 100);
    
    // Subtitle
    ctx.fillStyle = '#555';
    ctx.font = 'italic 20px Arial';
    ctx.fillText('Spaced Repetition Flashcard Engine', width / 2, 140);
    
    // Details
    ctx.font = '18px Arial';
    ctx.fillText(`This certifies that`, width / 2, 200);
    
    // Name
    ctx.fillStyle = '#000';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(username, width / 2, 240);
    
    // Achievement
    ctx.fillStyle = '#333';
    ctx.font = '18px Arial';
    ctx.fillText(`has successfully mastered all ${stats?.total || 15} flashcards`, width / 2, 290);
    ctx.fillText(`with a learning streak of ${streakDays} day${streakDays !== 1 ? 's' : ''}`, width / 2, 320);
    
    // Date
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    ctx.fillText(`Awarded on ${today.toLocaleDateString('en-US', dateOptions)}`, width / 2, 370);
    
    // Trophy image
    const trophySize = 70;
    ctx.font = `${trophySize}px Arial`;
    ctx.fillText('🏆', width / 2 - (trophySize / 2), 450);
    
    // Stats
    ctx.fillStyle = '#444';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Total Cards: ${stats?.total || 15}`, width / 4, 500);
    ctx.fillText(`Mastered: ${stats?.mastered || stats?.total || 15}`, width / 4, 530);
    
    ctx.textAlign = 'right';
    ctx.fillText(`Learning Streak: ${streakDays} day${streakDays !== 1 ? 's' : ''}`, width - width / 4, 500);
    ctx.fillText(`Achievement Date: ${today.toLocaleDateString()}`, width - width / 4, 530);
    
    // Convert to an image
    const dataUrl = canvas.toDataURL('image/png');
    setCertificateImage(dataUrl);
  }, [stats, streakDays, username]);
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4"
    >
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="hidden"
      />
      
      {certificateImage && (
        <div className="flex flex-col items-center">
          <img 
            src={certificateImage} 
            alt="Achievement Certificate" 
            className="max-w-full h-auto border rounded-lg shadow-md"
            style={{ maxHeight: '300px' }}
          />
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            onClick={() => {
              // Create a download link and click it
              const link = document.createElement('a');
              link.download = 'flashcard-certificate.png';
              link.href = certificateImage;
              link.click();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Certificate
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default Certificate;
