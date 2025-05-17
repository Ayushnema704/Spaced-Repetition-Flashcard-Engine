import React, { useEffect, useRef } from 'react';

const Confetti = ({ isIntense = false }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Constants for confetti
    const confettiCount = isIntense ? 350 : 200;
    const confetti = [];
    
    // Generate confetti pieces
    for (let i = 0; i < confettiCount; i++) {
      const isGold = isIntense && Math.random() > 0.6;
      const isSpecialShape = isIntense && Math.random() > 0.85;
      
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        width: Math.random() * (isIntense ? 15 : 10) + 5,
        height: Math.random() * (isIntense ? 15 : 10) + 5,
        opacity: Math.random(),
        speed: Math.random() * (isIntense ? 5 : 3) + (isIntense ? 3 : 2),
        color: isGold ? 
          `hsl(${40 + Math.random() * 20}, ${90}%, ${60 + Math.random() * 20}%)` : 
          `hsl(${Math.random() * 360}, 80%, 60%)`,
        rotate: Math.random() * 360,
        spinSpeed: Math.random() * (isIntense ? 12 : 8) - (isIntense ? 6 : 4),
        isSpecialShape: isSpecialShape
      });
    }

    // Animation function
    let animationFrameId;
    
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach((p, i) => {
        context.save();
        context.translate(p.x, p.y);
        context.rotate((p.rotate * Math.PI) / 180);
        
        context.fillStyle = p.color;
        context.globalAlpha = p.opacity;
        
        if (p.isSpecialShape) {
          // Draw a star for special shapes
          const spikes = 5;
          const outerRadius = p.width;
          const innerRadius = p.width / 2;
          
          context.beginPath();
          let rot = Math.PI / 2 * 3;
          
          for (let j = 0; j < spikes; j++) {
            const x1 = Math.cos(rot) * outerRadius;
            const y1 = Math.sin(rot) * outerRadius;
            context.lineTo(x1, y1);
            rot += Math.PI / spikes;
            
            const x2 = Math.cos(rot) * innerRadius;
            const y2 = Math.sin(rot) * innerRadius;
            context.lineTo(x2, y2);
            rot += Math.PI / spikes;
          }
          
          context.closePath();
          context.fill();
        } else {
          // Draw regular rectangle confetti
          context.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }
        
        context.restore();
        
        p.y += p.speed;
        p.rotate += p.spinSpeed;
        
        // Reset confetti when it goes off screen
        if (p.y > canvas.height) {
          confetti[i] = {
            ...p,
            y: -20,
            x: Math.random() * canvas.width
          };
        }
      });
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isIntense]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
};

export default Confetti;
