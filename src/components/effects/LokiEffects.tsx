
import { useEffect, useState, useRef, memo } from "react";
import { motion } from "framer-motion";

// Memoize the component to prevent unnecessary re-renders
const LokiEffects = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportDimensions, setViewportDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });
  const throttleTimerRef = useRef<number | null>(null);
  const resizeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Handle mouse movement for interactive effects with throttling
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimerRef.current !== null) return;
      
      throttleTimerRef.current = window.setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        throttleTimerRef.current = null;
      }, 50); // Throttle to 20fps for better performance
    };

    // Handle viewport resizing with debouncing
    const handleResize = () => {
      if (resizeTimerRef.current !== null) {
        clearTimeout(resizeTimerRef.current);
      }
      
      resizeTimerRef.current = window.setTimeout(() => {
        setViewportDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
        resizeTimerRef.current = null;
      }, 250); // Debounce resize events
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial setup
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (throttleTimerRef.current !== null) {
        clearTimeout(throttleTimerRef.current);
      }
      if (resizeTimerRef.current !== null) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  // Calculate positions for the effects based on mouse movement
  const xFactor = mousePosition.x / (viewportDimensions.width || 1);
  const yFactor = mousePosition.y / (viewportDimensions.height || 1);

  // Reduce number of trail positions for better performance
  const cursorTrailPositions = Array.from({ length: 3 }).map((_, i) => ({
    delay: i * 0.1,
    scale: 1 - (i * 0.15)
  }));

  // Reduce number of timeline branches and runes for better performance
  const timelineBranches = 4;
  const runeCount = 10;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Main Loki magic green glow effect - optimized transitions */}
      <motion.div 
        className="absolute w-[50vw] h-[50vh] rounded-full will-change-transform"
        animate={{
          x: xFactor * 20 - 10, // Reduced movement for better performance
          y: yFactor * 20 - 10,
          scale: [1, 1.05, 1],
          background: [
            "radial-gradient(circle, rgba(57, 255, 20, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle, rgba(57, 255, 20, 0.35) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle, rgba(57, 255, 20, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
          ]
        }}
        transition={{
          x: { duration: 1.5, ease: "easeOut" },
          y: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          background: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          left: "30%",
          top: "20%",
          filter: "blur(50px)"
        }}
      />
      
      {/* Loki staff magical energy effect - optimized */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full will-change-transform"
        animate={{
          x: -xFactor * 15, // Reduced movement
          y: -yFactor * 15,
          scale: [1, 1.1, 1], // Reduced scale change
          background: [
            "radial-gradient(circle, rgba(18, 110, 10, 0.35) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle, rgba(57, 255, 20, 0.45) 0%, rgba(0, 0, 0, 0) 70%)",
            "radial-gradient(circle, rgba(18, 110, 10, 0.35) 0%, rgba(0, 0, 0, 0) 70%)",
          ]
        }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
          background: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          right: "20%",
          bottom: "30%",
          filter: "blur(40px)"
        }}
      />
      
      {/* TVA timeline effect */}
      <motion.div 
        className="absolute w-[100%] h-[2px] will-change-transform"
        style={{
          top: "50%",
          backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.8) 50%, rgba(0,0,0,0) 100%)",
          boxShadow: "0 0 20px rgba(57,255,20,0.6)",
        }}
        animate={{
          scaleX: [0.8, 1, 0.8],
          opacity: [0.4, 0.8, 0.4],
          y: yFactor * 30 - 15 // Reduced movement
        }}
        transition={{
          scaleX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, ease: "easeOut" }
        }}
      />
      
      {/* Timeline branch lines - reduced count */}
      {[...Array(timelineBranches)].map((_, i) => (
        <motion.div
          key={`timeline-${i}`}
          className="absolute h-[1px] will-change-transform"
          style={{
            top: `${10 + i * 20}%`, // More spaced out for better performance
            width: "100%",
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.5) 50%, rgba(0,0,0,0) 100%)",
            boxShadow: "0 0 8px rgba(57,255,20,0.4)",
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleX: [0.9, 1, 0.9],
            x: (i % 2 === 0 ? 1 : -1) * (xFactor * 15 - 7.5) // Reduced movement
          }}
          transition={{
            opacity: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
            scaleX: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
            x: { duration: 2, ease: "easeOut" }
          }}
        />
      ))}
      
      {/* Loki-inspired glowing runes - reduced count */}
      {[...Array(runeCount)].map((_, i) => (
        <motion.div
          key={`rune-${i}`}
          className="absolute rounded-full bg-[#39ff14] will-change-transform"
          style={{
            width: Math.random() * 6 + 2, // Smaller size
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px rgba(57,255,20,0.8), 0 0 20px rgba(57,255,20,0.4)",
            filter: "blur(1px)"
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mouse cursor magical effect - reduced trail count */}
      {cursorTrailPositions.map((trail, i) => (
        <motion.div
          key={`cursor-trail-${i}`}
          className="absolute w-[40px] h-[40px] rounded-full will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(57,255,20,0.5) 0%, rgba(0,0,0,0) 70%)",
            boxShadow: "0 0 15px rgba(57,255,20,0.3)",
            filter: "blur(2px)",
          }}
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: trail.scale,
            opacity: [0.8, 0]
          }}
          transition={{
            x: {
              duration: 0.5,
              ease: "linear",
              delay: trail.delay
            },
            y: {
              duration: 0.5,
              ease: "linear",
              delay: trail.delay
            },
            opacity: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
        />
      ))}

      {/* TVA logo effect - simplified for better performance */}
      <motion.div
        className="absolute w-[200px] h-[200px] will-change-transform"
        style={{
          left: "calc(50% - 100px)",
          top: "calc(30% - 100px)",
          borderRadius: "50%",
          border: "1px solid rgba(57,255,20,0.3)",
          boxShadow: "inset 0 0 20px rgba(57,255,20,0.1), 0 0 20px rgba(57,255,20,0.2)"
        }}
        animate={{
          rotate: [0, 360],
          borderColor: ["rgba(57,255,20,0.3)", "rgba(57,255,20,0.7)", "rgba(57,255,20,0.3)"],
          boxShadow: [
            "inset 0 0 20px rgba(57,255,20,0.1), 0 0 20px rgba(57,255,20,0.2)",
            "inset 0 0 30px rgba(57,255,20,0.3), 0 0 30px rgba(57,255,20,0.4)",
            "inset 0 0 20px rgba(57,255,20,0.1), 0 0 20px rgba(57,255,20,0.2)"
          ]
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }, // Slower rotation
          borderColor: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
});

LokiEffects.displayName = "LokiEffects";

export default LokiEffects;
