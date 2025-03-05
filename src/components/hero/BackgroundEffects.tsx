
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackgroundEffects() {
  const orbs = useRef<Array<{ x: number; y: number; size: number; color: string }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate orb positions and properties only once
  useEffect(() => {
    // Enhanced Loki-themed color palette with more vibrant greens
    const colors = [
      "rgba(57, 255, 20, 0.25)",  // Vibrant Loki Green
      "rgba(35, 192, 25, 0.2)",   // Deep Green
      "rgba(120, 255, 68, 0.18)", // Bright Green
      "rgba(0, 85, 35, 0.15)",    // Dark Green
      "rgba(0, 0, 0, 0.3)",       // Black for contrast
    ];
    
    orbs.current = [...Array(8)].map(() => ({
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-black/90" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#39ff14]/20 via-[#003300]/30 to-black blur-3xl opacity-70"
          animate={{ 
            scale: [1, 1.05, 1],
            x: xFactor * 15 - 7.5,
            y: yFactor * 15 - 7.5,
          }}
          transition={{ 
            scale: {
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            x: { duration: 1.5, ease: "easeOut" },
            y: { duration: 1.5, ease: "easeOut" },
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
              boxShadow: orb.color.includes("rgba(57, 255, 20") || orb.color.includes("rgba(120, 255, 68") 
                ? "0 0 40px rgba(57, 255, 20, 0.4)" 
                : "none"
            }}
            animate={{
              y: [0, -20 - (xFactor * 15), 0],
              x: [0, Math.random() * 15 - 7.5 + (yFactor * 15), 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, i % 2 === 0 ? 1.1 : 0.9, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              repeatType: "reverse",
            }}
          />
        ))}
        
        {/* Enhanced timeline lines with glow effect */}
        <motion.div
          className="absolute w-[80%] h-[1px] left-[10%]"
          style={{ 
            top: "30%", 
            boxShadow: "0 0 15px #39ff14",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.7) 50%, rgba(0,0,0,0) 100%)"
          }}
          animate={{
            scaleX: [0.9, 1, 0.9],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute w-[60%] h-[1px] left-[20%]"
          style={{ 
            top: "70%", 
            boxShadow: "0 0 12px #39ff14",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.6) 50%, rgba(0,0,0,0) 100%)"
          }}
          animate={{
            scaleX: [0.8, 1, 0.8],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Magic rune circle effect */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border border-[#39ff14]/30"
          style={{
            left: "calc(50% - 150px)",
            top: "calc(50% - 150px)",
            borderWidth: "1px",
          }}
          animate={{
            rotate: [0, 360],
            borderColor: ["rgba(57, 255, 20, 0.3)", "rgba(57, 255, 20, 0.7)", "rgba(57, 255, 20, 0.3)"]
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            },
            borderColor: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full border border-[#39ff14]/40"
          style={{
            left: "calc(50% - 100px)",
            top: "calc(50% - 100px)",
            borderWidth: "1px",
          }}
          animate={{
            rotate: [360, 0],
            borderColor: ["rgba(57, 255, 20, 0.4)", "rgba(57, 255, 20, 0.7)", "rgba(57, 255, 20, 0.4)"]
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            },
            borderColor: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </div>
    </>
  );
}
