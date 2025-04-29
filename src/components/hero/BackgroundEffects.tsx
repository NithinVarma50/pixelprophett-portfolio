import { useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

// Memoize the component to prevent unnecessary re-renders
const BackgroundEffects = memo(() => {
  // Generate orbs only once and keep them static
  const orbs = useRef<Array<{ x: number; y: number; size: number; color: string }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const throttleTimerRef = useRef<number | null>(null);
  
  // Generate orb positions and properties only once with reduced count for better performance
  useEffect(() => {
    // Enhanced Loki-themed color palette with more vibrant greens
    const colors = [
      "rgba(57, 255, 20, 0.30)",  // Vibrant Loki Green
      "rgba(35, 192, 25, 0.25)",   // Deep Green
      "rgba(120, 255, 68, 0.22)", // Bright Green
      "rgba(0, 85, 35, 0.20)",    // Dark Green
      "rgba(0, 0, 0, 0.3)",       // Black for contrast
    ];
    
    // Reduced number of orbs for better performance
    orbs.current = [...Array(6)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 40, // Slightly smaller orbs
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Add mouse move listener with throttling for better performance
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimerRef.current !== null) return;
      
      throttleTimerRef.current = window.setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        throttleTimerRef.current = null;
      }, 50); // Throttle to 20 times per second
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimerRef.current !== null) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, []);

  // Calculate normalized mouse position for parallax effect
  const xFactor = typeof window !== 'undefined' ? mousePosition.x / (window.innerWidth || 1) : 0;
  const yFactor = typeof window !== 'undefined' ? mousePosition.y / (window.innerHeight || 1) : 0;

  // Reduce number of particles for better performance
  const particleCount = 8;

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-black/90" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#39ff14]/25 via-[#003300]/35 to-black blur-3xl opacity-70"
          animate={{ 
            scale: [1, 1.05, 1],
            x: xFactor * 10 - 5, // Reduced movement for better performance
            y: yFactor * 10 - 5,
          }}
          transition={{ 
            scale: {
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              repeatType: "reverse"
            },
            x: { duration: 2, ease: "easeOut" },
            y: { duration: 2, ease: "easeOut" },
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {orbs.current.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-md will-change-transform"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              backgroundColor: orb.color,
              boxShadow: orb.color.includes("rgba(57, 255, 20") || orb.color.includes("rgba(120, 255, 68") 
                ? "0 0 40px rgba(57, 255, 20, 0.5)" 
                : "none"
            }}
            animate={{
              y: [0, -15 - (xFactor * 10), 0], // Reduced movement
              x: [0, Math.random() * 10 - 5 + (yFactor * 10), 0], // Reduced movement
              opacity: [0.3, 0.7, 0.3],
              scale: [1, i % 2 === 0 ? 1.05 : 0.95, 1] // Reduced scale change
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Enhanced timeline lines with glow effect - simplified for performance */}
        <motion.div
          className="absolute w-[80%] h-[1px] left-[10%] will-change-transform"
          style={{ 
            top: "30%", 
            boxShadow: "0 0 20px #39ff14",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.8) 50%, rgba(0,0,0,0) 100%)"
          }}
          animate={{
            scaleX: [0.95, 1, 0.95],
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
          className="absolute w-[60%] h-[1px] left-[20%] will-change-transform"
          style={{ 
            top: "70%", 
            boxShadow: "0 0 15px #39ff14",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.7) 50%, rgba(0,0,0,0) 100%)"
          }}
          animate={{
            scaleX: [0.85, 1, 0.85],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Magic rune circle effect - simplified for performance */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full border border-[#39ff14]/40 will-change-transform"
          style={{
            left: "calc(50% - 150px)",
            top: "calc(50% - 150px)",
            borderWidth: "1px",
          }}
          animate={{
            rotate: [0, 360],
            borderColor: ["rgba(57, 255, 20, 0.4)", "rgba(57, 255, 20, 0.7)", "rgba(57, 255, 20, 0.4)"],
            boxShadow: [
              "0 0 10px rgba(57, 255, 20, 0.1)",
              "0 0 20px rgba(57, 255, 20, 0.3)",
              "0 0 10px rgba(57, 255, 20, 0.1)"
            ]
          }}
          transition={{
            rotate: {
              duration: 25, // Slower rotation for better performance
              repeat: Infinity,
              ease: "linear"
            },
            borderColor: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            boxShadow: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full border border-[#39ff14]/50 will-change-transform"
          style={{
            left: "calc(50% - 100px)",
            top: "calc(50% - 100px)",
            borderWidth: "1px",
          }}
          animate={{
            rotate: [360, 0],
            borderColor: ["rgba(57, 255, 20, 0.5)", "rgba(57, 255, 20, 0.8)", "rgba(57, 255, 20, 0.5)"],
            boxShadow: [
              "0 0 15px rgba(57, 255, 20, 0.2)",
              "0 0 25px rgba(57, 255, 20, 0.4)",
              "0 0 15px rgba(57, 255, 20, 0.2)"
            ]
          }}
          transition={{
            rotate: {
              duration: 20, // Slower rotation for better performance
              repeat: Infinity,
              ease: "linear"
            },
            borderColor: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            boxShadow: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />

        {/* Extra magical particles - reduced count for better performance */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/80 will-change-transform"
            style={{
              width: Math.random() * 3 + 1, // Smaller particles
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 6px rgba(57, 255, 20, 0.8)"
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 80 - 40, // Reduced movement range
              y: Math.random() * 80 - 40
            }}
            transition={{
              duration: 3 + Math.random() * 5, // Slightly shorter animations
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
});

BackgroundEffects.displayName = "BackgroundEffects";

export default BackgroundEffects;
