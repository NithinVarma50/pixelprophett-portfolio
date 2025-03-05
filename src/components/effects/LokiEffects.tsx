
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LokiEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportDimensions, setViewportDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEffect(() => {
    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle viewport resizing
    const handleResize = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate positions for the effects based on mouse movement
  const xFactor = mousePosition.x / viewportDimensions.width;
  const yFactor = mousePosition.y / viewportDimensions.height;

  // Create trailing effects for mouse cursor
  const cursorTrailPositions = Array.from({ length: 5 }).map((_, i) => ({
    delay: i * 0.1,
    scale: 1 - (i * 0.15)
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Main Loki magic green glow effect */}
      <motion.div 
        className="absolute w-[50vw] h-[50vh] rounded-full"
        animate={{
          x: xFactor * 30 - 15,
          y: yFactor * 30 - 15,
          scale: [1, 1.1, 1],
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
      
      {/* Loki staff magical energy effect */}
      <motion.div 
        className="absolute w-[40vw] h-[40vh] rounded-full"
        animate={{
          x: -xFactor * 25,
          y: -yFactor * 25,
          scale: [1, 1.15, 1],
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
        className="absolute w-[100%] h-[2px]"
        style={{
          top: "50%",
          backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.8) 50%, rgba(0,0,0,0) 100%)",
          boxShadow: "0 0 20px rgba(57,255,20,0.6)",
        }}
        animate={{
          scaleX: [0.8, 1, 0.8],
          opacity: [0.4, 0.8, 0.4],
          y: yFactor * 50 - 25
        }}
        transition={{
          scaleX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, ease: "easeOut" }
        }}
      />
      
      {/* Timeline branch lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`timeline-${i}`}
          className="absolute h-[1px]"
          style={{
            top: `${10 + i * 16}%`,
            width: "100%",
            backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(57,255,20,0.5) 50%, rgba(0,0,0,0) 100%)",
            boxShadow: "0 0 8px rgba(57,255,20,0.4)",
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            scaleX: [0.9, 1, 0.9],
            x: (i % 2 === 0 ? 1 : -1) * (xFactor * 20 - 10)
          }}
          transition={{
            opacity: { duration: 4 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
            scaleX: { duration: 5 + i, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
            x: { duration: 2, ease: "easeOut" }
          }}
        />
      ))}
      
      {/* Loki-inspired glowing runes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`rune-${i}`}
          className="absolute rounded-full bg-[#39ff14]"
          style={{
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
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

      {/* Mouse cursor magical effect */}
      {cursorTrailPositions.map((trail, i) => (
        <motion.div
          key={`cursor-trail-${i}`}
          className="absolute w-[40px] h-[40px] rounded-full"
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

      {/* Sacred timeline "prune" effect - appears occasionally */}
      <motion.div
        className="absolute w-full h-[2px] left-0 origin-left"
        style={{ 
          top: "50%", 
          background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,140,0,0.8) 50%, rgba(0,0,0,0) 100%)",
          boxShadow: "0 0 30px rgba(255,140,0,0.8)"
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.9, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "easeInOut"
        }}
      />
      
      {/* TVA logo effect - creates a mysterious rune-like shape */}
      <motion.div
        className="absolute w-[200px] h-[200px]"
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
            "inset 0 0 40px rgba(57,255,20,0.3), 0 0 40px rgba(57,255,20,0.4)",
            "inset 0 0 20px rgba(57,255,20,0.1), 0 0 20px rgba(57,255,20,0.2)"
          ]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

export default LokiEffects;
