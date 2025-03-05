
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundEffects() {
  const orbs = useRef<Array<{ x: number; y: number; size: number; color: string }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate orb positions and properties only once
  useEffect(() => {
    // Loki-themed color palette
    const colors = [
      "rgba(155, 135, 245, 0.2)", // Primary Purple
      "rgba(126, 105, 171, 0.2)", // Secondary Purple
      "rgba(217, 70, 239, 0.15)", // Magenta Pink
      "rgba(14, 165, 233, 0.15)", // Ocean Blue
    ];
    
    orbs.current = [...Array(6)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 40,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Add mouse move listener
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate normalized mouse position for parallax effect
  const xFactor = typeof window !== 'undefined' ? mousePosition.x / window.innerWidth : 0;
  const yFactor = typeof window !== 'undefined' ? mousePosition.y / window.innerHeight : 0;

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9b87f5]/20 via-[#0EA5E9]/10 to-background blur-3xl opacity-60"
          animate={{ 
            scale: [1, 1.05, 1],
            x: xFactor * 10 - 5,
            y: yFactor * 10 - 5,
          }}
          transition={{ 
            scale: {
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            x: { duration: 2, ease: "easeOut" },
            y: { duration: 2, ease: "easeOut" },
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {orbs.current.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-md"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              backgroundColor: orb.color,
            }}
            animate={{
              y: [0, -20 - (xFactor * 10), 0],
              x: [0, Math.random() * 10 - 5 + (yFactor * 10), 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Add some "timeline" lines for Loki TVA effect */}
        <motion.div
          className="absolute w-[80%] h-[1px] bg-[#9b87f5]/20 left-[10%]"
          style={{ top: "30%" }}
          animate={{
            scaleX: [0.9, 1, 0.9],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-[60%] h-[1px] bg-[#D946EF]/20 left-[20%]"
          style={{ top: "70%" }}
          animate={{
            scaleX: [0.8, 1, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
    </>
  );
}
